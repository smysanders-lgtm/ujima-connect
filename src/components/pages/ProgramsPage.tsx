import { useEffect, useRef, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { EducationalPrograms } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, GraduationCap, Laptop, Settings, ChevronDown, Check } from 'lucide-react';

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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<EducationalPrograms[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const result = await BaseCrudService.getAll<EducationalPrograms>('educationalprograms');
      setPrograms(result.items);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(programs.map(p => p.category).filter(Boolean)))];
  const filteredPrograms = selectedCategory === 'all' 
    ? programs
    : programs.filter(p => p.category === selectedCategory);

  const getIconForProgram = (programName?: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Virtual Tutoring': <BookOpen size={32} className="text-primary" />,
      'Essay & College Prep': <GraduationCap size={32} className="text-primary" />,
      'AI & Digital Skills': <Settings size={32} className="text-primary" />,
      'Microsoft Copilot Masterclass': <Laptop size={32} className="text-primary" />,
    };
    return iconMap[programName || ''] || <BookOpen size={32} className="text-primary" />;
  };

  const parseWhatsIncluded = (text?: string) => {
    if (!text) return [];
    return text.split('\n').filter(item => item.trim());
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,168,76,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Our Programs
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Comprehensive educational offerings designed to empower learners at every stage of their journey.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Filter Section */}
      {categories.length > 1 && (
        <section className="py-8 bg-secondary/20 border-b border-foreground/10">
          <div className="container mx-auto px-4">
            <AnimatedElement>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-paragraph text-sm transition-all duration-200 hover:scale-[1.02] ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-foreground border border-foreground/10 hover:border-primary'
                    }`}
                  >
                    {category === 'all' ? 'All Programs' : category}
                  </button>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </section>
      )}

      {/* Programs Accordion */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px] max-w-4xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : filteredPrograms.length > 0 ? (
              <div className="space-y-4">
                {filteredPrograms.map((program, index) => (
                  <AnimatedElement key={program._id} delay={index * 50}>
                    <div className="border border-foreground/10 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
                      {/* Accordion Header */}
                      <button
                        onClick={() => setExpandedId(expandedId === program._id ? null : program._id)}
                        className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/10 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-4 text-left flex-1">
                          <div className="flex-shrink-0">
                            {program.programImage ? (
                              <div className="w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src={program.programImage}
                                  alt={program.programName || 'Program'}
                                  width={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/30 flex items-center justify-center">
                                {getIconForProgram(program.programName)}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-heading font-bold text-foreground">
                                {program.programName}
                              </h3>
                            </div>
                            <p className="text-sm text-foreground/60 line-clamp-1">
                              {program.tagline || program.shortDescription || program.detailedDescription}
                            </p>
                          </div>
                        </div>
                        
                        <ChevronDown
                          size={24}
                          className={`text-primary transition-transform duration-300 flex-shrink-0 ${
                            expandedId === program._id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {/* Accordion Content */}
                      {expandedId === program._id && (
                        <div className="px-6 py-5 border-t border-foreground/10 bg-secondary/5">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-4">
                              {/* Description */}
                              <div>
                                <h4 className="font-heading font-bold text-foreground mb-2">About This Program</h4>
                                <p className="text-foreground/70 leading-relaxed">
                                  {program.detailedDescription || program.shortDescription}
                                </p>
                              </div>

                              {/* What's Included */}
                              {program.whatsIncluded && (
                                <div>
                                  <h4 className="font-heading font-bold text-foreground mb-3">What's Included</h4>
                                  <ul className="space-y-2">
                                    {parseWhatsIncluded(program.whatsIncluded).map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-3">
                                        <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-foreground/70">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* CTA Button */}
                              <Button
                                asChild
                                className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 mt-4"
                              >
                                <a href="/contact">Get started →</a>
                              </Button>
                            </div>

                            {/* Sidebar Details */}
                            <div className="lg:col-span-1">
                              <div className="bg-white rounded-lg p-4 border border-foreground/10 space-y-4">
                                <h4 className="font-heading font-bold text-foreground text-sm">Program Details</h4>
                                
                                {program.targetAudience && (
                                  <div>
                                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide">Who It's For</p>
                                    <p className="text-sm text-foreground font-paragraph mt-1">{program.targetAudience}</p>
                                  </div>
                                )}

                                {program.format && (
                                  <div>
                                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide">Format</p>
                                    <p className="text-sm text-foreground font-paragraph mt-1">{program.format}</p>
                                  </div>
                                )}

                                {program.schedule && (
                                  <div>
                                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide">Schedule</p>
                                    <p className="text-sm text-foreground font-paragraph mt-1">{program.schedule}</p>
                                  </div>
                                )}

                                {program.cost && (
                                  <div>
                                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide">Cost</p>
                                    <p className="text-sm text-foreground font-paragraph mt-1">{program.cost}</p>
                                  </div>
                                )}

                                {program.platform && (
                                  <div>
                                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide">Platform</p>
                                    <p className="text-sm text-foreground font-paragraph mt-1">{program.platform}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 text-lg">No programs found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90 text-white">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ready to Enroll?
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Join our community of learners today. Our programs are designed to meet you where you are and help you reach your goals.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
              >
                <a href="/contact">Get Started Today</a>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
