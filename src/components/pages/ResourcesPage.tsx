import { useEffect, useRef, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { MentalHealthResources } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ExternalLink, Building2, Phone, AlertCircle, BookOpen } from 'lucide-react';

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

const CATEGORY_GROUPS = {
  'Learning & Growth': ['Writing', 'College', 'Technology', 'Community', 'Reading'],
  'Basic Needs & Wellness': ['Housing', 'Food', 'Health', 'Career']
};

const CATEGORY_COLORS = {
  'Learning & Growth': 'bg-emerald-100 text-emerald-700',
  'Basic Needs & Wellness': 'bg-amber-100 text-amber-700'
};

const BOOKS = [
  {
    title: 'Book 1',
    link: 'https://a.co/d/0iRqrRap',
    coverImage: 'https://static.wixstatic.com/media/0538ae_be2d3ad1e0aa41bc82579b5d6ee82554~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'Book 2',
    link: 'https://a.co/d/0hDdtofR',
    coverImage: 'https://static.wixstatic.com/media/0538ae_b2ed0d781e1a4565859cb425b85cd6ec~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'Book 3',
    link: 'https://a.co/d/0feAGlox',
    coverImage: 'https://static.wixstatic.com/media/0538ae_dc0b1dc629fa47b195e21db017aa7988~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'Book 4',
    link: 'https://a.co/d/0aGUrl2J',
    coverImage: 'https://static.wixstatic.com/media/0538ae_0a2b128da0ef407dbb39c64179910a55~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'Book 5',
    link: 'https://a.co/d/06kmRJCz',
    coverImage: 'https://static.wixstatic.com/media/0538ae_3ee0bd04b18b4640bf045efad1db0226~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'Book 6',
    link: 'https://a.co/d/0j8hmDF7',
    coverImage: 'https://static.wixstatic.com/media/0538ae_c9456cd53c1848be941abdd966737ac5~mv2.png?originWidth=256&originHeight=384'
  }
];

