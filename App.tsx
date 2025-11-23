import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Fleet } from './components/Fleet';
import { BookingForm } from './components/BookingForm';
import { TripPlannerAI } from './components/TripPlannerAI';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  // Simple state to handle scrolling/navigation visibility if needed, 
  // but for a landing page, anchor tags usually suffice.
  // We will pass a ref or handler if we need specific interactions.
  
  const [showBookingModal, setShowBookingModal] = useState(false);

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onBookClick={scrollToBooking} />
      
      <main className="flex-grow">
        <Hero onBookClick={scrollToBooking} />
        
        <div id="services" className="scroll-mt-24">
          <Services />
        </div>

        <div id="fleet" className="bg-white scroll-mt-24">
          <Fleet />
        </div>

        {/* AI Section for Dynamic Content */}
        <div id="planner" className="bg-slate-50 scroll-mt-24">
          <TripPlannerAI />
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="scroll-mt-24">
          <Testimonials />
        </div>

        <div id="booking" className="scroll-mt-24">
          <BookingForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;