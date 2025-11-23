import React from 'react';
import { TESTIMONIALS_DATA } from '../constants';

export const Testimonials: React.FC = () => {
  return (
    <div className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm">Social Proof</h2>
          <p className="mt-2 text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Trusted by Travelers
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
            See what our customers have to say about their journey with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div key={testimonial.id} className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative border border-slate-100 flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-slate-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic leading-relaxed flex-grow">"{testimonial.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xl shadow-inner">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};