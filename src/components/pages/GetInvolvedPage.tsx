import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Heart, Users, Briefcase, Gift, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function GetInvolvedPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const involvementOptions = [
    {
      id: 1,
      title: 'Become a Mentor',
      icon: Users,
      description: 'Share your expertise and experience with students who need guidance and support.',
      benefits: [
        'Make a direct impact on student lives',
        'Flexible time commitment',
        'Comprehensive mentor training',
        'Community of like-minded educators'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format'
    },
    {
      id: 2,
      title: 'Volunteer Your Skills',
      icon: Briefcase,
      description: 'Contribute your professional expertise through workshops, tutoring, or program support.',
      benefits: [
        'Lead workshops in your field',
        'Tutor students one-on-one',
        'Support program operations',
        'Build meaningful connections'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format'
    },
    {
      id: 3,
      title: 'Make a Donation',
      icon: Gift,
      description: 'Your financial support directly funds scholarships, programs, and student resources.',
      benefits: [
        'Tax-deductible contributions',
        'Transparent impact reporting',
        'Multiple giving levels',
        'Donor recognition options'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format'
    },
    {
      id: 4,
      title: 'Spread the Word',
      icon: Heart,
      description: 'Help us reach more families by sharing our mission with your network.',
      benefits: [
        'Share on social media',
        'Refer a student or family',
        'Host a community event',
        'Partner with your organization'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format'
    }
  ];

  const impactStats = [
    { number: '$50K+', label: 'Scholarships Awarded' },
    { number: '500+', label: 'Students Supported' },
    { number: '100+', label: 'Active Volunteers' },
    { number: '50+', label: 'Community Partners' }
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
            alt="Community involvement and support"
            className="w-full h-full object-cover object-center opacity-70 lg:opacity-100"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 py-20">
          <div className="max-w-2xl">
            <AnimatedElement>
              <div className="mb-6">
                <span className="text-xs font-paragraph tracking-[0.2em] uppercase text-accent md:text-2xl">
                  Get Involved
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                Be Part of <br className="hidden md:block" />
                <span className="text-accent">the Change</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl font-light">
                There are many ways to support our mission and make a difference in students' lives. Find the opportunity that's right for you.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Involvement Options - Carousel */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Ways to Help
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Find Your Role
              </h2>
            </div>
          </AnimatedElement>

          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  {(() => {
                    const option = involvementOptions[currentSlide];
                    const IconComponent = option.icon;
                    return (
                      <div className="bg-white border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group overflow-hidden flex flex-col h-full">
                        {/* Option Image */}
                        <div className="relative overflow-hidden h-64 bg-gray-100">
                          <Image
                            src={option.image}
                            alt={option.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        {/* Option Content */}
                        <div className="p-8 flex-1 flex flex-col">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-foreground">
                              {option.title}
                            </h3>
                          </div>

                          <p className="text-gray-600 leading-relaxed font-light mb-6 flex-1">
                            {option.description}
                          </p>

                          {/* Benefits */}
                          <div className="space-y-3 mb-8 pb-8 border-b border-gray-100">
                            {option.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                                <span className="text-sm text-gray-600">{benefit}</span>
                              </div>
                            ))}
                          </div>

                          {option.id === 3 ? (
                            <Button
                              asChild
                              className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold w-full rounded-none transition-all duration-300"
                            >
                              <Link to="/donation">
                                Make a Donation <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                          ) : option.id === 2 ? (
                            <Button
                              asChild
                              className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold w-full rounded-none transition-all duration-300"
                            >
                              <Link to="/volunteer-your-skills">
                                Learn More <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                          ) : option.id === 4 ? (
                            <Button
                              asChild
                              className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold w-full rounded-none transition-all duration-300"
                            >
                              <Link to="/spread-the-word">
                                Learn More <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              asChild
                              className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold w-full rounded-none transition-all duration-300"
                            >
                              <Link to="/become-a-mentor" className="bg-accent">
                                Learn More <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + involvementOptions.length) % involvementOptions.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 z-10 bg-primary text-[#151615] hover:bg-primary/90 p-3 rounded-full transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % involvementOptions.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 z-10 bg-primary text-[#151615] hover:bg-primary/90 p-3 rounded-full transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {involvementOptions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-primary w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Impact Stats */}
      <section className="py-16 bg-secondary border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-gray-200">
            {impactStats.map((stat, index) => (
              <AnimatedElement key={index} delay={index * 100} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3">
                  {stat.number}
                </div>
                <div className="text-xs font-bold tracking-[0.15em] uppercase text-foreground/70">
                  {stat.label}
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Getting Started
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Three Simple Steps
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedElement delay={100}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full font-heading font-bold text-lg">
                  1
                </div>
                <div className="bg-secondary p-10 pt-16 border border-gray-100">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Choose Your Path
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    Select the way you'd like to contribute—whether it's mentoring, volunteering, donating, or spreading the word.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full font-heading font-bold text-lg">
                  2
                </div>
                <div className="bg-secondary p-10 pt-16 border border-gray-100">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Connect With Us
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    Fill out a simple form or reach out directly. Our team will guide you through the process and answer any questions.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full font-heading font-bold text-lg">
                  3
                </div>
                <div className="bg-secondary p-10 pt-16 border border-gray-100">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Make an Impact
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    Start making a difference! We'll provide support, resources, and community every step of the way.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-24 bg-foreground text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/90 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Voices From Our Community
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold">
                Why People Get Involved
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedElement delay={100}>
              <div className="bg-white/10 p-10 border border-white/20 backdrop-blur-sm">
                <p className="text-lg leading-relaxed mb-6 font-light italic">
                  "Mentoring through Ujima has been one of the most rewarding experiences of my life. Seeing my students grow and succeed is truly inspiring."
                </p>
                <div>
                  <p className="font-bold text-primary">Maria Garcia</p>
                  <p className="text-sm text-white/70">Mentor, 3 years</p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white/10 p-10 border border-white/20 backdrop-blur-sm">
                <p className="text-lg leading-relaxed mb-6 font-light italic">
                  "Supporting Ujima's mission means investing in the future of our community. Every contribution makes a real difference."
                </p>
                <div>
                  <p className="font-bold text-primary">James Mitchell</p>
                  <p className="text-sm text-white/70">Donor</p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white/10 p-10 border border-white/20 backdrop-blur-sm">
                <p className="text-lg leading-relaxed mb-6 font-light italic">
                  "I volunteer my tech skills through Ujima's digital literacy workshops. It's amazing to see students discover new possibilities."
                </p>
                <div>
                  <p className="font-bold text-primary">Alex Chen</p>
                  <p className="text-sm text-white/70">Volunteer, 2 years</p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="bg-white/10 p-10 border border-white/20 backdrop-blur-sm">
                <p className="text-lg leading-relaxed mb-6 font-light italic">
                  "Sharing Ujima with my network has connected me with so many passionate people working toward the same goals."
                </p>
                <div>
                  <p className="font-bold text-primary">Sophia Williams</p>
                  <p className="text-sm text-white/70">Community Advocate</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1A4D2E_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedElement>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-12 h-12 mx-auto mb-8 flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Ready to Make a Difference?
              </h2>
              
              <p className="text-lg text-foreground/70 mb-10 leading-relaxed font-light">
                Join our community of supporters and help us empower the next generation of leaders.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300"
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-white font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
      <Footer />
    </div>
  );
}
