import React from 'react';
import { FLEET_DATA } from '../constants';

export const Fleet: React.FC = () => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Our Fleet</h2>
            <p className="mt-2 text-lg text-slate-600">Clean, comfortable, and well-maintained vehicles for every need.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FLEET_DATA.map((car) => (
            <div key={car.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                  {car.type}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{car.name}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 mt-2">
                  <span className="flex items-center gap-1" title="Passengers">
                     👥 {car.passengers}
                  </span>
                  <span className="flex items-center gap-1" title="Luggage">
                     🧳 {car.luggage}
                  </span>
                  <span className="flex items-center gap-1" title="AC">
                     ❄️ AC
                  </span>
                </div>
                
                <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Starts at</span>
                    <div className="text-brand-600 font-bold text-lg">₹{car.pricePerKm}<span className="text-sm text-slate-400 font-normal">/km</span></div>
                  </div>
                  <button onClick={() => document.getElementById('booking')?.scrollIntoView({behavior: 'smooth'})} className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};