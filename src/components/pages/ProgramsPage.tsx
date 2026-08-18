import { useEffect, useRef, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { EducationalPrograms } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, GraduationCap, Laptop, Briefcase } from 'lucide-react';

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

  const getIconForIndex = (index: number) => {
    const icons = [BookOpen, GraduationCap, Laptop, Briefcase];
    const Icon = icons[index % icons.length];
    return <Icon size={32} className="text-primary" />;
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

      {/* Programs Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : filteredPrograms.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((program, index) => (
                  <AnimatedElement key={program._id} delay={index * 50}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 h-full flex flex-col">
                      {program.programImage ? (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={program.programImage}
                            alt={program.programName || 'Program'}
                            width={600}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        </div>
                      ) : (
                        <div className="h-56 bg-gradient-to-br from-primary/10 to-secondary/30 flex items-center justify-center">
                          {getIconForIndex(index)}
                        </div>
                      )}
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-5xl font-heading font-bold text-primary/10">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {program.category && (
                            <span className="px-3 py-1 bg-secondary text-foreground text-xs rounded-full font-medium">
                              {program.category}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                          {program.programName}
                        </h3>
                        
                        <p className="text-foreground/70 leading-relaxed mb-4 flex-1">
                          {program.detailedDescription || program.shortDescription}
                        </p>
                        
                        {program.targetAudience && (
                          <div className="pt-4 border-t border-foreground/10">
                            <p className="text-sm text-foreground/60">
                              <span className="font-medium text-foreground">Target Audience:</span>{' '}
                              {program.targetAudience}
                            </p>
                          </div>
                        )}
                      </div>
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
