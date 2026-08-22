import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Ujima</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Empowering learners and strengthening communities through accessible education, creative writing, and wellness support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/programs"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-white/80 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-white/80">info@ujima.org</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-white/80">(815) 914-314</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-white/80">Virtual Services Nationwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-sm text-white/60 text-center">© 2026 Ujima Creative Writing Servces. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
