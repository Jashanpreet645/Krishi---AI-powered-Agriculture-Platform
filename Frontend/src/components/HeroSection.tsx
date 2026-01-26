import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@/assets/hero-agriculture.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern precision agriculture with AI technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
              <span className="text-primary-foreground">Revolutionizing</span>
              <br />
              <span className="text-gradient-secondary">Agriculture</span>
              <br />
              <span className="text-primary-foreground">with AI</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform traditional farming into data-driven precision agriculture. 
              Get AI-powered insights for crop recommendations, soil analysis, and 
              disease detection to maximize yields and profitability.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="group bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={() => {
                  const target = document.getElementById('ai-powered-agriculture');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Start Free Analysis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              {/* Removed Watch Demo button */}
              {/* <button className="group bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border border-primary-foreground/20 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground/20 transition-all duration-300 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button> */}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-foreground/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1">95%</div>
                <div className="text-sm text-primary-foreground/80">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1">10K+</div>
                <div className="text-sm text-primary-foreground/80">Farmers Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1">40%</div>
                <div className="text-sm text-primary-foreground/80">Yield Increase</div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Preview */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-card/95 backdrop-blur-sm p-6 rounded-2xl shadow-strong border border-border/20">
                <h3 className="font-heading font-semibold text-xl mb-4 text-foreground">
                  AI Analysis Preview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-feature rounded-lg">
                    <span className="text-foreground font-medium">Soil Health</span>
                    <span className="text-primary font-bold">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-feature rounded-lg">
                    <span className="text-foreground font-medium">Recommended Crop</span>
                    <span className="text-secondary font-bold">Wheat</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-feature rounded-lg">
                    <span className="text-foreground font-medium">Expected Yield</span>
                    <span className="text-accent font-bold">+35%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full p-1">
          <div className="w-1 h-3 bg-primary-foreground/70 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;