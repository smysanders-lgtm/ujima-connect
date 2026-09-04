import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const itemsPerView = 3;
  const totalSlides = Math.ceil(teamMembers.length / itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
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



      {/* Founder Spotlight Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-secondary/10 to-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedElement>
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-accent/20 rounded-full">
                <Sparkles size={16} className="text-accent" />
                <span className="text-xs text-accent font-paragraph tracking-[0.1em] uppercase font-semibold">
                  Founder Spotlight
                </span>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <div className="max-w-4xl mx-auto mb-20">
              <motion.div 
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-secondary/30 hover:border-accent/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Image Section - Square */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-secondary/30 to-accent/10 aspect-square md:aspect-auto md:min-h-[500px]">
                      <Image
                        src="https://static.wixstatic.com/media/0538ae_014b31ccb343415088081312249f54cc~mv2.png?originWidth=448&originHeight=448"
                        alt="Dara Baker - Founder"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Founder Badge */}
                      <div className="absolute top-6 right-6 bg-accent text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                        Founder
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="mb-6">
                        <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">
                          Dara Baker
                        </h3>
                        <p className="text-accent font-semibold text-lg tracking-wide mb-6">
                          Founder & Community Leader
                        </p>
                      </div>

                      <p className="text-foreground/75 leading-relaxed font-light text-base mb-6">
                        Founder of Ujima Creative Writing & Services, Dara Baker is a writer, educator, and creative strategist committed to uplifting communities through storytelling and technology. She holds a BA in Arts from Chicago State University, an MBA in Business Management from the University of Phoenix, a Project Management Certificate from Collin Community College, and a Certificate in Artificial Intelligence: Implications for Business Strategy from Massachusetts Institute of Technology (MIT) Sloan Management School.
                      </p>

                      <p className="text-foreground/70 leading-relaxed font-light text-base">
                        Dara's work spans creative writing, corporate documentation, and international training with a multi-cultural training program. She has published poems in Grass Roots Magazine, written numerous memorial and obituary poems, authored extensive Standard Operating Procedures across multiple industries, and traveled abroad to train teams on advanced publishing tools and workflow systems.
                      </p>

                      {/* Decorative Line */}
                      <div className="mt-8 pt-8 border-t border-secondary/30">
                        <p className="text-foreground/60 text-sm font-light italic">
                          "Empowering communities through storytelling and technology"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Team Carousel Section - Full Width */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-secondary/5 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedElement>
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-secondary/40 rounded-full">
                <Users size={16} className="text-primary" />
                <span className="text-xs text-foreground font-paragraph tracking-[0.1em] uppercase font-semibold">
                  Our Team
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg md:text-xl text-foreground/70 font-light max-w-3xl mx-auto">
                The passionate mentors, educators, and leaders dedicated to empowering communities through education and creative expression.
              </p>
            </div>
          </AnimatedElement>

          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner className="text-primary w-8 h-8" />
              </div>
            ) : teamMembers.length > 0 ? (
              <div className="relative">
                {/* Large Carousel Container */}
                <div ref={carouselRef} className="overflow-hidden">
                  <motion.div
                    className="flex gap-8"
                    animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {teamMembers.map((member, index) => (
                      <div
                        key={member._id}
                        className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                      >
                        <AnimatedElement delay={index * 50}>
                          <motion.div 
                            whileHover={{ y: -8 }}
                            className="group h-full"
                          >
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 hover:border-secondary/50">
                              {/* Team Member Image - Larger */}
                              <div className="relative overflow-hidden h-96 bg-gradient-to-br from-secondary/20 to-accent/10">
                                {member.profilePicture ? (
                                  <Image
                                    src={member.profilePicture}
                                    alt={member.name || 'Team member'}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                    <Users className="w-24 h-24 text-primary/20" />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              </div>

                              {/* Team Member Content - Enhanced */}
                              <div className="p-8 flex-1 flex flex-col">
                                <div className="mb-6">
                                  <h3 className="text-3xl font-heading font-bold text-foreground mb-2">
                                    {member.name || 'Team Member'}
                                  </h3>
                                  <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
                                    {member.role || 'Team Member'}
                                  </p>
                                </div>

                                <p className="text-foreground/70 leading-relaxed font-light mb-6 flex-1 text-base">
                                  {member.bio || ''}
                                </p>

                                {/* Skills/Expertise Tags */}
                                {member.expertise && (
                                  <div className="flex flex-wrap gap-2 mb-6">
                                    {member.expertise.split(',').map((skill, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-block px-4 py-2 bg-foreground/10 text-foreground text-xs font-semibold rounded-full border border-foreground/20 hover:bg-foreground/15 transition-colors"
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
                                    className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors duration-300 font-semibold text-sm pt-6 border-t border-gray-100 w-fit"
                                  >
                                    <Linkedin className="w-5 h-5" />
                                    Connect
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        </AnimatedElement>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Navigation Buttons - Larger */}
                <div className="flex items-center justify-between mt-12">
                  <button
                    onClick={handlePrev}
                    className="p-4 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                    aria-label="Previous team members"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex gap-3">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`rounded-full transition-all duration-300 ${
                          idx === currentIndex
                            ? 'bg-primary w-10 h-3'
                            : 'bg-primary/30 w-3 h-3 hover:bg-primary/50'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="p-4 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
                    aria-label="Next team members"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 font-light text-lg">Team members will appear here. Add team members in the CMS to get started.</p>
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
