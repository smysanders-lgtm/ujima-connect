import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { EducationalPrograms } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgramRegistrationForm from '@/components/ProgramRegistrationForm';
import { BookOpen, GraduationCap, Laptop, Settings, Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<EducationalPrograms[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [registrationFormOpen, setRegistrationFormOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<EducationalPrograms | null>(null);

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

  // Carousel logic
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(filteredPrograms.length / itemsPerSlide);
  const currentSlidePrograms = filteredPrograms.slice(
    carouselIndex * itemsPerSlide,
    (carouselIndex + 1) * itemsPerSlide
  );

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Reset carousel when category changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [selectedCategory]);

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

  const openRegistrationForm = (program: EducationalPrograms) => {
    setSelectedProgram(program);
    setRegistrationFormOpen(true);
  };

  const closeRegistrationForm = () => {
    setRegistrationFormOpen(false);
    setSelectedProgram(null);
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
      {/* Programs Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : filteredPrograms.length > 0 ? (
              <div className="max-w-7xl mx-auto">
                {/* Carousel Container */}
                <div className="relative">
                  {/* Carousel Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentSlidePrograms.map((program, index) => (
                      <AnimatedElement key={program._id} delay={index * 50}>
                        <div className="border border-foreground/10 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                          {/* Program Image */}
                          <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/30 flex items-center justify-center">
                            {program.programImage ? (
                              <Image
                                src={program.programImage}
                                alt={program.programName || 'Program'}
                                width={300}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center">
                                {getIconForProgram(program.programName)}
                              </div>
                            )}
                          </div>

                          {/* Program Content */}
                          <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                              {program.programName}
                            </h3>
                            <p className="text-sm text-foreground/60 mb-4 line-clamp-2">
                              {program.tagline || program.shortDescription}
                            </p>

                            {/* Program Details */}
                            <div className="space-y-3 mb-6 flex-1">
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

                              {program.cost && (
                                <div>
                                  <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide">Cost</p>
                                  <p className="text-sm text-foreground font-paragraph mt-1">{program.cost}</p>
                                </div>
                              )}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex gap-2 flex-wrap">
                              <Button
                                onClick={() => openRegistrationForm(program)}
                                className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 flex-1"
                              >
                                Register
                              </Button>
                              <Button
                                onClick={() => navigate(`/programs/${program._id}`)}
                                className="text-foreground hover:bg-foreground/20 transition-all duration-200 flex-1 bg-secondary"
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AnimatedElement>
                    ))}
                  </div>

                  {/* Carousel Controls */}
                  {totalSlides > 1 && (
                    <div className="flex items-center justify-between mt-8">
                      <button
                        onClick={handlePrevSlide}
                        className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-200"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft size={24} />
                      </button>

                      {/* Slide Indicators */}
                      <div className="flex gap-2">
                        {Array.from({ length: totalSlides }).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCarouselIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              idx === carouselIndex ? 'bg-primary w-8' : 'bg-foreground/20'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={handleNextSlide}
                        className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-200"
                        aria-label="Next slide"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  )}

                  {/* Slide Counter */}
                  <div className="text-center mt-6 text-foreground/60 text-sm">
                    Slide {carouselIndex + 1} of {totalSlides}
                  </div>
                </div>
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
      {/* Registration Form Modal */}
      {registrationFormOpen && selectedProgram && (
        <ProgramRegistrationForm
          programName={selectedProgram.programName || 'Program'}
          onClose={closeRegistrationForm}
        />
      )}
      <Footer />
    </div>
  );
}
