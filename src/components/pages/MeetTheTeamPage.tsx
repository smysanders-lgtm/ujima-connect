import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
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
      
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-white via-secondary/20 to-white pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl -z-10 opacity-50" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <AnimatedElement>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-secondary/50 rounded-full">
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs md:text-sm text-foreground font-paragraph tracking-[0.15em] uppercase font-semibold">
                Our Leadership
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-[1.05] tracking-tight text-foreground">
              Meet the Team
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={200}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full" />
              <div className="w-12 h-1.5 bg-primary/30 rounded-full" />
            </div>
          </AnimatedElement>

          <AnimatedElement delay={300}>
            <p className="text-xl md:text-2xl text-foreground/75 leading-relaxed max-w-3xl font-light">
              The passionate mentors, educators, and writers behind Ujima's transformative programs, dedicated to empowering communities through education and creative expression.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Founder Spotlight Section - Enhanced */}
      <section className="relative py-28 md:py-40 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <AnimatedElement>
            <div className="inline-flex items-center gap-2 mb-12 px-4 py-2 bg-secondary/40 rounded-full">
              <span className="text-xs md:text-sm text-foreground font-paragraph tracking-[0.15em] uppercase font-semibold">
                Founder & Vision
              </span>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Founder Image */}
            <AnimatedElement delay={100}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-secondary to-accent/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://static.wixstatic.com/media/0538ae_aba9d8c6134b4d398636a60f071f5548~mv2.jpg"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    originWidth={1024}
                    originHeight={1536}
                    focalPointX={44.62890625}
                    focalPointY={36.328125}
                    alt="Dara Baker, Founder"
                  />
                </div>
              </div>
            </AnimatedElement>

            {/* Founder Content */}
            <AnimatedElement delay={200}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4 leading-tight">
                    Dara Baker
                  </h2>
                  <div className="inline-flex items-center gap-3 mb-8">
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                    <p className="text-primary font-semibold text-sm tracking-wide uppercase">
                      Founder & Community Leader
                    </p>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                  Author and community leader specializing in business strategy using AI, driven by a commitment to serving her community. Dara's vision is to create accessible pathways for education and creative expression.
                </p>

                <div className="pt-4">
                  <Link to="/about">
                    <Button className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 font-semibold px-8 py-3 rounded-lg transition-all duration-300 group">
                      Learn More
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Team Grid Section - Enhanced */}
      <section className="relative py-28 md:py-40 bg-gradient-to-b from-secondary/10 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedElement>
            <div className="mb-20">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-secondary/40 rounded-full">
                <span className="text-xs md:text-sm text-foreground font-paragraph tracking-[0.15em] uppercase font-semibold">
                  Our Team
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
                Educators & Mentors
              </h2>
              <p className="text-lg text-foreground/60 mt-6 max-w-2xl font-light">
                Meet the dedicated professionals shaping futures and inspiring change through education and mentorship.
              </p>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <AnimatedElement key={member.id} delay={index * 100}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group h-full"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 hover:border-secondary/50">
                    {/* Team Member Image */}
                    <div className="relative overflow-hidden h-96 bg-gradient-to-br from-secondary/20 to-accent/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Team Member Content */}
                    <div className="p-10 flex-1 flex flex-col">
                      <div className="mb-6">
                        <h3 className="text-3xl font-heading font-bold text-foreground mb-3">
                          {member.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                          <p className="text-primary font-semibold text-xs tracking-widest uppercase">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-foreground/70 leading-relaxed font-light mb-10 flex-1 text-base">
                        {member.bio}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
                        {member.tags.map((tag, idx) => (
                          <motion.span 
                            key={idx} 
                            whileHover={{ scale: 1.05 }}
                            className="text-xs bg-gradient-to-r from-secondary to-secondary/70 text-foreground px-4 py-2 font-semibold rounded-full cursor-default transition-all"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-32 md:py-40 bg-gradient-to-br from-foreground via-foreground to-primary text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <AnimatedElement>
            <div className="text-center space-y-8">
              <div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
                  Ready to Make an Impact?
                </h2>
                <p className="text-xl md:text-2xl text-white/85 leading-relaxed font-light max-w-2xl mx-auto">
                  Join our community of passionate educators, writers, and mentors dedicated to empowering learners and strengthening communities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link to="/get-involved">
                  <Button
                    className="inline-flex items-center gap-2 bg-white text-foreground hover:bg-secondary font-semibold px-10 py-4 rounded-lg transition-all duration-300 group text-lg"
                  >
                    Become a Mentor
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="inline-flex items-center gap-2 border-white text-white hover:bg-white/10 font-semibold px-10 py-4 rounded-lg transition-all duration-300 text-lg"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
