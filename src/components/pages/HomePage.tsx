// WI-HPI
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { EducationalPrograms } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BookOpen, Users, Heart, ArrowRight, Shield, CheckCircle2, Leaf, Lightbulb, Zap, Sparkles, Target, Linkedin } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Animated reveal component - Guaranteed to render ref element to prevent crashes
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

export default function HomePage() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<EducationalPrograms[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);

  useEffect(() => {
    loadPrograms();
    loadTeamMembers();
  }, []);

  const loadPrograms = async () => {
    try {
      const result = await BaseCrudService.getAll<EducationalPrograms>('educationalprograms', [], { limit: 4 });
      setPrograms(result.items);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTeamMembers = async () => {
    try {
      const result = await BaseCrudService.getAll<any>('teammembers', [], { limit: 6 });
      setTeamMembers(result.items);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoadingTeam(false);
    }
  };

  // Fallback data matching the screenshot exactly, used ONLY if DB is empty to preserve design fidelity
  const displayPrograms = programs.length > 0 ? programs : [
    { _id: '1', programName: 'Virtual Tutoring', shortDescription: 'One-on-one and group sessions for K–12 students in core subjects, with flexible scheduling built for working families.' },
    { _id: '2', programName: 'Essay & College Prep', shortDescription: 'Personal statement coaching, application strategy, supplemental essays, and scholarship guidance for first-gen students.' },
    { _id: '3', programName: 'AI & Digital Skills', shortDescription: 'Future-ready training in AI tools, digital literacy, online safety, and hands-on creative projects.' },
    { _id: '4', programName: 'Microsoft Copilot Training', shortDescription: 'Professional workshops that teach working adults to leverage AI for productivity, creativity, and career growth.' }
  ];

  const guidingPrinciples = [
    {
      title: 'Ujima',
      subtitle: 'Collective Responsibility',
      description: 'We believe growth happens when we work together, share knowledge, and invest in one another.',
      icon: Users
    },
    {
      title: 'Gye Nyame',
      subtitle: 'Purpose Beyond Self',
      description: 'We honor the greatness of God and recognize that our talents and creativity can serve a purpose greater than ourselves.',
      icon: Sparkles
    },
    {
      title: 'Creativity',
      subtitle: 'Expression & Innovation',
      description: 'We encourage people to think differently, tell their stories, solve problems, and turn ideas into meaningful work.',
      icon: Lightbulb
    },
    {
      title: 'Empowerment',
      subtitle: 'Knowledge Creates Opportunity',
      description: 'We equip individuals with practical knowledge and skills that help them grow academically, creatively, and professionally.',
      icon: Zap
    },
    {
      title: 'Community',
      subtitle: 'Impact Through Connection',
      description: 'We believe meaningful change begins when people have access to resources, encouragement, and opportunities to thrive.',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground selection:bg-primary/30">
      <Header />
      {/* Hero Section - Dark Charcoal Background */}
      <section className="relative bg-[#151615] text-white overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Image with Gradient Mask */}
        <div className="absolute inset-0 w-full h-full lg:w-[60%] lg:left-auto lg:right-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#151615] via-[#151615]/80 to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-[#151615]/60 lg:hidden z-10" />
          <Image
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&h=1000&fit=crop&auto=format"
            alt="Student engaged in writing and learning"
            className="w-full h-full object-cover object-center opacity-70 lg:opacity-100"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 py-20">
          <div className="max-w-2xl">
            <AnimatedElement>
              <div className="mb-6">
                <span className="text-xs md:text-sm font-paragraph tracking-[0.2em] uppercase text-background">
                  Collective Work & Responsibility
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                Empowering <br className="hidden md:block" />
                <span className="text-accent">Learners.</span><br className="text-accent" />
                Strengthening <br className="hidden md:block" />
                Communities.
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl font-light">
                Creativity, education, and technology empowering individuals and strengthening communities. We create opportunities for people to learn, develop skills, express ideas, and confidently navigate an evolving digital world.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/programs')}
                  size="lg"
                  className="text-[#151615] hover:bg-primary/90 font-semibold px-8 py-6 rounded-none transition-all duration-300 hover:scale-[1.02] bg-accent"
                >
                  EXPLORE PROGRAMS
                </Button>
                <Button
                  onClick={() => navigate('/contact')}
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white hover:text-[#151615] font-semibold px-8 py-6 rounded-none transition-all duration-300 bg-transparent"
                >
                  CONTACT US
                </Button>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Features Bar - Solid Green */}
      <section className="bg-foreground text-white py-12 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <AnimatedElement delay={100}>
              <div className="flex gap-4 items-start">
                <div className="mt-1 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary/80" />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2 tracking-wide">Accessible Education</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Virtual learning that reaches students exactly where they are — no transportation barriers, no geographic limits.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="flex gap-4 items-start">
                <div className="mt-1 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary/80" />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2 tracking-wide">Community First</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Programs designed with and for underserved families, not handed down from above.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="flex gap-4 items-start">
                <div className="mt-1 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary/80" />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2 tracking-wide">Holistic Growth</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Academic excellence and emotional well-being are inseparable. We care for the whole person.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Programs Section */}
      <section className="py-24 pt-32 bg-secondary/20 relative overflow-hidden px-6 md:px-12">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#1A4D2E_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedElement>
              <div className="lg:pr-16 mb-12 lg:mb-0">
                <span className="text-sm text-primary font-paragraph tracking-[0.2em] uppercase mb-4 block">
                  Our Programs
                </span>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
                  Designed for <br /> <span className="text-primary">Impact</span>
                </h2>
                <p className="mt-6 text-lg text-foreground/80 leading-relaxed font-light">
                  Discover our diverse range of programs crafted to empower learners and strengthen communities through creativity, education, and technology.
                </p>
                <div className="mt-12">
                  <Button
                    onClick={() => navigate('/programs')}
                    size="lg"
                    className="text-[#151615] hover:bg-primary/90 font-semibold px-10 py-7 rounded-full tracking-widest text-sm uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-accent"
                  >
                    VIEW ALL PROGRAMS
                  </Button>
                </div>
              </div>
            </AnimatedElement>

            <div className="min-h-[400px] relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner className="text-primary w-8 h-8" />
                </div>
              ) : (
                <div className="grid gap-6">
                  {displayPrograms.map((program, index) => (
                    <AnimatedElement key={program._id || index} delay={index * 100}>
                      <div className="bg-white p-8 lg:p-10 h-full border border-gray-100 rounded-lg shadow-md hover:border-primary/50 hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex items-start">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="relative z-10 flex-shrink-0 mr-6 mt-1">
                          <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                            <span className="text-xl font-heading font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                              {String(index + 1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="relative z-10 flex-grow">
                          <h3 className="text-2xl font-heading font-bold text-foreground mb-2 leading-snug">
                            {program.programName}
                          </h3>
                          <p className="text-gray-600 leading-relaxed font-light">
                            {program.shortDescription}
                          </p>
                        </div>
                      </div>
                    </AnimatedElement>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Meet the Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedElement>
            <div className="text-center mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Our Team
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                Meet the Visionaries <br />
                <span className="text-primary">Behind the Mission</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed">
                Dedicated educators, technologists, and community leaders committed to empowering the next generation.
              </p>
            </div>
          </AnimatedElement>

          <div className="min-h-[400px]">
            {isLoadingTeam ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner className="text-primary w-8 h-8" />
              </div>
            ) : teamMembers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <AnimatedElement key={member._id} delay={index * 100}>
                    <div className="group bg-white border border-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-secondary/20 h-64 flex items-center justify-center">
                        {member.profilePicture ? (
                          <Image
                            src={member.profilePicture}
                            alt={member.name || 'Team member'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                            <Users className="w-16 h-16 text-primary/20" />
                          </div>
                        )}
                      </div>

                      {/* Content Container */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                          {member.name || 'Team Member'}
                        </h3>
                        <p className="text-sm text-primary font-semibold mb-3 tracking-wide uppercase">
                          {member.role || 'Team Member'}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed font-light flex-grow mb-4">
                          {member.bio || ''}
                        </p>

                        {/* LinkedIn Link */}
                        {member.linkedInProfile && (
                          <a
                            href={member.linkedInProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors duration-300 font-semibold text-sm"
                          >
                            <Linkedin className="w-4 h-4" />
                            Connect
                          </a>
                        )}
                      </div>
                    </div>
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
      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedElement>
              <div className="pr-8">
                <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                  Our Story
                </span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight">
                  Built for Community, <br />
                  <span className="italic font-light">By</span> Community
                </h2>
                
                <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                  <p>
                    Ujima Creative is rooted in the belief that creativity, education, and technology can empower individuals and strengthen communities. We create opportunities for people to learn, develop their skills, express their ideas, and confidently navigate an evolving digital world.
                  </p>
                  <p>
                    Our name, <span className="font-medium italic text-foreground">Ujima</span>, reflects the principle of collective work and responsibility—the idea that we have a shared responsibility to build, support, and improve the communities around us.
                  </p>
                </div>
                
                <div className="mt-10">
                  <Button
                    onClick={() => navigate('/about')}
                    variant="link"
                    className="text-primary hover:text-foreground p-0 h-auto font-semibold tracking-wide transition-colors duration-300"
                  >
                    Read our story <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="flex justify-center">
                <div className="relative group max-w-2xl">
                  <div className="absolute -inset-4 bg-secondary/50 transform rotate-2 transition-transform duration-500 group-hover:rotate-1" />
                  <Image
                    src="https://static.wixstatic.com/media/0538ae_ba31ad6ec9bb4f2b849e40a24807bb10~mv2.jpg"
                    className="relative w-full h-[350px] sm:h-[450px] md:h-[600px] object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                    originWidth={2289}
                    originHeight={1613}
                    focalPointX={73.94058540847531}
                    focalPointY={30.68815871047737} />
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        {/* Decorative subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1A4D2E_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedElement>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-12 h-12 mx-auto mb-8 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Ready to Get Started?
              </h2>
              
              <p className="text-lg text-foreground/70 mb-10 leading-relaxed font-light">
                Reach out today to learn how our programs can support your family or community. No family is ever turned away due to financial need.
              </p>
              
              <Button
                onClick={() => navigate('/contact')}
                size="lg"
                className="text-[#151615] hover:bg-primary/90 font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-accent"
              >
                GET IN TOUCH
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>
      <Footer />
    </div>
  );
}
