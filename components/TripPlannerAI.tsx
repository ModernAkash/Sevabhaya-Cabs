import React, { useState } from 'react';
import { generateTripItinerary } from '../services/geminiService';
import { ItinerarySuggestion } from '../types';

export const TripPlannerAI: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('2 Days');
  const [mood, setMood] = useState('Relaxed');
  const [result, setResult] = useState<ItinerarySuggestion | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlanTrip = async () => {
    if (!destination.trim()) return;
    
    setLoading(true);
    setResult(null);
    try {
      const suggestion = await generateTripItinerary(destination, days, mood);
      setResult(suggestion);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4 tracking-wide">
             ✨ Powered by Google Gemini AI
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Smart Trip Assistant
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Not sure where to go? Ask our AI assistant for a personalized itinerary starting from Pune.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Input Section */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-50">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Destination (e.g., Lonavala, Goa, Shirdi)</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                  <select
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                  >
                    <option>1 Day</option>
                    <option>2 Days</option>
                    <option>3 Days</option>
                    <option>4-5 Days</option>
                    <option>1 Week</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Vibe</label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                  >
                    <option>Relaxed</option>
                    <option>Adventure</option>
                    <option>Spiritual</option>
                    <option>Family Fun</option>
                    <option>Romantic</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handlePlanTrip}
                disabled={loading || !destination}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${
                  loading || !destination 
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 transform hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Planning...
                  </span>
                ) : 'Plan My Trip'}
              </button>
            </div>
          </div>

          {/* Result Section */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            {!result && !loading && (
              <div className="text-center text-slate-400">
                <div className="text-6xl mb-4">🚗</div>
                <p>Enter details to see an AI-generated itinerary suggestion here.</p>
              </div>
            )}

            {result && !loading && (
              <div className="w-full bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brand-500 animate-fade-in-up">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{result.title}</h3>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase rounded-full tracking-wider">
                    {result.duration}
                  </span>
                </div>
                <p className="text-slate-600 mb-6 italic border-l-4 border-slate-200 pl-4">
                  "{result.description}"
                </p>
                
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <span>📌</span> Highlights
                </h4>
                <ul className="space-y-2 mb-8">
                  {result.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <span className="text-brand-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                   onClick={() => document.getElementById('booking')?.scrollIntoView({behavior:'smooth'})}
                   className="w-full py-3 bg-brand-50 text-brand-700 font-semibold rounded-lg hover:bg-brand-100 transition-colors"
                >
                  Book This Trip Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
