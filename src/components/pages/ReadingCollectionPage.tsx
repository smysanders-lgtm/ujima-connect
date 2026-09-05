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
    title: 'The Art of Fiction',
    author: 'John Gardner',
    link: 'https://www.amazon.com/Art-Fiction-John-Gardner/dp/0394726286',
    coverImage: 'https://static.wixstatic.com/media/0538ae_eb17c6295754404ab97f0966094011ad~mv2.png?originWidth=256&originHeight=384',
    description: 'A comprehensive guide to the craft of fiction writing, exploring techniques and principles that help writers create compelling narratives.'
  },
  {
    title: 'Bird by Bird',
    author: 'Anne Lamott',
    link: 'https://www.amazon.com/Bird-Some-Instructions-Writing-Life/dp/0385480016',
    coverImage: 'https://static.wixstatic.com/media/0538ae_f7326ea0e095466da36ce84d72cb854c~mv2.png?originWidth=256&originHeight=384',
    description: 'A beloved classic on writing and life, offering practical advice and inspiration for overcoming creative blocks and self-doubt.'
  },
  {
    title: 'The Elements of Style',
    author: 'Strunk & White',
    link: 'https://www.amazon.com/Elements-Style-William-Strunk-Jr/dp/0205632645',
    coverImage: 'https://static.wixstatic.com/media/0538ae_4fa28ded34cf45bca8e169963e09e3e4~mv2.png?originWidth=256&originHeight=384',
    description: 'The essential guide to clear and effective writing, covering grammar, style, and the principles of good composition.'
  },
  {
    title: 'Save the Cat! Writes a Novel',
    author: 'Jessica Brody',
    link: 'https://www.amazon.com/Save-Cat-Writes-Novel-Structure/dp/0399578463',
    coverImage: 'https://static.wixstatic.com/media/0538ae_c0e188c439254e6b8a21c4a6f6d46877~mv2.png?originWidth=256&originHeight=384',
    description: 'A practical guide to novel structure using the Save the Cat framework, helping writers craft stories that resonate with readers.'
  },
  {
    title: 'Steal Like an Artist',
    author: 'Austin Kleon',
    link: 'https://www.amazon.com/Steal-Like-Artist-Austin-Kleon/dp/0761169253',
    coverImage: 'https://static.wixstatic.com/media/0538ae_794e57e14ff74d1dbcece95eb1a27f51~mv2.png?originWidth=256&originHeight=384',
    description: 'An inspiring exploration of creativity and artistic influence, showing how to develop your unique voice by learning from others.'
  },
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    link: 'https://www.amazon.com/Midnight-Library-Matt-Haig/dp/0525559477',
    coverImage: 'https://static.wixstatic.com/media/0538ae_cd9a59875b2a4a29abae07591a9e9b9d~mv2.png?originWidth=256&originHeight=384',
    description: 'A thought-provoking novel about second chances and the infinite possibilities of life, perfect for reflection and personal growth.'
  }
];

export default function ReadingCollectionPage() {
  const navigate = useNavigate();

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOOKS.map((book, index) => (
              <AnimatedElement key={`book-${index}`} delay={index * 50}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-foreground/5 h-full flex flex-col overflow-hidden">
                  {/* Book Cover Image */}
                  <div className="relative w-full h-64 bg-foreground/5 overflow-hidden">
                    <Image
                      src={book.coverImage}
                      alt={`${book.title} cover`}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover"
                    />
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
                    <Button
                      asChild
                      className="w-full bg-foreground text-white hover:bg-foreground/90 transition-all duration-200"
                    >
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        View on Amazon
                        <ExternalLink size={16} className="ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
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
