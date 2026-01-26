import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Loader2, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import apiService from '@/services/apiService';
import authService from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const DiseaseDetection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please select a JPEG, PNG, or WebP image.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: 'File Too Large',
        description: 'Please select an image smaller than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to analyze plant diseases.',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: 'No Image Selected',
        description: 'Please select an image to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult(null);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const response = await apiService.detectPlantDisease(selectedFile);
      console.log("response is " + JSON.stringify(response));
      if (response !=null) {
        setResult(response);
        toast({
          title: 'Analysis Complete',
          description: 'Disease analysis complete!',
        });
      } else {
        setResult(response);
        toast({
          title: 'Analysis Failed',
          description: response.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Network Error',
        description: 'Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setUploadProgress(100);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'low':
      case 'mild':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium':
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high':
      case 'severe':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-2xl shadow-medium border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-accent/80 p-6 text-accent-foreground">
          <h2 className="text-2xl font-heading font-bold flex items-center space-x-2">
            <Camera className="w-6 h-6" />
            <span>Instant Disease Detection</span>
          </h2>
          <p className="text-accent-foreground/90 mt-2">
            Upload a photo of your plant to get instant AI-powered disease identification and treatment recommendations
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Plant Image Upload</h3>
              
              {!selectedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-border hover:border-accent transition-colors rounded-lg p-8 text-center cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-muted-foreground group-hover:text-accent transition-colors mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Drop your plant image here
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <p>Supported formats: JPEG, PNG, WebP</p>
                    <p>Maximum size: 5MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={previewUrl || ''}
                        alt="Plant preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{selectedFile.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedFile.type}
                      </p>
                      
                      {loading && uploadProgress > 0 && (
                        <div className="mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                            <div
                              className="bg-accent h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !selectedFile || !isAuthenticated}
              className="w-full bg-accent text-accent-foreground py-3 px-6 rounded-lg font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{loading ? 'Analyzing Image...' : 'Analyze Plant Disease'}</span>
            </button>

            {!isAuthenticated && (
              <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Please sign in to access disease detection</span>
              </div>
            )}
          </form>

          {/* Results */}
          {result && (
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                <span>Disease Analysis Results</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Detected Disease</h4>
                  <p className="text-2xl font-bold text-accent">{result.disease || 'No disease detected'}</p>
                </div>
                
                {result.confidence && (
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-2">Confidence Level</h4>
                    <p className="text-2xl font-bold text-primary">{result.confidence}%</p>
                  </div>
                )}
              </div>

              {result.severity && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-foreground">Severity Assessment</h4>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
                    {result.severity}
                  </span>
                </div>
              )}

              {result.treatment && (
                <div className="bg-card p-4 rounded-lg border border-border mb-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Treatment Recommendations</span>
                  </h4>
                  <p className="text-muted-foreground whitespace-pre-line">{result.treatment}</p>
                </div>
              )}

              {result.prevention && (
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Prevention Tips</h4>
                  <p className="text-muted-foreground whitespace-pre-line">{result.prevention}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;