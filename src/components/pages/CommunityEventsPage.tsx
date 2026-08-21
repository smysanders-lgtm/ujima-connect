import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Calendar, MapPin, Clock, ArrowRight, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function CommunityEventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Virtual Writing Workshop',
      date: 'September 15, 2024',
      time: '6:00 PM - 7:30 PM EST',
      location: 'Online',
      description: 'Join us for an interactive workshop on creative storytelling and personal narrative development.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
      category: 'Workshop'
    },
    {
      id: 2,
      title: 'Community Mentorship Mixer',
      date: 'September 22, 2024',
      time: '5:00 PM - 6:30 PM EST',
      location: 'Online',
      description: 'Connect with mentors and peers in an informal setting. Perfect for networking and building relationships.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
      category: 'Networking'
    },
    {
      id: 3,
      title: 'College Prep Information Session',
      date: 'September 29, 2024',
      time: '7:00 PM - 8:00 PM EST',
      location: 'Online',
      description: 'Learn about college applications, essays, and scholarship opportunities from our expert advisors.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
      category: 'Information Session'
    },
    {
      id: 4,
      title: 'AI & Digital Skills Bootcamp',
      date: 'October 5, 2024',
      time: '4:00 PM - 5:30 PM EST',
      location: 'Online',
      description: 'Hands-on training in AI tools and digital literacy for students and professionals.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
      category: 'Bootcamp'
    }
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground selection:bg-primary/30">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#151615] text-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 w-full h-full lg:w-[60%] lg:left-auto lg:right-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#151615] via-[#151615]/80 to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-[#151615]/60 lg:hidden z-10" />
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1000&fit=crop&auto=format"
            alt="Community event gathering"
            className="w-full h-full object-cover object-center opacity-70 lg:opacity-100"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 py-20">
          <div className="max-w-2xl">
            <AnimatedElement>
              <div className="mb-6">
                <span className="text-xs md:text-sm text-primary/90 font-paragraph tracking-[0.2em] uppercase">
                  Community Events
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                Connect, Learn, <br className="hidden md:block" />
                <span className="text-primary">Grow Together</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl font-light">
                Join our community for workshops, networking events, and learning opportunities designed to empower and inspire.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Upcoming Events
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                What's Happening
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <AnimatedElement key={event.id} delay={index * 100}>
                <div className="bg-white border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group overflow-hidden flex flex-col h-full">
                  {/* Event Image */}
                  <div className="relative overflow-hidden h-48 bg-gray-100">
                    <Image
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-[#151615] px-3 py-1 text-xs font-bold tracking-wide">
                      {event.category}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                      {event.title}
                    </h3>

                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed font-light mb-6">
                      {event.description}
                    </p>

                    <Button
                      className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold w-full rounded-none transition-all duration-300"
                    >
                      Register Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Community Impact
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Events We've Hosted
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedElement delay={100}>
              <div className="bg-white p-8 border border-gray-100">
                <div className="text-4xl font-heading font-bold text-primary mb-3">50+</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Events Hosted</h3>
                <p className="text-gray-600 font-light">Workshops, seminars, and community gatherings throughout the year.</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white p-8 border border-gray-100">
                <div className="text-4xl font-heading font-bold text-primary mb-3">1000+</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Participants</h3>
                <p className="text-gray-600 font-light">Community members who have joined our events and programs.</p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white p-8 border border-gray-100">
                <div className="text-4xl font-heading font-bold text-primary mb-3">100%</div>
                <h3 className="text-lg font-bold text-foreground mb-2">Free Access</h3>
                <p className="text-gray-600 font-light">All events are free and open to everyone in our community.</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedElement>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-12 h-12 mx-auto mb-8 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Don't Miss Out
              </h2>
              
              <p className="text-lg text-white/70 mb-10 leading-relaxed font-light">
                Subscribe to our newsletter to get updates on upcoming events and community opportunities.
              </p>
              
              <Button
                className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300"
              >
                Subscribe Now
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
