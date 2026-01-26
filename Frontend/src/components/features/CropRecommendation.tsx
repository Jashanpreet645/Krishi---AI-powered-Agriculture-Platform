import React, { useState } from 'react';
import { Loader2, TrendingUp, DollarSign, Wheat, AlertCircle } from 'lucide-react';
import apiService, { CropRecommendationData } from '@/services/apiService';
import authService from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CropRecommendation: React.FC = () => {
  const [formData, setFormData] = useState<CropRecommendationData>({
    Temperature: 25,
    Moisture: 0.5,
    Rainfall: 100,
    PH: 6.5,
    Nitrogen: 30,
    Phosphorous: 25,
    Potassium: 35,
    Carbon: 2.5,
    Soil: 'Loamy Soil'
  });
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const { toast } = useToast();

  // Removed soilTypes array as manual input will be used

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Soil' ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // if (!isAuthenticated) {
    //   toast({
    //     title: 'Authentication Required',
    //     description: 'Please sign in to get crop recommendations.',
    //     variant: 'destructive',
    //   });
    //   return;
    // }

    setLoading(true);
    setResult(null);

    // try {
    //   const response = await apiService.getCropRecommendation(formData);
    //   console.log("response is " + JSON.stringify(response));
    //   if (response!=null) {
    //     setResult(response);
    //     toast({
    //       title: 'Analysis Complete',
    //       description: 'Your crop recommendation is ready!',
    //     });
    //   } else {
    //     setResult(response);
    //     toast({
    //       title: 'Analysis Failed',
    //       description: response.message,
    //       variant: 'destructive',
    //     });
    //   }
    // } catch (error) {
    //   toast({
    //     title: 'Network Error',
    //     description: 'Please check your connection and try again.',
    //     variant: 'destructive',
    //   });
    // } finally {
    //   setLoading(false);
    // }

// try {
//   const response = await apiService.getCropRecommendation(formData);
//   console.log("response is " + JSON.stringify(response));

//   // Check for success property or validate response data accordingly
//   if (response && response.success) {
//     setResult(response);
//     toast({
//       title: 'Analysis Complete',
//       description: 'Your crop recommendation is ready!',
//     });
//   } else {
//     // Show error message when API response indicates failure
//     setResult(response);
//     toast({
//       title: 'Analysis Failed',
//       description: response?.message || 'An error occurred',
//       variant: 'destructive',
//     });
//   }
// } catch (error) {
//   toast({
//     title: 'Network Error',
//     description: 'Please check your connection and try again.',
//     variant: 'destructive',
//   });
// } finally {
//   setLoading(false);
// }

try {
  const response = await apiService.getCropRecommendation(formData);
  console.log("response is " + JSON.stringify(response));
  
  // if (response && response.success) {
  //   setResult(response);
  //   toast({
  //     title: 'Analysis Complete',
  //     description: 'Your crop recommendation is ready!',
  //   });
  // } else {
  //   setResult(response);
  //   toast({
  //     title: 'Analysis Failed',
  //     description: response?.message || 'An error occurred',
  //     variant: 'destructive',
  //   });
  // }

  if (response && response.success && response.data) {
  setResult(response); // Keep the full response object
  toast({
    title: 'Analysis Complete',
    description: `Top recommendation: ${response.data[0]?.crop} (${response.data[0]?.confidence} confidence)`,
  });
} else {
  toast({
    title: 'Analysis Failed',
    description: response?.message || 'An error occurred',
    variant: 'destructive',
  });
}

} catch (error) { // This was missing the closing brace above
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
        <div className="bg-gradient-primary p-6 text-primary-foreground">
          <h2 className="text-2xl font-heading font-bold flex items-center space-x-2">
            <Wheat className="w-6 h-6" />
            <span>Smart Crop Recommendation</span>
          </h2>
          <p className="text-primary-foreground/90 mt-2">
            Enter your soil parameters and environmental data to get AI-powered crop recommendations
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Environmental Parameters */}
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
                    step="0.01"
                    min="0"
                    max="50"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
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
                    step="0.01"
                    min="0"
                    max="1"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
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
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Soil Parameters */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Soil Analysis</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    pH Level (0-14)
                  </label>
                  <input
                    type="number"
                    name="PH"
                    value={formData.PH}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="14"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
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
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Nutrient Levels */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Nutrient Levels (ppm)</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nitrogen (N)
                  </label>
                  <input
                    type="number"
                    name="Nitrogen"
                    value={formData.Nitrogen}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phosphorous (P)
                  </label>
                  <input
                    type="number"
                    name="Phosphorous"
                    value={formData.Phosphorous}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Potassium (K)
                  </label>
                  <input
                    type="number"
                    name="Potassium"
                    value={formData.Potassium}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
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
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isAuthenticated}
              className="w-full bg-gradient-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{loading ? 'Analyzing...' : 'Get Crop Recommendation'}</span>
            </button>

            {!isAuthenticated && (
              <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Please sign in to access crop recommendations</span>
              </div>
            )}
          </form>

          {/* Results */}
          {/* {result && (
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Recommendation Results</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Recommended Crop</h4>
                  <p className="text-2xl font-bold text-primary">{result.recommended_crop || 'N/A'}</p>
                </div>
                
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Confidence Score</h4>
                  <p className="text-2xl font-bold text-secondary">{result.confidence || 'N/A'}%</p>
                </div>
              </div>

              {result.yield_prediction && (
                <div className="mt-4 bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Yield Prediction</span>
                  </h4>
                  <p className="text-muted-foreground">{result.yield_prediction}</p>
                </div>
              )}
            </div>
          )} */}

          {result && result.data && (
  <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
    <h3 className="text-lg font-semibold text-green-800 flex items-center">
      <TrendingUp className="mr-2" />
      Recommendation Results
    </h3>
    
    {/* Top Recommendation */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center text-green-600 mb-2">
          <Wheat className="mr-2 h-5 w-5" />
          <span className="font-medium">Recommended Crop</span>
        </div>
        <div className="text-2xl font-bold text-green-800">
          {result.data[0]?.crop || 'N/A'}
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center text-green-600 mb-2">
          <DollarSign className="mr-2 h-5 w-5" />
          <span className="font-medium">Confidence Score</span>
        </div>
        <div className="text-2xl font-bold text-green-800">
          {result.data[0]?.confidence || 'N/A'}
        </div>
      </div>
    </div>

    {/* All Recommendations */}
    <div className="mt-4">
      <h4 className="font-medium text-green-800 mb-2">All Recommendations:</h4>
      <div className="space-y-2">
        {result.data.map((item: any, index: number) => (
          <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
            <span className="font-medium">#{item.rank} {item.crop}</span>
            <span className="text-green-600 font-semibold">{item.confidence}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;