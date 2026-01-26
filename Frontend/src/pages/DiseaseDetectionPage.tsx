import Navigation from '@/components/Navigation';
import DiseaseDetection from '@/components/features/DiseaseDetection';
import Footer from '@/components/Footer';

const DiseaseDetectionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <DiseaseDetection />
      </div>
      <Footer />
    </div>
  );
};

export default DiseaseDetectionPage;