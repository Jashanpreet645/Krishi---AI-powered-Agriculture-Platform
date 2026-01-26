import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-sm">K</span>
              </div>
              <span className="font-heading font-bold text-xl">Krishi</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md leading-relaxed">
              Revolutionizing agriculture through AI-powered precision farming solutions. 
              Empowering farmers with data-driven insights for sustainable and profitable farming.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#crop-recommendation" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Crop Recommendation
                </a>
              </li>
              <li>
                <a href="#fertilizer-recommendation" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Fertilizer Analysis
                </a>
              </li>
              <li>
                <a href="#disease-detection" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Disease Detection
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="contact">
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80 text-sm">hello@krishi.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/80 text-sm">+91-99XXXXXXXX</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Agricultural Innovation Hub<br />
                  Thapar University, Punjab
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Krishi. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;