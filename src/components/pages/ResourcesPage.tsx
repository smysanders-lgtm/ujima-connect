import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { MentalHealthResources } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { ExternalLink, Building2, Phone, AlertCircle, BookOpen, Search, X, ChevronDown } from 'lucide-react';

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

// Real book data with actual titles and authors
const BOOKS = [
  {
    title: 'The Art of Fiction',
    author: 'John Gardner',
    link: 'https://www.amazon.com/Art-Fiction-John-Gardner/dp/0394726286',
    coverImage: 'https://static.wixstatic.com/media/0538ae_eb17c6295754404ab97f0966094011ad~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'Bird by Bird',
    author: 'Anne Lamott',
    link: 'https://www.amazon.com/Bird-Some-Instructions-Writing-Life/dp/0385480016',
    coverImage: 'https://static.wixstatic.com/media/0538ae_f7326ea0e095466da36ce84d72cb854c~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'The Elements of Style',
    author: 'Strunk & White',
    link: 'https://www.amazon.com/Elements-Style-William-Strunk-Jr/dp/0205632645',
    coverImage: 'https://static.wixstatic.com/media/0538ae_4fa28ded34cf45bca8e169963e09e3e4~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'Save the Cat! Writes a Novel',
    author: 'Jessica Brody',
    link: 'https://www.amazon.com/Save-Cat-Writes-Novel-Structure/dp/0399578463',
    coverImage: 'https://static.wixstatic.com/media/0538ae_c0e188c439254e6b8a21c4a6f6d46877~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'Steal Like an Artist',
    author: 'Austin Kleon',
    link: 'https://www.amazon.com/Steal-Like-Artist-Austin-Kleon/dp/0761169253',
    coverImage: 'https://static.wixstatic.com/media/0538ae_794e57e14ff74d1dbcece95eb1a27f51~mv2.png?originWidth=256&originHeight=384'
  },
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    link: 'https://www.amazon.com/Midnight-Library-Matt-Haig/dp/0525559477',
    coverImage: 'https://static.wixstatic.com/media/0538ae_cd9a59875b2a4a29abae07591a9e9b9d~mv2.png?originWidth=256&originHeight=384'
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
  const navigate = useNavigate();
  const [resources, setResources] = useState<MentalHealthResources[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string>('Learning & Growth');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);

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
  
  let filteredResources = selectedTopic === 'all'
    ? resources.filter(r => currentGroupTopics.includes(r.topic || ''))
    : resources.filter(r => r.topic === selectedTopic);
  
  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredResources = filteredResources.filter(r =>
      r.resourceTitle?.toLowerCase().includes(query) ||
      r.description?.toLowerCase().includes(query) ||
      r.provider?.toLowerCase().includes(query) ||
      r.contactDetails?.toLowerCase().includes(query)
    );
  }
  
  const showBooks = selectedGroup === 'Learning & Growth';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary to-white pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 overflow-hidden px-6 md:px-12">
        <div className="container mx-auto max-w-[100rem] relative z-10">
          <AnimatedElement>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-foreground mb-6 leading-tight drop-shadow-sm">
                  Resources for the Whole Person
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl font-paragraph">
                  Education is one part of the picture. Here you'll also find support for housing, food, health, and career — because growth is easier when your basic needs are met.
                </p>
              </div>
              <div className="hidden lg:flex justify-center items-center relative">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
                <div className="relative w-80 h-80 bg-foreground/10 rounded-full flex items-center justify-center shadow-2xl border-4 border-foreground/10">
                  <BookOpen size={120} className="text-foreground/30" />
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply opacity-30 blur-3xl animate-float"></div>
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply opacity-30 blur-3xl animate-float animation-delay-2000"></div>
      </section>
      {/* Search and Filter Section */}
      <section className="py-12 bg-background border-b border-foreground/10">
        <div className="container mx-auto px-4 max-w-[100rem]">
          <AnimatedElement>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" size={20} />
                <input
                  type="text"
                  placeholder="Search resources by name, provider, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/30 font-paragraph text-foreground placeholder-foreground/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Group Tabs */}
            <div className="mb-6">
              <span className="text-xs font-paragraph text-foreground/60 font-semibold uppercase tracking-wide block mb-4">Browse by Category</span>
              <div className="flex flex-wrap gap-3">
                {Object.keys(CATEGORY_GROUPS).map((group) => (
                  <button
                    key={group}
                    onClick={() => {
                      setSelectedGroup(group);
                      setSelectedTopic('all');
                      setSearchQuery('');
                    }}
                    className={`px-5 py-2.5 rounded-full font-paragraph text-sm font-medium transition-all duration-200 ${
                      selectedGroup === group
                        ? 'bg-foreground text-white shadow-md'
                        : 'bg-white text-foreground border border-foreground/20 hover:border-foreground/40 hover:shadow-sm'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Filter Dropdown */}
            {topics.length > 1 && (
              <div>
                <span className="text-xs font-paragraph text-foreground/60 font-semibold uppercase tracking-wide block mb-4">Filter by Topic</span>
                <div className="relative w-full sm:w-64">
                  <button
                    onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                    className="w-full px-4 py-2.5 rounded-lg font-paragraph text-sm font-medium transition-all duration-200 bg-white text-foreground border border-foreground/20 hover:border-foreground/40 flex items-center justify-between"
                  >
                    <span>{selectedTopic === 'all' ? 'All Topics' : selectedTopic}</span>
                    <ChevronDown size={18} className={`transition-transform duration-200 ${isTopicDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isTopicDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-foreground/20 rounded-lg shadow-lg z-10">
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => {
                            setSelectedTopic(topic);
                            setIsTopicDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 font-paragraph text-sm transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                            selectedTopic === topic
                              ? 'bg-foreground text-white'
                              : 'text-foreground hover:bg-foreground/5'
                          }`}
                        >
                          {topic === 'all' ? 'All Topics' : topic}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </AnimatedElement>
        </div>
      </section>
      {/* Resources Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-[100rem]">
          {/* Featured Books Section - Button to Reading Collection Page */}
          {showBooks && (
            <div className="mb-12">
              <AnimatedElement>
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl p-6 md:p-8 border border-emerald-200 overflow-hidden">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                        📚 Featured Reading Collection
                      </h2>
                      <p className="text-base text-foreground/70 mb-4">
                        Explore our curated collection of books to support your learning and growth journey.
                      </p>
                      <Button
                        onClick={() => navigate('/reading-collection')}
                        size="sm"
                        className="bg-foreground text-white hover:bg-foreground/90 transition-all duration-200"
                      >
                        View Collection
                      </Button>
                    </div>
                    <div className="w-full md:w-48 h-32 md:h-40 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src="https://static.wixstatic.com/media/0538ae_6404cecb22604f6cbec48ae1dbcb157b~mv2.png?originWidth=768&originHeight=576"
                        alt="Community food drive with volunteers organizing and distributing groceries"
                        width={200}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          )}

          {/* Main Resources Grid */}
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : filteredResources.length > 0 ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm font-paragraph text-foreground/60">
                    Showing <span className="font-bold text-foreground">{filteredResources.length}</span> resource{filteredResources.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource, index) => {
                    const groupKey = Object.entries(CATEGORY_GROUPS).find(([_, topics]) =>
                      topics.includes(resource.topic || '')
                    )?.[0] || 'Learning & Growth';
                    const colorClass = CATEGORY_COLORS[groupKey as keyof typeof CATEGORY_COLORS] || 'bg-primary/10 text-primary';

                    return (
                      <AnimatedElement key={resource._id} delay={index * 50}>
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-foreground/10 h-full flex flex-col group">
                          {/* Header with Topic Badge */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            {resource.topic && (
                              <span className={`px-3 py-1 ${colorClass} text-xs rounded-full font-bold flex-shrink-0`}>
                                {resource.topic}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-heading font-bold text-foreground mb-2 line-clamp-2 group-hover:text-foreground/90 transition-colors">
                            {resource.resourceTitle}
                          </h3>

                          {/* Description */}
                          <p className="text-foreground/70 leading-relaxed mb-4 flex-1 text-sm line-clamp-2">
                            {resource.description}
                          </p>

                          {/* Contact Details */}
                          <div className="space-y-2 mb-4 text-xs">
                            {resource.contactDetails && (
                              <div className="flex items-start gap-2 text-foreground/60">
                                <Phone size={14} className="text-primary flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{resource.contactDetails}</span>
                              </div>
                            )}
                            {resource.provider && (
                              <div className="flex items-start gap-2 text-foreground/60">
                                <Building2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{resource.provider}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Button */}
                          {resource.resourceLink && (
                            <Button
                              asChild
                              className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-200 text-sm h-9"
                            >
                              <a
                                href={resource.resourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center"
                              >
                                Visit Resource
                                <ExternalLink size={14} className="ml-2" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </AnimatedElement>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <AlertCircle size={48} className="mx-auto text-foreground/30 mb-4" />
                <p className="text-foreground/60 text-lg font-paragraph mb-2">No resources found</p>
                <p className="text-foreground/40 text-sm">
                  {searchQuery ? 'Try adjusting your search terms' : 'Try selecting a different category or topic'}
                </p>
              </div>
            )}
          </div>
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
