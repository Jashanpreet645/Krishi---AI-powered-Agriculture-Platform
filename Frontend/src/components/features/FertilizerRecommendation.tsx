import React, { useState } from 'react';
import { Loader2, Beaker, TrendingDown, Leaf, AlertCircle } from 'lucide-react';
import apiService, { FertilizerRecommendationData } from '@/services/apiService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const FertilizerRecommendation: React.FC = () => {
  const [formData, setFormData] = useState<FertilizerRecommendationData>({
    Crop: '',
    Temperature: 0,
    Moisture: 0,
    Rainfall: 0,
    PH: 0,
    Nitrogen: 0,
    Phosphorous: 0,
    Potassium: 0,
    Carbon: 0,
    Soil: ''
  });
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const { toast } = useToast();

  const commonCrops = [
    'Rice', 'Wheat', 'Corn', 'Soybeans', 'Cotton', 'Sugarcane',
    'Tomato', 'Potato', 'Onion', 'Cabbage', 'Carrot', 'Lettuce',
    'Apple', 'Orange', 'Banana', 'Grapes', 'Mango', 'Strawberry'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['Crop', 'Soil'].includes(name) ? value : (value === '' ? 0 : parseFloat(value) || 0)
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!isAuthenticated) {
  //     toast({
  //       title: 'Authentication Required',
  //       description: 'Please sign in to get fertilizer recommendations.',
  //       variant: 'destructive',
  //     });
  //     return;
  //   }

  //   if (!formData.Crop.trim()) {
  //     toast({
  //       title: 'Crop Name Required',
  //       description: 'Please enter or select a crop name.',
  //       variant: 'destructive',
  //     });
  //     return;
  //   }

  //   setLoading(true);
  //   setResult(null);

  //   try {
  //     const response = await apiService.getFertilizerRecommendation(formData);
      
  //     if (response.success) {
  //       setResult(response.data);
  //       toast({
  //         title: 'Analysis Complete',
  //         description: 'Your fertilizer recommendation is ready!',
  //       });
  //     } else {
  //       toast({
  //         title: 'Analysis Failed',
  //         description: response.message,
  //         variant: 'destructive',
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       title: 'Network Error',
  //       description: 'Please check your connection and try again.',
  //       variant: 'destructive',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!isAuthenticated) {
    toast({
      title: 'Authentication Required',
      description: 'Please sign in to get fertilizer recommendations.',
      variant: 'destructive',
    });
    return;
  }

  if (!formData.Crop.trim()) {
    toast({
      title: 'Crop Name Required',
      description: 'Please enter or select a crop name.',
      variant: 'destructive',
    });
    return;
  }

  setLoading(true);
  setResult(null);

  try {
    const response = await apiService.getFertilizerRecommendation(formData);
    console.log("Fertilizer response:", response);
    console.log("Response data:", response.data);
    
    if (response && response.success && response.data) {
      setResult(response.data); // Set the actual data
      toast({
        title: 'Analysis Complete',
        description: 'Your fertilizer recommendation is ready!',
      });
    } else {
      toast({
        title: 'Analysis Failed',
        description: response?.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  } catch (error) {
    console.error("Network error:", error);
    toast({
      title: 'Network Error',
      description: 'Please check your connection and try again.',
      variant: 'destructive',
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-2xl shadow-medium border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-secondary p-6 text-secondary-foreground">
          <h2 className="text-2xl font-heading font-bold flex items-center space-x-2">
            <Beaker className="w-6 h-6" />
            <span>Precision Fertilizer Analysis</span>
          </h2>
          <p className="text-secondary-foreground/90 mt-2">
            Get precise fertilizer recommendations based on your crop and current soil nutrient levels
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Crop Selection */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Crop Information</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Crop Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="Crop"
                    value={formData.Crop}
                    onChange={handleInputChange}
                    list="crop-suggestions"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    placeholder="Enter crop name (e.g., Rice, Wheat, Corn)"
                  />
                  <datalist id="crop-suggestions">
                    {commonCrops.map(crop => (
                      <option key={crop} value={crop} />
                    ))}
                  </datalist>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Start typing to see suggestions or enter any crop name
                </p>
              </div>
            </div>

            {/* Environmental Conditions */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Environmental Conditions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="Temperature"
                    value={formData.Temperature}
                    onChange={handleInputChange}
                    min="-50"
                    max="80"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    placeholder="25.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Moisture (0-1)
                  </label>
                  <input
                    type="number"
                    name="Moisture"
                    value={formData.Moisture}
                    onChange={handleInputChange}
                    min="0"
                    max="1"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    placeholder="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    name="Rainfall"
                    value={formData.Rainfall}
                    onChange={handleInputChange}
                    min="0"
                    max="10000"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>

            {/* Soil Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Soil Information</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    pH Level
                  </label>
                  <input
                    type="number"
                    name="PH"
                    value={formData.PH}
                    onChange={handleInputChange}
                    min="0"
                    max="14"
                    step="0.1"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    placeholder="6.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Carbon (%)
                  </label>
                  <input
                    type="number"
                    name="Carbon"
                    value={formData.Carbon}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    placeholder="2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Soil Type
                  </label>
                  <input
                    type="text"
                    name="Soil"
                    value={formData.Soil}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    placeholder="Loamy Soil"
                  />
                </div>
              </div>
            </div>

            {/* Current Nutrient Levels */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Current Soil Nutrient Levels (ppm)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nitrogen (N)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      name="Nitrogen"
                      value={formData.Nitrogen}
                      onChange={handleInputChange}
                      min="0"
                      max="200"
                      step="0.01"
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer mb-2"
                    />
                    <input
                      type="number"
                      name="Nitrogen"
                      value={formData.Nitrogen}
                      onChange={handleInputChange}
                      min="0"
                      max="200"
                      step="0.1"
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phosphorous (P)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      name="Phosphorous"
                      value={formData.Phosphorous}
                      onChange={handleInputChange}
                      min="0"
                      max="150"
                      step="0.01"
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer mb-2"
                    />
                    <input
                      type="number"
                      name="Phosphorous"
                      value={formData.Phosphorous}
                      onChange={handleInputChange}
                      min="0"
                      max="150"
                      step="0.1"
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Potassium (K)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      name="Potassium"
                      value={formData.Potassium}
                      onChange={handleInputChange}
                      min="0"
                      max="200"
                      step="0.01"
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer mb-2"
                    />
                    <input
                      type="number"
                      name="Potassium"
                      value={formData.Potassium}
                      onChange={handleInputChange}
                      min="0"
                      max="200"
                      step="0.1"
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isAuthenticated}
              className="w-full bg-gradient-secondary text-secondary-foreground py-3 px-6 rounded-lg font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{loading ? 'Analyzing...' : 'Get Fertilizer Recommendation'}</span>
            </button>

            {!isAuthenticated && (
              <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Please sign in to access fertilizer recommendations</span>
              </div>
            )}
          </form>

          {/* Results */}
          {/* Results */}
{result && (
  <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
    <h3 className="text-lg font-semibold text-yellow-800 flex items-center">
      <Beaker className="mr-2" />
      Fertilizer Recommendation
    </h3>
    
    <div className="grid grid-cols-1 gap-4">
      {/* Main Recommendation */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center text-yellow-600 mb-2">
          <Leaf className="mr-2 h-5 w-5" />
          <span className="font-medium">Recommended Fertilizer</span>
        </div>
        <div className="text-xl font-bold text-yellow-800">
          {result.fertilizer || result.fertilizer_name || result.recommended_fertilizer || 'N/A'}
        </div>
      </div>

      {/* Remark/Instructions */}
      {result.remark && (
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center text-yellow-600 mb-2">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span className="font-medium">Recommendation Details</span>
          </div>
          <div className="text-yellow-800">
            {result.remark}
          </div>
        </div>
      )}

      {/* Additional Information if available */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.npk_ratio && (
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center text-yellow-600 mb-2">
              <TrendingDown className="mr-2 h-5 w-5" />
              <span className="font-medium">NPK Ratio</span>
            </div>
            <div className="text-lg text-yellow-800">
              {result.npk_ratio}
            </div>
          </div>
        )}

        {result.application_rate && (
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center text-yellow-600 mb-2">
              <span className="font-medium">Application Rate</span>
            </div>
            <div className="text-lg text-yellow-800">
              {result.application_rate}
            </div>
          </div>
        )}
      </div>

      {result.cost_estimate && (
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center text-yellow-600 mb-2">
            <span className="font-medium">Estimated Cost</span>
          </div>
          <div className="text-lg text-yellow-800">
            {result.cost_estimate}
          </div>
        </div>
      )}

      {result.instructions && result.instructions !== result.remark && (
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center text-yellow-600 mb-2">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span className="font-medium">Application Instructions</span>
          </div>
          <div className="text-yellow-800">
            {result.instructions}
          </div>
        </div>
      )}
    </div>

    {/* Debug Information (remove in production) */}
    <div className="bg-gray-100 p-3 rounded text-xs">
      <strong>Debug:</strong> {JSON.stringify(result, null, 2)}
    </div>
  </div>
)}


          
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;