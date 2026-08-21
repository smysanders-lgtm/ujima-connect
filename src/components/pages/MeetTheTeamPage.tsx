import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Linkedin, Mail, Heart } from 'lucide-react';
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

export default function MeetTheTeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Executive Director & Founder',
      bio: 'Education advocate with 15+ years of experience in community development and youth empowerment.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&auto=format',
      expertise: ['Education', 'Community Leadership', 'Program Development']
    },
    {
      id: 2,
      name: 'Marcus Williams',
      role: 'Director of Programs',
      bio: 'Passionate educator specializing in creative writing and student mentorship across diverse communities.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format',
      expertise: ['Creative Writing', 'Mentorship', 'Curriculum Design']
    },
    {
      id: 3,
      name: 'Aisha Patel',
      role: 'Mental Health & Wellness Coordinator',
      bio: 'Licensed counselor dedicated to supporting student well-being and creating safe learning spaces.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&auto=format',
      expertise: ['Mental Health', 'Wellness', 'Student Support']
    },
    {
      id: 4,
      name: 'James Chen',
      role: 'Technology & Digital Skills Lead',
      bio: 'Tech innovator focused on making digital literacy accessible to underserved communities.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&auto=format',
      expertise: ['AI & Technology', 'Digital Literacy', 'Innovation']
    },
    {
      id: 5,
      name: 'Keisha Brown',
      role: 'Community Outreach Manager',
      bio: 'Connector and advocate building relationships with families and community organizations.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format',
      expertise: ['Community Engagement', 'Outreach', 'Partnership Building']
    },
    {
      id: 6,
      name: 'David Rodriguez',
      role: 'College Prep Advisor',
      bio: 'First-generation college graduate helping students navigate applications and scholarships.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&auto=format',
      expertise: ['College Prep', 'Scholarships', 'Student Advising']
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
            alt="Our dedicated team"
            className="w-full h-full object-cover object-center opacity-70 lg:opacity-100"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 py-20">
          <div className="max-w-2xl">
            <AnimatedElement>
              <div className="mb-6">
                <span className="text-xs md:text-sm text-primary/90 font-paragraph tracking-[0.2em] uppercase">
                  Our Team
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                Meet the <br className="hidden md:block" />
                <span className="text-primary">Visionaries</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl font-light">
                Dedicated educators, advocates, and community leaders committed to transforming lives through education.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Our People
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Passionate Educators & Leaders
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <AnimatedElement key={member.id} delay={index * 100}>
                <div className="bg-white border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group overflow-hidden flex flex-col h-full">
                  {/* Team Member Image */}
                  <div className="relative overflow-hidden h-64 bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151615]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Team Member Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-4 tracking-wide">
                      {member.role}
                    </p>

                    <p className="text-gray-600 leading-relaxed font-light mb-6 flex-1">
                      {member.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {member.expertise.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-secondary text-foreground px-3 py-1 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors py-2">
                        <Linkedin className="w-4 h-4" />
                        Connect
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors py-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                What Drives Us
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Our Core Values
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedElement delay={100}>
              <div className="bg-white p-10 border border-gray-100">
                <div className="w-12 h-12 mb-6 flex items-center justify-center bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Community First
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  We believe in the power of collective action. Every decision we make is guided by what's best for the communities we serve.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white p-10 border border-gray-100">
                <div className="w-12 h-12 mb-6 flex items-center justify-center bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Equity & Access
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Quality education should never be limited by geography, income, or circumstance. We're committed to removing barriers.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white p-10 border border-gray-100">
                <div className="w-12 h-12 mb-6 flex items-center justify-center bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Holistic Growth
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  We nurture the whole person—mind, heart, and spirit. Academic excellence and emotional well-being go hand in hand.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="bg-white p-10 border border-gray-100">
                <div className="w-12 h-12 mb-6 flex items-center justify-center bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Innovation & Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  We continuously evolve our programs, embrace new technologies, and strive for excellence in everything we do.
                </p>
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
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Join Our Mission
              </h2>
              
              <p className="text-lg text-white/70 mb-10 leading-relaxed font-light">
                We're always looking for passionate individuals to join our team. If you share our vision, we'd love to hear from you.
              </p>
              
              <Button
                className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300"
              >
                View Opportunities
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
