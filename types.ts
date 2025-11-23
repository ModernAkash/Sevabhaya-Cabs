export interface Car {
  id: string;
  name: string;
  type: 'Sedan' | 'SUV' | 'Hatchback' | 'Luxury' | 'Tempo';
  passengers: number;
  luggage: number;
  pricePerKm: number;
  local8hr80km: number;
  image: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BookingDetails {
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  carType: string;
  name: string;
  phone: string;
  tripType: 'OneWay' | 'RoundTrip' | 'Local';
}

export interface ItinerarySuggestion {
  title: string;
  description: string;
  duration: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}