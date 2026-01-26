import { ArrowRight, Brain, Beaker, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';
import cropIcon from '@/assets/crop-recommendation-icon.jpg';
import fertilizerIcon from '@/assets/fertilizer-recommendation-icon.jpg';
import diseaseIcon from '@/assets/disease-detection-icon.jpg';

const FeaturesSection = () => {
  const features = [
    {
      id: 'crop-recommendation',
      title: 'Smart Crop Recommendation',
      description: 'AI-powered analysis of soil parameters and environmental data to recommend optimal crops with yield predictions and profitability estimates.',
      image: cropIcon,
      icon: Brain,
      color: 'primary',
      benefits: ['95% accuracy rate', 'Yield optimization', 'Profit maximization'],
      technologies: ['Random Forest', 'Gradient Boosting'],
      link: '/crop-recommendation'
    },
    {
      id: 'fertilizer-recommendation',
      title: 'Precision Fertilizer Analysis',
      description: 'Scientific soil analysis with precise fertilizer recommendations including type, quantity, and optimal application timing for maximum efficiency.',
      image: fertilizerIcon,
      icon: Beaker,
      color: 'secondary',
      benefits: ['Reduce costs by 30%', 'Improved soil health', 'Environmental sustainability'],
      technologies: ['NPK Analysis', 'Machine Learning', 'Soil Chemistry'],
      link: '/fertilizer-recommendation'
    },
    {
      id: 'disease-detection',
      title: 'Instant Disease Detection',
      description: 'Advanced computer vision technology to identify plant diseases from photos with treatment recommendations and severity assessment.',
      image: diseaseIcon,
      icon: Scan,
      color: 'accent',
      benefits: ['Early disease detection', 'Prevent crop loss', 'Expert treatment plans'],
      technologies: ['Computer Vision', 'Deep Learning', 'CNN Models'],
      link: '/disease-detection'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          gradient: 'from-primary to-primary-glow',
          button: 'bg-gradient-primary text-primary-foreground hover:shadow-glow',
          icon: 'text-primary'
        };
      case 'secondary':
        return {
          gradient: 'from-secondary to-secondary/80',
          button: 'bg-gradient-secondary text-secondary-foreground hover:shadow-glow',
          icon: 'text-secondary'
        };
      case 'accent':
        return {
          gradient: 'from-accent to-accent/80',
          button: 'bg-accent text-accent-foreground hover:shadow-glow',
          icon: 'text-accent'
        };
      default:
        return {
          gradient: 'from-primary to-primary-glow',
          button: 'bg-gradient-primary text-primary-foreground hover:shadow-glow',
          icon: 'text-primary'
        };
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div id="ai-powered-agriculture" className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
            <span className="text-gradient-primary">AI-Powered</span> Agriculture Solutions
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your farming operations with our comprehensive suite of AI tools designed 
            to optimize every aspect of agricultural production.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const IconComponent = feature.icon;
            
            return (
              <div
                key={feature.id}
                className="group bg-card rounded-2xl shadow-medium hover:shadow-strong transition-all duration-500 overflow-hidden border border-border hover:border-border/50 transform hover:scale-105"
              >
                {/* Feature Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-80`}></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-card/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-foreground mb-2 uppercase tracking-wide">
                      Key Benefits
                    </h4>
                    <ul className="space-y-1">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${colors.icon.replace('text-', 'bg-')}`}></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-foreground mb-2 uppercase tracking-wide">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {feature.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link 
                    to={feature.link}
                    className={`group w-full ${colors.button} px-6 py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 no-underline`}
                  >
                    <span>Try Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-feature p-8 rounded-2xl shadow-medium border border-border">
            <h3 className="font-heading font-semibold text-2xl mb-4 text-foreground">
              Ready to Transform Your Farm?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of farmers who have increased their yields and profits 
              using our AI-powered agriculture platform.
            </p>
            <button
              className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
              onClick={() => {
                const target = document.getElementById('ai-powered-agriculture');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;