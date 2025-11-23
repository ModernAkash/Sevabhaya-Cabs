import { Car, ServiceItem, Testimonial } from './types';

export const FLEET_DATA: Car[] = [
  {
    id: 'c1',
    name: 'Swift Dzire',
    type: 'Sedan',
    passengers: 4,
    luggage: 2,
    pricePerKm: 12,
    local8hr80km: 2200,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600', 
    features: ['AC', 'Music System', 'Comfortable Seating']
  },
  {
    id: 'c5',
    name: 'Hyundai Aura',
    type: 'Sedan',
    passengers: 4,
    luggage: 2,
    pricePerKm: 13,
    local8hr80km: 2300,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
    features: ['AC', 'Modern Interiors', 'Smooth Ride']
  },
  {
    id: 'c2',
    name: 'Innova Crysta',
    type: 'SUV',
    passengers: 6,
    luggage: 4,
    pricePerKm: 18,
    local8hr80km: 3500,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
    features: ['AC', 'GPS', 'Leather Seats', 'Ample Legroom']
  },
  {
    id: 'c3',
    name: 'Ertiga',
    type: 'SUV',
    passengers: 6,
    luggage: 3,
    pricePerKm: 15,
    local8hr80km: 3000,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',

    features: ['AC', 'Economical', 'Spacious']
  },
  {
    id: 'c4',
    name: 'Tempo Traveller',
    type: 'Tempo',
    passengers: 12,
    luggage: 10,
    pricePerKm: 24,
    local8hr80km: 5500,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
    features: ['AC', 'Pushback Seats', 'Group Travel', 'Music']
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 's1',
    title: 'Outstation Trips',
    description: 'Round trips and one-way drops to Mumbai, Shirdi, Mahabaleshwar, Lonavala, and more.',
    icon: '🛣️'
  },
  {
    id: 's2',
    title: 'Local Rentals',
    description: 'Full day and half day car rentals within Pune city for shopping, meetings, or sightseeing.',
    icon: '🏙️'
  },
  {
    id: 's3',
    title: 'Airport Transfer',
    description: 'Reliable pickup and drop services to Pune Airport (PNQ) and Mumbai International Airport (CSMIA).',
    icon: '✈️'
  },
  {
    id: 's4',
    title: 'Corporate Travel',
    description: 'Dedicated fleet for corporate events, employee transportation, and VIP guests.',
    icon: '💼'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahul Deshmukh',
    location: 'Pune',
    text: 'Service was absolutely top-notch. The driver arrived on time and the car was clean and comfortable. Will book again!',
    rating: 5
  },
  {
    id: 't2',
    name: 'Anjali Mehta',
    location: 'Mumbai',
    text: 'Great experience with Sevabhaya Cabs. The booking process was easy and the trip to Shirdi was very smooth.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Vikram Singh',
    location: 'Nagpur',
    text: 'Reasonable rates and professional behavior. The driver knew the best routes to avoid traffic. Recommended!',
    rating: 4
  }
];