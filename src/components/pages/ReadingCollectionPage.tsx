import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ReadingCollectionBooks } from '@/entities';

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

export default function ReadingCollectionPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<ReadingCollectionBooks[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const result = await BaseCrudService.getAll<ReadingCollectionBooks>('readingcollectionbooks');
        setBooks(result.items || []);
      } catch (error) {
        console.error('Error loading books:', error);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-secondary py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <AnimatedElement>
            <button
              onClick={() => navigate('/resources')}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8 font-paragraph text-sm font-medium"
            >
              <ArrowLeft size={18} />
              Back to Resources
            </button>
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 bg-primary text-white rounded-full mb-6 text-xs font-bold tracking-wide">
                READING COLLECTION
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6">
                📚 Featured Reading Collection
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
                Curated books to support your learning and growth journey. Explore our handpicked collection of resources that inspire, educate, and transform.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-[100rem]">
          {!isLoading && books.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <AnimatedElement key={book._id} delay={index * 50}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-foreground/5 h-full flex flex-col overflow-hidden">
                    {/* Book Cover Image */}
                    <div className="relative w-full h-64 bg-foreground/5 overflow-hidden">
                      {book.coverImage && (
                        <Image
                          src={book.coverImage}
                          alt={`${book.title} cover`}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    {/* Content Container */}
                    <div className="px-6 pt-6 pb-6 flex flex-col flex-1">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-bold inline-block w-fit mb-4">
                        Reading
                      </span>

                      {/* Book Title and Author */}
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2 flex-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-foreground/60 mb-4">
                        by {book.author}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-foreground/70 leading-relaxed mb-6 flex-1">
                        {book.description}
                      </p>

                      {/* Action Button */}
                      {book.amazonLink && (
                        <Button
                          asChild
                          className="w-full bg-foreground text-white hover:bg-foreground/90 transition-all duration-200"
                        >
                          <a
                            href={book.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            View on Amazon
                            <ExternalLink size={16} className="ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-foreground/60">{isLoading ? 'Loading books...' : 'No books available yet.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <AnimatedElement>
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Want to Suggest a Book?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                If you've found a book that's made a difference in your learning journey, we'd love to hear about it. Share your recommendation with our community.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 transition-all duration-200"
              >
                <a href="/contact?subject=suggest-book">Suggest a Book</a>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
