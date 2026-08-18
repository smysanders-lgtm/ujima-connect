import { useEffect, useRef, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { MentalHealthResources } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExternalLink, Heart, Calendar, Building2 } from 'lucide-react';

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

export default function ResourcesPage() {
  const [resources, setResources] = useState<MentalHealthResources[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const result = await BaseCrudService.getAll<MentalHealthResources>('mentalhealthresources');
      setResources(result.items);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const topics = ['all', ...Array.from(new Set(resources.map(r => r.topic).filter(Boolean)))];
  const filteredResources = selectedTopic === 'all' 
    ? resources 
    : resources.filter(r => r.topic === selectedTopic);

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary/20 rounded-full mb-6">
                <span className="text-sm text-primary font-paragraph">Free Support Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Mental Health & Wellness Resources
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Free support services connecting families to mental health resources, counseling referrals, and wellness workshops. Because learning requires a healthy mind and heart.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-foreground/5">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    Holistic Support for Whole-Person Growth
                  </h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    We believe that academic success and emotional well-being are inseparable. That&apos;s why we provide free access to mental health resources alongside our educational programs.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    All resources listed below are carefully curated to support the mental health and wellness needs of students, families, and community members. These services are provided at no cost to ensure everyone has access to the support they need.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Filter Section */}
      {topics.length > 1 && (
        <section className="py-8 bg-background border-b border-foreground/10">
          <div className="container mx-auto px-4">
            <AnimatedElement>
              <div className="flex flex-wrap gap-3 justify-center">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-6 py-2 rounded-full font-paragraph text-sm transition-all duration-200 hover:scale-[1.02] ${
                      selectedTopic === topic
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-foreground border border-foreground/10 hover:border-primary'
                    }`}
                  >
                    {topic === 'all' ? 'All Topics' : topic}
                  </button>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : filteredResources.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource, index) => (
                  <AnimatedElement key={resource._id} delay={index * 50}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        {resource.topic && (
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                            {resource.topic}
                          </span>
                        )}
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="text-primary" size={20} />
                        </div>
                      </div>

                      <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                        {resource.resourceTitle}
                      </h3>

                      <p className="text-foreground/70 leading-relaxed mb-4 flex-1">
                        {resource.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {resource.provider && (
                          <div className="flex items-center text-sm text-foreground/60">
                            <Building2 size={16} className="mr-2 text-primary" />
                            <span>{resource.provider}</span>
                          </div>
                        )}
                        {resource.datePublished && (
                          <div className="flex items-center text-sm text-foreground/60">
                            <Calendar size={16} className="mr-2 text-primary" />
                            <span>{formatDate(resource.datePublished)}</span>
                          </div>
                        )}
                      </div>

                      {resource.resourceLink && (
                        <Button
                          asChild
                          className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-200"
                        >
                          <a
                            href={resource.resourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            Access Resource
                            <ExternalLink size={16} className="ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 text-lg">No resources found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-primary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Need Additional Support?
              </h2>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                If you or someone you know is in crisis or needs immediate support, please reach out. We&apos;re here to help connect you with the resources you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
                >
                  <a href="/contact">Contact Us</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-white transition-all duration-200"
                >
                  <a href="tel:988">Crisis Hotline: 988</a>
                </Button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90 text-white">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Explore Our Educational Programs
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Combine mental wellness support with our comprehensive educational offerings for holistic growth.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
              >
                <a href="/programs">View Programs</a>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
