import React from 'react';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <div className="relative bg-slate-900 overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-40"
          src="https://picsum.photos/seed/travelpune/1920/1080"
          alt="Road trip in Pune"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Journey with <br/>
            <span className="text-brand-500">Comfort & Trust</span>
          </h1>
          <p className="mt-4 text-xl text-slate-300 mb-8 font-light leading-relaxed">
            Experience the best of Pune and beyond with Sevabhaya Cabs. 
            Reliable outstation trips, airport transfers, and local rentals at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBookClick}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold text-lg shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
            >
              Book Your Ride
            </button>
            <a
              href="#fleet"
              className="px-8 py-4 bg-transparent border-2 border-white/20 hover:bg-white/10 text-white rounded-lg font-semibold text-lg transition-all backdrop-blur-sm"
            >
              View Fleet
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-8 text-slate-400 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Verified Drivers
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Best Rates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
