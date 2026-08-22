import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Heart, Share2, Users, Megaphone, ArrowRight, CheckCircle2, Facebook, Twitter, Linkedin } from 'lucide-react';
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

export default function SpreadTheWordPage() {
  const sharingMethods = [
    {
      icon: Facebook,
      title: 'Share on Facebook',
      description: 'Post about our mission to your network',
      action: 'Share Now',
      benefits: ['Reach your friends and family', 'Easy one-click sharing', 'Help spread awareness']
    },
    {
      icon: Twitter,
      title: 'Tweet About Us',
      description: 'Use your voice to amplify our message',
      action: 'Tweet Now',
      benefits: ['Join the conversation', 'Use our hashtags', 'Connect with supporters']
    },
    {
      icon: Linkedin,
      title: 'Share on LinkedIn',
      description: 'Tell your professional network',
      action: 'Share Now',
      benefits: ['Reach professionals', 'Build partnerships', 'Expand our reach']
    },
    {
      icon: Users,
      title: 'Refer a Student',
      description: 'Know someone who could benefit?',
      action: 'Refer Now',
      benefits: ['Help a deserving student', 'Grow our community', 'Make an impact']
    }
  ];

  const hostingOptions = [
    {
      title: 'Host a Community Event',
      description: 'Organize a local gathering to share our mission',
      details: [
        'We provide materials and support',
        'Flexible format and timing',
        'Build community connections',
        'Inspire local action'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format'
    },
    {
      title: 'Partner With Your Organization',
      description: 'Bring our programs to your workplace or group',
      details: [
        'Customized partnership options',
        'Employee engagement programs',
        'Corporate social responsibility',
        'Mutual growth opportunities'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format'
    }
  ];

  const successStories = [
    {
      name: 'David Martinez',
      role: 'Community Ambassador',
      story: 'After sharing Ujima with his workplace, David helped organize a company volunteer day that brought 20 employees to mentor our students.',
      impact: '20 volunteers engaged'
    },
    {
      name: 'Emma Thompson',
      role: 'Social Media Advocate',
      story: 'Emma\'s consistent social media posts about our programs reached over 5,000 people and led to 15 new student enrollments.',
      impact: '15 new students'
    },
    {
      name: 'Marcus Johnson',
      role: 'Event Host',
      story: 'Marcus hosted a community event that attracted 100+ attendees and resulted in $10,000 in donations and 8 new mentors.',
      impact: '100+ attendees'
    },
    {
      name: 'Lisa Chen',
      role: 'Corporate Partner',
      story: 'Lisa connected us with her company, leading to a partnership that provides internships for 10 students annually.',
      impact: '10 internships/year'
    }
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground selection:bg-primary/30">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#151615] text-white overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 w-full h-full lg:w-[60%] lg:left-auto lg:right-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#151615] via-[#151615]/80 to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-[#151615]/60 lg:hidden z-10" />
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1000&fit=crop&auto=format"
            alt="Spread the word about our mission"
            className="w-full h-full object-cover object-center opacity-70 lg:opacity-100"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 py-20">
          <div className="max-w-2xl">
            <AnimatedElement>
              <div className="mb-6">
                <span className="text-xs md:text-sm text-primary/90 font-paragraph tracking-[0.2em] uppercase">
                  Spread the Word
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                Amplify Our <br className="hidden md:block" />
                <span className="text-primary">Message</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl font-light">
                Help us reach more families and students by sharing our mission with your network. Every share, referral, and partnership expands our impact.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Sharing Methods */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Ways to Share
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Easy Ways to Spread the Word
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sharingMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <AnimatedElement key={index} delay={index * 100}>
                  <div className="bg-white border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 p-8 flex flex-col h-full group">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300 mb-6">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>

                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      {method.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed font-light mb-6 flex-1">
                      {method.description}
                    </p>

                    <div className="space-y-2 mb-8 pb-8 border-b border-gray-100">
                      {method.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold w-full rounded-none transition-all duration-300"
                    >
                      {method.action} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hosting & Partnership */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Bigger Impact
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Host Events & Build Partnerships
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8">
            {hostingOptions.map((option, index) => (
              <AnimatedElement key={index} delay={index * 100}>
                <div className="bg-white border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full group">
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 bg-gray-100">
                    <Image
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                      {option.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed font-light mb-6 flex-1">
                      {option.description}
                    </p>

                    <div className="space-y-3 mb-8 pb-8 border-b border-gray-100">
                      {option.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span className="text-sm text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold w-full rounded-none transition-all duration-300"
                    >
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Community Impact
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Advocates Making a Difference
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <AnimatedElement key={index} delay={index * 100}>
                <div className="bg-secondary p-10 border border-gray-100 hover:border-primary/30 transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {story.name}
                      </h3>
                      <p className="text-sm text-primary font-semibold mt-1">
                        {story.role}
                      </p>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed font-light mb-6">
                    {story.story}
                  </p>

                  <div className="bg-white p-4 border border-gray-100 rounded">
                    <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-1">
                      Impact
                    </p>
                    <p className="text-lg font-heading font-bold text-primary">
                      {story.impact}
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-24 bg-foreground text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/90 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Tools & Resources
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold">
                We Make It Easy
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedElement delay={100}>
              <div className="bg-white/10 p-10 border border-white/20 backdrop-blur-sm">
                <Megaphone className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-heading font-bold mb-3">
                  Ready-Made Content
                </h3>
                <p className="text-white/80 leading-relaxed font-light mb-6">
                  Download social media graphics, sample posts, and email templates to share with your network.
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground font-semibold w-full rounded-none transition-all duration-300"
                >
                  Download Resources
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white/10 p-10 border border-white/20 backdrop-blur-sm">
                <Share2 className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-heading font-bold mb-3">
                  Shareable Links
                </h3>
                <p className="text-white/80 leading-relaxed font-light mb-6">
                  Get unique referral links to track your impact and share with friends and colleagues.
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground font-semibold w-full rounded-none transition-all duration-300"
                >
                  Get Your Link
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white/10 p-10 border border-white/20 backdrop-blur-sm">
                <Users className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-heading font-bold mb-3">
                  Community Support
                </h3>
                <p className="text-white/80 leading-relaxed font-light mb-6">
                  Join our advocates community for tips, inspiration, and support from fellow ambassadors.
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground font-semibold w-full rounded-none transition-all duration-300"
                >
                  Join Community
                </Button>
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
                <Megaphone className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Start Spreading the Word Today
              </h2>
              
              <p className="text-lg text-foreground/70 mb-10 leading-relaxed font-light">
                Every share, referral, and partnership helps us reach more students and families who need our support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300"
                >
                  Share Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-white font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300"
                >
                  <Link to="/get-involved">Back to Get Involved</Link>
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
