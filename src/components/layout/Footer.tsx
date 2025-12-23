import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/logo-removebg-preview.png'
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1c3144] border-t border-gold-500/30 text-[#E6D5B8] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: 2 cols on mobile, 4 cols on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center mr-2">
                <span><img className='h-10 w-20' src={logo} alt="logo" /></span>
              </div>
              <span className="text-xl font-bold text-gold-500">AmarWallet</span>
            </div>
            <p className="text-sm">
              Secure and convenient Amar wallet for all your financial needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-gold-500 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="transition-colors">Home</Link></li>
              <li><Link to="/about" className="transition-colors">About</Link></li>
              <li><Link to="/features" className="transition-colors">Features</Link></li>
              <li><Link to="/contact" className="transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h4 className="text-gold-500 font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="user/dashboard">Send Money</Link></li>
              <li><Link to="user/dashboard">Cash In</Link></li>
              <li><Link to="user/dashboard">Cash Out</Link></li>
              <li><Link to="agent/dashboard">Agent Functionality</Link></li>
              
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <h4 className="text-gold-500 font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-sm space-y-1">
            
              <p>Rampura, Dhaka, Bangladesh</p>
              <p className="mt-2">Email: mashrafilmahi007@gmail.com</p>
              <p>Phone: +880 1641749267</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-500/20 mt-8 pt-6 text-center">
          <p className="text-gold-400 text-sm">
            &copy; {new Date().getFullYear()} Amar Wallet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
