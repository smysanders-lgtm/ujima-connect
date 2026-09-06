import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ExternalLink, ArrowLeft } from 'lucide-react';

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

// Real book data with actual titles and authors
const BOOKS = [
  {
    title: 'Afro-Futuristic Adventures with Granville T. Woods',
    author: 'Letta S. Baker Mason',
    amazonLink: 'https://www.amazon.com/s?k=Afro-Futuristic+Adventures+Granville+Woods',
    coverImage: 'https://static.wixstatic.com/media/0538ae_86ff6d8b541d4a2581c18f580b02d408~mv2.png?originWidth=448&originHeight=576',
    description: 'An inspiring exploration of innovation and African American history through the lens of inventor Granville T. Woods and futuristic storytelling.'
  },
  {
    title: 'Sankofa, Sankofa',
    author: 'Letta S. Baker Mason',
    amazonLink: 'https://www.amazon.com/s?k=Sankofa+Sankofa+Letta+Baker+Mason',
    coverImage: 'https://static.wixstatic.com/media/0538ae_d4025d06b8a24c04b72ab73bce1fb2ac~mv2.png?originWidth=448&originHeight=576',
    description: 'A powerful narrative exploring cultural heritage and the importance of looking back to move forward with purpose and wisdom.'
  },
  {
    title: 'I Know Why the Caged Bird Sings',
    author: 'Maya Angelou',
    amazonLink: 'https://www.amazon.com/Know-Why-Caged-Bird-Sings/dp/0345514408',
    coverImage: 'https://static.wixstatic.com/media/0538ae_f8fcdae6e29048d9adb73648a3267786~mv2.png?originWidth=448&originHeight=576',
    description: 'A transformative autobiography about resilience, self-discovery, and the power of finding your voice after trauma and silence.'
  },
  {
    title: 'Letter from Birmingham Jail',
    author: 'Martin Luther King Jr.',
    amazonLink: 'https://www.amazon.com/Letter-Birmingham-Jail-Martin-Luther/dp/0143039616',
    coverImage: 'https://static.wixstatic.com/media/0538ae_5998e4f2bcf2435a89a0d51a41101f3a~mv2.png?originWidth=448&originHeight=576',
    description: 'A seminal work of civil rights literature that articulates the moral imperative for justice and nonviolent resistance.'
  },
  {
    title: 'Selected Poems',
    author: 'Gwendolyn Brooks',
    amazonLink: 'https://www.amazon.com/Selected-Poems-Gwendolyn-Brooks/dp/0060085843',
    coverImage: 'https://static.wixstatic.com/media/0538ae_56cc39e5b3954ac8b25bfcce5ede5efe~mv2.png?originWidth=448&originHeight=576',
    description: 'A collection of powerful poetry that captures the African American experience with lyrical beauty and social consciousness.'
  },
  {
    title: 'Who Was Cesar Chavez?',
    author: 'Dana Meachen Rau & Who HQ (Illustrator: Ted Hammond)',
    amazonLink: 'https://www.amazon.com/Who-Was-Cesar-Chavez-Meachen/dp/0448479656',
    coverImage: 'https://static.wixstatic.com/media/0538ae_8e809154f09a41beaef657efe0115cdf~mv2.png?originWidth=448&originHeight=576',
    description: 'An accessible biography of the legendary labor leader and civil rights activist who fought for farmworkers\' rights and dignity.'
  }
];

interface Book {
  title?: string;
  author?: string;
  amazonLink?: string;
  coverImage?: string;
  description?: string;
}

export default function ReadingCollectionPage() {
  const navigate = useNavigate();
  const books = BOOKS;

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
          {books.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <AnimatedElement key={index} delay={index * 50}>
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
              <p className="text-foreground/60">No books available yet.</p>
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
