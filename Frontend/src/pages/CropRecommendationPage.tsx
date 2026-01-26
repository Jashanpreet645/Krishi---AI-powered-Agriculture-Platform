import Navigation from '@/components/Navigation';
import CropRecommendation from '@/components/features/CropRecommendation';
import Footer from '@/components/Footer';

const CropRecommendationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <CropRecommendation />
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendationPage;