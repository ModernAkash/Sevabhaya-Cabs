import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-brand-600 rounded flex items-center justify-center text-white font-bold">S</div>
               <span className="font-serif font-bold text-xl text-white">Sevabhaya</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Pune's most trusted car rental service. Committed to safety, punctuality, and comfort for every journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#booking" className="hover:text-brand-500 transition-colors">Local Rental</a></li>
              <li><a href="#booking" className="hover:text-brand-500 transition-colors">Outstation Cabs</a></li>
              <li><a href="#booking" className="hover:text-brand-500 transition-colors">Airport Transfer</a></li>
              <li><a href="#booking" className="hover:text-brand-500 transition-colors">Corporate Booking</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1">📍</span>
                <span>Ahire Gate, NDA Road,<br/>Uttamnagar, Pune 411023</span>
              </li>
              <li className="flex items-center gap-3">
                <span>📞</span>
                <span>+91 914 519 5013</span>
              </li>
              <li className="flex items-center gap-3">
                <span>✉️</span>
                <span>hello@sevabhaya.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Sevabhaya Cabs Tours & Travels. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Facebook</a>
             <a href="https://instagram.com/sevabhaya_cabs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};