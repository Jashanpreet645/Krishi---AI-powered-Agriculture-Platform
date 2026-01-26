import Navigation from '@/components/Navigation';
import FertilizerRecommendation from '@/components/features/FertilizerRecommendation';
import Footer from '@/components/Footer';

const FertilizerRecommendationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <FertilizerRecommendation />
      </div>
      <Footer />
    </div>
  );
};

export default FertilizerRecommendationPage;