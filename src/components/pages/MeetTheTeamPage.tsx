import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Linkedin } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
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
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const result = await BaseCrudService.getAll<TeamMembers>('teammembers');
      setTeamMembers(result.items);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground selection:bg-primary/30">
      <Header />
      
      {/* Hero Section - Compact */}
      <section className="relative bg-white pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <AnimatedElement>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-secondary/40 rounded-full">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs text-foreground font-paragraph tracking-[0.1em] uppercase font-semibold">
                Our Leadership
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 leading-[1.1] tracking-tight text-foreground">
              Meet the Team
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={200}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl font-light">
              The passionate mentors, educators, and writers behind Ujima's transformative programs, dedicated to empowering communities through education and creative expression.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Founder Spotlight Section - Compact */}
      <section className="relative py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <AnimatedElement>
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-secondary/40 rounded-full">
              <span className="text-xs text-foreground font-paragraph tracking-[0.1em] uppercase font-semibold">
                Founder & Vision
              </span>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Founder Image */}
            <AnimatedElement delay={100}>
              <div className="relative group">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
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
              <div className="space-y-5">
                <div>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2 leading-tight">
                    Dara Baker
                  </h2>
                  <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-4">
                    Founder & Community Leader
                  </p>
                </div>
                
                <p className="text-base md:text-lg text-foreground/75 leading-relaxed font-light">
                  Founder of Ujima Creative Writing & Services, Dara Baker is a writer, educator, and creative strategist committed to uplifting communities through storytelling and technology. She holds a BA in Arts from Chicago State University, an MBA in Business Management from the University of Phoenix, a Project Management Certificate from Collin Community College, and a Certificate in Artificial Intelligence: Implications for Business Strategy from Massachusetts Institute of Technology (MIT) Sloan Management School. Dara's work spans creative writing, corporate documentation, and international training with a multi-cultural training program. She has published poems in Grass Roots Magazine, written numerous memorial and obituary poems, authored extensive Standard Operating Procedures across multiple industries, and traveled abroad to train teams on advanced publishing tools and workflow systems.
                </p>

                <div className="pt-2">
                  <Link to="/about">
                    <Button className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 group text-sm">
                      Learn More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Team Grid Section - Compact */}
      <section className="relative py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedElement>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-secondary/40 rounded-full">
                <span className="text-xs text-foreground font-paragraph tracking-[0.1em] uppercase font-semibold">
                  Our Team
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-3">
                Educators & Mentors
              </h2>
              <p className="text-base text-foreground/60 font-light">
                Meet the dedicated professionals shaping futures and inspiring change through education and mentorship.
              </p>
            </div>
          </AnimatedElement>

          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner className="text-primary w-8 h-8" />
              </div>
            ) : teamMembers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <AnimatedElement key={member._id} delay={index * 100}>
                    <motion.div 
                      whileHover={{ y: -4 }}
                      className="group h-full"
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-gray-100 hover:border-secondary/50">
                        {/* Team Member Image */}
                        <div className="relative overflow-hidden h-72 bg-gradient-to-br from-secondary/20 to-accent/10">
                          {member.profilePicture ? (
                            <Image
                              src={member.profilePicture}
                              alt={member.name || 'Team member'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                              <Users className="w-16 h-16 text-primary/20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Team Member Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="mb-4">
                            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                              {member.name || 'Team Member'}
                            </h3>
                            <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-4">
                              {member.role || 'Team Member'}
                            </p>
                          </div>

                          <p className="text-foreground/70 leading-relaxed font-light mb-6 flex-1 text-sm">
                            {member.bio || ''}
                          </p>

                          {/* Skills/Expertise Tags */}
                          {member.expertise && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {member.expertise.split(',').map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-3 py-1.5 bg-foreground/10 text-foreground text-xs font-semibold rounded-full border border-foreground/20 hover:bg-foreground/15 transition-colors"
                                >
                                  {skill.trim()}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* LinkedIn Link */}
                          {member.linkedInProfile && (
                            <a
                              href={member.linkedInProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors duration-300 font-semibold text-sm pt-4 border-t border-gray-100"
                            >
                              <Linkedin className="w-4 h-4" />
                              Connect
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 font-light">Team members will appear here. Add team members in the CMS to get started.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-foreground via-foreground to-primary text-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <AnimatedElement>
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
                  Ready to Make an Impact?
                </h2>
                <p className="text-lg md:text-xl text-white/85 leading-relaxed font-light max-w-2xl mx-auto">
                  Join our community of passionate educators, writers, and mentors dedicated to empowering learners and strengthening communities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Link to="/get-involved">
                  <Button
                    className="inline-flex items-center gap-2 bg-white text-foreground hover:bg-secondary font-semibold px-8 py-2.5 rounded-lg transition-all duration-300 group text-sm"
                  >
                    Become a Mentor
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="inline-flex items-center gap-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-2.5 rounded-lg transition-all duration-300 text-sm"
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
