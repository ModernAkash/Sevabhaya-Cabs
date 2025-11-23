import React, { useState, useEffect } from 'react';
import { FLEET_DATA } from '../constants';
import { BookingDetails } from '../types';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingDetails>({
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
    carType: 'Swift Dzire', // Default to a specific car
    name: '',
    phone: '',
    tripType: 'OneWay'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingDetails, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof BookingDetails, boolean>>>({});

  const [submitted, setSubmitted] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);

  // Availability State
  const [availabilityStatus, setAvailabilityStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');

  // Derived state to check if main fields are filled for pricing
  const isPricingVisible = formData.pickupLocation && formData.dropLocation && formData.date && formData.time && formData.carType;
  
  const selectedCar = FLEET_DATA.find(c => c.name === formData.carType);

  // Mock Real-time Availability Check
  useEffect(() => {
    if (formData.date && formData.time && formData.carType) {
      setAvailabilityStatus('checking');
      
      // Simulate API delay
      const timer = setTimeout(() => {
        // Mock Logic: Make 'Innova Crysta' unavailable on Sundays for demonstration
        const dateObj = new Date(formData.date);
        const isSunday = dateObj.getDay() === 0;
        
        if (formData.carType === 'Innova Crysta' && isSunday) {
          setAvailabilityStatus('unavailable');
        } else {
          setAvailabilityStatus('available');
        }
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setAvailabilityStatus('idle');
    }
  }, [formData.date, formData.time, formData.carType]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'pickupLocation':
        return !value.trim() ? 'Pickup location is required' : '';
      case 'dropLocation':
        return !value.trim() ? 'Drop location is required' : '';
      case 'date':
        return !value ? 'Date is required' : '';
      case 'time':
        return !value ? 'Time is required' : '';
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        // Validate Indian mobile numbers (starting with 6-9 and 10 digits)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) return 'Enter a valid 10-digit mobile number';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation if field has been touched
    if (touched[name as keyof BookingDetails]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<Record<keyof BookingDetails, string>> = {};
    let isValid = true;
    
    const fieldsToValidate: (keyof BookingDetails)[] = ['pickupLocation', 'dropLocation', 'date', 'time', 'name', 'phone'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Block submission if unavailable
    if (availabilityStatus === 'unavailable') {
      isValid = false;
    }

    setErrors(newErrors);
    setTouched(fieldsToValidate.reduce((acc, curr) => ({ ...acc, [curr]: true }), {}));

    if (isValid) {
      // Simulate submission
      setTimeout(() => {
        setSubmitted(true);
      }, 800);
    }
  };

  const getWhatsAppLink = () => {
    const message = `Hello Sevabhaya Cabs,%0A%0AI would like to book a cab.%0A%0A*Trip Details:*%0AType: ${formData.tripType}%0ACar: ${formData.carType}%0APickup: ${formData.pickupLocation}%0ADrop: ${formData.dropLocation}%0ADate: ${formData.date}%0ATime: ${formData.time}%0A%0A*Contact Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}`;
    return `https://wa.me/919145195013?text=${message}`;
  };

  const resetForm = () => {
    setSubmitted(false);
    setWhatsappSent(false);
    setFormData({
      pickupLocation: '',
      dropLocation: '',
      date: '',
      time: '',
      carType: 'Swift Dzire',
      name: '',
      phone: '',
      tripType: 'OneWay'
    });
    setErrors({});
    setTouched({});
    setAvailabilityStatus('idle');
  };

  const getInputClass = (fieldName: keyof BookingDetails) => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `w-full px-4 py-2 rounded-lg border ${
      hasError 
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
        : 'border-slate-300 focus:ring-brand-500 focus:border-brand-500'
    } focus:ring-2 outline-none transition-colors`;
  };

  // Helper to calculate total
  const calculateTotalEstimate = () => {
    if (!selectedCar) return 0;
    if (formData.tripType === 'Local') {
      return selectedCar.local8hr80km;
    } else {
      // Outstation: Min billing 300km + Driver Allowance 300
      const minDistance = 300;
      const driverAllowance = 300;
      return (minDistance * selectedCar.pricePerKm) + driverAllowance;
    }
  };

  if (whatsappSent) {
    return (
      <div className="py-24 bg-white flex items-center justify-center px-4">
        <div className="bg-slate-50 p-8 rounded-2xl max-w-md w-full text-center border border-slate-100 shadow-lg animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
            🎉
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Thank You!</h3>
          <p className="text-slate-600 mb-8 leading-relaxed">
            We have received your request. Our team will verify the details on WhatsApp and confirm your booking shortly.
          </p>
          <button
            onClick={resetForm}
            className="w-full px-6 py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/30"
          >
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="py-24 bg-white flex items-center justify-center px-4">
        <div className="bg-green-50 p-8 rounded-2xl max-w-md w-full text-center border border-green-100 shadow-lg">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">Booking Details Ready!</h3>
          <p className="text-green-700 mb-6">
            Please click below to send your booking details directly to us on WhatsApp for instant confirmation.
          </p>
          
          <div className="space-y-3">
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setTimeout(() => setWhatsappSent(true), 1000)}
              className="flex items-center justify-center w-full px-6 py-3 bg-[#25D366] text-white rounded-lg font-bold hover:bg-[#20bd5a] transition-colors shadow-md cursor-pointer"
            >
              <span className="mr-2">📱</span> Send on WhatsApp
            </a>

            <button 
              onClick={resetForm}
              className="w-full px-6 py-3 bg-white border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="grid md:grid-cols-5">
            {/* Sidebar info */}
            <div className="md:col-span-2 bg-brand-600 p-8 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-serif font-bold mb-4">Book Your Ride</h3>
                <p className="text-brand-100 mb-8">
                  Get the best rates for local and outstation travel. Transparent pricing, no hidden charges.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-white/20 p-2 rounded-lg">📞</span>
                    <div>
                      <p className="text-xs text-brand-100 uppercase">Call Us</p>
                      <p className="font-bold text-lg">+91 914 519 5013</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white/20 p-2 rounded-lg">📧</span>
                    <div>
                      <p className="text-xs text-brand-100 uppercase">Email</p>
                      <p className="font-bold">booking@sevabhaya.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-sm text-brand-200">
                Sevabhaya Cabs &copy; {new Date().getFullYear()}
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3 p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Trip Type Tabs */}
                <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                  {['OneWay', 'RoundTrip', 'Local'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tripType: type as any }))}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                        formData.tripType === type 
                          ? 'bg-white text-brand-600 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {type === 'OneWay' ? 'One Way' : type === 'RoundTrip' ? 'Round Trip' : 'Local Rental'}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Location</label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('pickupLocation')}
                      placeholder="Enter pickup area"
                    />
                    {touched.pickupLocation && errors.pickupLocation && (
                      <p className="mt-1 text-xs text-red-500">{errors.pickupLocation}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Drop Location</label>
                    <input
                      type="text"
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('dropLocation')}
                      placeholder="Enter drop destination"
                    />
                    {touched.dropLocation && errors.dropLocation && (
                      <p className="mt-1 text-xs text-red-500">{errors.dropLocation}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('date')}
                    />
                    {touched.date && errors.date && (
                      <p className="mt-1 text-xs text-red-500">{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('time')}
                    />
                    {touched.time && errors.time && (
                      <p className="mt-1 text-xs text-red-500">{errors.time}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">Select Car Type</label>
                    {/* Availability Indicator */}
                    {availabilityStatus === 'checking' && (
                      <span className="text-xs text-brand-600 animate-pulse font-medium">Checking availability...</span>
                    )}
                    {availabilityStatus === 'available' && (
                      <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Available
                      </span>
                    )}
                    {availabilityStatus === 'unavailable' && (
                      <span className="text-xs text-red-500 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Not Available
                      </span>
                    )}
                  </div>
                  <select
                    name="carType"
                    value={formData.carType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${availabilityStatus === 'unavailable' ? 'border-red-300 bg-red-50 text-red-800' : 'border-slate-300 bg-white'} focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none`}
                  >
                    {FLEET_DATA.map(car => (
                      <option key={car.id} value={car.name}>{car.name} ({car.type})</option>
                    ))}
                  </select>
                  {availabilityStatus === 'unavailable' && (
                    <p className="text-xs text-red-500 mt-1">This car is fully booked for the selected date. Please choose another.</p>
                  )}
                </div>

                {/* PRICING ESTIMATE SECTION */}
                {isPricingVisible && selectedCar && availabilityStatus !== 'unavailable' && (
                  <div className="bg-brand-50 rounded-xl p-6 border border-brand-100 animate-fade-in-up">
                    <h4 className="font-serif font-bold text-lg text-brand-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🏷️</span> Estimated Pricing Structure
                    </h4>
                    
                    {formData.tripType === 'Local' ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <span className="text-brand-800 font-medium">8 Hr / 80 Km Package</span>
                          <span className="text-xl font-bold text-brand-700">₹{selectedCar.local8hr80km}</span>
                        </div>
                        <div className="border-t border-brand-200 my-2 pt-2 flex justify-between items-center">
                          <span className="font-bold text-brand-900">Total Amount</span>
                          <span className="font-bold text-2xl text-brand-800">₹{calculateTotalEstimate()}</span>
                        </div>
                        <p className="text-xs text-brand-600 mt-1">
                          *Extra km charge: ₹{selectedCar.pricePerKm}/km. Extra hour charges applicable. Parking & Tolls excluded.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center pb-2 border-b border-brand-200/50">
                          <span className="text-brand-800">Rate per Km</span>
                          <span className="font-bold text-brand-700">₹{selectedCar.pricePerKm}/km</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-brand-200/50">
                          <span className="text-brand-800">Driver Allowance</span>
                          <span className="font-bold text-brand-700">₹300/day</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-brand-800">Min. Billing Distance</span>
                          <span className="font-bold text-brand-700">300 km/day</span>
                        </div>
                         <div className="border-t border-brand-200 mt-2 pt-2 flex justify-between items-center bg-brand-100/50 p-2 rounded-lg">
                          <span className="font-bold text-brand-900">Min. Daily Fare</span>
                          <span className="font-bold text-2xl text-brand-800">₹{calculateTotalEstimate()}</span>
                        </div>
                        <p className="text-xs text-brand-600 mt-2 italic">
                          *Final fare depends on total distance traveled. Tolls & Parking extra.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('name')}
                      placeholder="Sachin Pawar"
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('phone')}
                      placeholder="Your mobile number"
                    />
                    {touched.phone && errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={availabilityStatus === 'unavailable' || availabilityStatus === 'checking'}
                  className={`w-full py-4 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-4 ${
                    availabilityStatus === 'unavailable' || availabilityStatus === 'checking'
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  {availabilityStatus === 'checking' ? 'Checking Availability...' : 'Proceed to Booking'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};