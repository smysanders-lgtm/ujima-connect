import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
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
      name: 'Kesha L. Ford',
      role: 'Creative Writing Facilitator & Author',
      bio: 'A three-time published author of Seasons of Life, Seasons of Life: Continue On, and Rivers of Sister Ties, known for emotionally driven storytelling and compelling characters. She has ghostwritten for CEOs, retired professional athletes, and other professionals, and is passionate about mentoring aspiring authors through her writing, mentorship, volunteer work, and mission trips.',
      image: 'https://static.wixstatic.com/media/0538ae_56d9d3dbafa24692b4fb6f57c927614a~mv2.png',
      tags: ['Creative Writing', 'Mentorship']
    }
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground selection:bg-primary/30">
      <Header />
      {/* Hero Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-6">
              <span className="text-xs md:text-sm text-foreground/60 font-paragraph tracking-[0.2em] uppercase">
                Team
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight text-foreground">
              Meet the Team
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={200}>
            <div className="w-16 h-1 bg-primary mb-8" />
          </AnimatedElement>

          <AnimatedElement delay={300}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl font-light">
              The mentors, educators, and writers behind Ujima's programs.
            </p>
          </AnimatedElement>
        </div>
      </section>
      {/* Founder Spotlight Section */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-12">
              <span className="text-xs md:text-sm text-foreground/60 font-paragraph tracking-[0.2em] uppercase">
                Founder
              </span>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Founder Image */}
            <AnimatedElement delay={100}>
              <div className="relative overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/0538ae_69faf28b5bd64aaa9b44ef3470ae5244~mv2.png"
                  className="w-full h-auto object-cover"
                  originWidth={1024}
                  originHeight={1024} />
              </div>
            </AnimatedElement>

            {/* Founder Content */}
            <AnimatedElement delay={200}>
              <div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
                  Dara Baker
                </h2>
                <p className="text-primary font-semibold text-sm mb-6 tracking-wide uppercase">
                  Founder & Community Leader
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed font-light">
                  Author and community leader specializing in business strategy using AI, driven by a commitment to serving her community.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Team Grid Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-foreground/60 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Our Team
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Educators & Mentors
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <AnimatedElement key={member.id} delay={index * 100}>
                <div className="bg-white border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-500 group overflow-hidden flex flex-col h-full">
                  {/* Team Member Image */}
                  <div className="relative overflow-hidden h-80 bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Team Member Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-6 tracking-wide uppercase">
                      {member.role}
                    </p>

                    <p className="text-foreground/70 leading-relaxed font-light mb-8 flex-1">
                      {member.bio}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {member.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-secondary text-foreground px-3 py-1.5 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-32 bg-foreground text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedElement>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Want to Help Us Grow?
              </h2>
              
              <p className="text-lg text-white/80 mb-10 leading-relaxed font-light">
                We're looking for passionate educators, writers, and mentors to join our mission of empowering communities through education.
              </p>
              
              <Link to="/get-involved">
                <Button
                  className="bg-primary text-foreground hover:bg-primary/90 font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300"
                >
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>
      <Footer />
    </div>
  );
}