const CRISIS_RESOURCES = [
  {
    title: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential support 24/7',
    contact: 'Call or text 988',
    link: 'https://988lifeline.org'
  },
  {
    title: '211 - Community Resources',
    description: 'Housing, food, health services & more',
    contact: 'Dial 211 or visit 211.org',
    link: 'https://www.211.org'
  },
  {
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741',
    contact: 'Text 741741',
    link: 'https://www.crisistextline.org'
  }
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<MentalHealthResources[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string>('Learning & Growth');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');

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

  const currentGroupTopics = CATEGORY_GROUPS[selectedGroup as keyof typeof CATEGORY_GROUPS] || [];
  const topics = ['all', ...currentGroupTopics];
  const filteredResources = selectedTopic === 'all'
    ? resources.filter(r => currentGroupTopics.includes(r.topic || ''))
    : resources.filter(r => r.topic === selectedTopic);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-secondary py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <AnimatedElement>
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 bg-primary text-white rounded-full mb-6 text-xs font-bold tracking-wide">
                RESOURCES
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6">
                Resources for the Whole Person
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
                Education is one part of the picture. Here you'll also find support for housing, food, health, and career — because growth is easier when your basic needs are met.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Category Group Tabs */}
      <section className="py-8 bg-background border-b border-foreground/10">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <AnimatedElement>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <span className="text-sm font-paragraph text-foreground/60 font-semibold">BROWSE BY:</span>
              <div className="flex gap-3">
                {Object.keys(CATEGORY_GROUPS).map((group) => (
                  <button
                    key={group}
                    onClick={() => {
                      setSelectedGroup(group);
                      setSelectedTopic('all');
                    }}
                    className={`px-4 py-2 rounded-full font-paragraph text-sm transition-all duration-200 ${
                      selectedGroup === group
                        ? 'bg-foreground text-white'
                        : 'bg-white text-foreground border border-foreground/20 hover:border-foreground/40'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Category Filter Pills */}
      {topics.length > 1 && (
        <section className="py-8 bg-background border-b border-foreground/10">
          <div className="container mx-auto px-4 max-w-[100rem]">
            <AnimatedElement>
              <div className="flex flex-wrap gap-3">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-4 py-2 rounded-full font-paragraph text-sm transition-all duration-200 ${
                      selectedTopic === topic
                        ? 'bg-foreground text-white'
                        : 'bg-white text-foreground border border-foreground/20 hover:border-foreground/40'
                    }`}
                  >
                    {topic === 'all' ? 'All' : topic}
                  </button>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : filteredResources.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource, index) => {
                  const groupKey = Object.entries(CATEGORY_GROUPS).find(([_, topics]) =>
                    topics.includes(resource.topic || '')
                  )?.[0] || 'Learning & Growth';
                  const colorClass = CATEGORY_COLORS[groupKey as keyof typeof CATEGORY_COLORS] || 'bg-primary/10 text-primary';

                  return (
                    <AnimatedElement key={resource._id} delay={index * 50}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-foreground/5 h-full flex flex-col">
                        {resource.topic && (
                          <span className={`px-3 py-1 ${colorClass} text-xs rounded-full font-bold mb-4 inline-block w-fit`}>
                            {resource.topic}
                          </span>
                        )}

                        <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                          {resource.resourceTitle}
                        </h3>

                        <p className="text-foreground/70 leading-relaxed mb-4 flex-1">
                          {resource.description}
                        </p>

                        <div className="space-y-2 mb-6">
                          {resource.contactDetails && (
                            <div className="flex items-start gap-2 text-sm text-foreground/60">
                              <Phone size={16} className="text-primary flex-shrink-0 mt-0.5" />
                              <span>{resource.contactDetails}</span>
                            </div>
                          )}
                          {resource.provider && (
                            <div className="flex items-start gap-2 text-sm text-foreground/60">
                              <Building2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                              <span>{resource.provider}</span>
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
                              Visit Resource
                              <ExternalLink size={16} className="ml-2" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </AnimatedElement>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/60 text-lg">No resources found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Books We've Read or Are Reading Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <AnimatedElement>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={32} className="text-foreground" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  Books We've Read or Are Reading
                </h2>
              </div>
              <p className="text-lg text-foreground/70 max-w-2xl">
                Explore books that have inspired and informed our community's journey toward growth and wellness.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BOOKS.map((book, index) => (
                <AnimatedElement key={index} delay={index * 50}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-foreground/5 h-full flex flex-col overflow-hidden">
                    {/* Book Cover Image */}
                    <div className="relative w-full h-48 bg-foreground/5 overflow-hidden">
                      <Image
                        src={book.coverImage}
                        alt={`${book.title} cover`}
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Reading Tag and Content Container */}
                    <div className="px-6 pt-4 pb-6 flex flex-col flex-1">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-bold inline-block w-fit mb-4">
                        Reading
                      </span>

                      {/* Book Title and Button */}
                      <h3 className="text-lg font-heading font-bold text-foreground mb-4 flex-1">
                        {book.title}
                      </h3>
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
          </AnimatedElement>
        </div>
      </section>

      {/* Suggest a Resource Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <AnimatedElement>
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Know a Resource We Should Add?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Help us grow this community-maintained resource list. Share a resource that's made a difference in your life or your community.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 transition-all duration-200"
              >
                <a href="/contact?subject=suggest-resource">Suggest a Resource</a>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 md:py-20 bg-foreground text-white">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <AnimatedElement>
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Get Notified When New Resources Are Added
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Stay updated with the latest resources, programs, and support services in your community.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterEmail('');
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Crisis/Urgent Support Callout */}
      <section className="bg-foreground text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <AnimatedElement>
            <div className="max-w-4xl">
              <div className="flex items-start gap-4 mb-8">
                <AlertCircle size={32} className="flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                    Need Help Right Now?
                  </h2>
                  <p className="text-white/90 text-lg">
                    If you or someone you know is facing an emergency, these resources are available 24/7.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {CRISIS_RESOURCES.map((resource, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                    <h3 className="font-heading font-bold text-lg mb-2">{resource.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{resource.description}</p>
                    <Button
                      asChild
                      className="w-full bg-primary text-white hover:bg-primary/90"
                    >
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        {resource.contact}
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
