import { useEffect, useRef, useState } from 'react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Users, Target, Award, Sparkles, Lightbulb, Zap } from 'lucide-react';

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,168,76,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedElement>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Our Story
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Built for community, by community. Discover the principles and passion that drive our mission.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedElement>
              <div>
                <span className="text-sm text-primary font-paragraph uppercase tracking-wider">Our Mission</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
                  Empowering Through Creativity & Education
                </h2>
                <div className="space-y-6 text-foreground/70 leading-relaxed">
                  <p>
                    Ujima Creative is rooted in the belief that creativity, education, and technology can empower individuals and strengthen communities. We create opportunities for people to learn, develop their skills, express their ideas, and confidently navigate an evolving digital world.
                  </p>
                  <p>
                    Our name, <span className="font-medium italic text-foreground">Ujima</span>, reflects the principle of collective work and responsibility—the idea that we have a shared responsibility to build, support, and improve the communities around us.
                  </p>
                  <p>
                    Our work is also guided by <span className="font-medium italic text-foreground">Gye Nyame</span>, an Akan Adinkra symbol representing the supremacy and greatness of God. For Ujima Creative, Gye Nyame serves as a reminder that our gifts, knowledge, and creativity are connected to something greater than ourselves. We strive to use what we create not simply for individual achievement, but to educate, empower, and contribute to meaningful change.
                  </p>
                  <p>
                    Through creative writing, tutoring, college and essay preparation, AI and digital skills, Microsoft Copilot training, and community-centered initiatives, Ujima Creative brings people together to create, learn, and contribute.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format"
                  alt="Community learning together"
                  width={600}
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Ujima & Gye Nyame Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedElement>
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-foreground/5">
                <div className="mb-8">
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                    <span className="text-sm text-primary font-paragraph font-medium">The Third Principle of Kwanzaa</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                    What is <span className="italic text-primary">Ujima</span>?
                  </h2>
                </div>
                
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  <span className="font-medium italic text-foreground">Ujima</span> is a Swahili word meaning{' '}
                  <span className="font-bold text-primary">&quot;collective work and responsibility.&quot;</span>{' '}
                  It is the third principle of Kwanzaa, emphasizing the importance of building and maintaining our community together.
                </p>
                
                <p className="text-foreground/70 leading-relaxed">
                  This principle is the foundation of everything we do. We believe that education is not just an individual pursuit, but a collective responsibility. When one member of our community succeeds, we all succeed. When one struggles, we all work together to lift them up.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-foreground/5">
                <div className="mb-8">
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                    <span className="text-sm text-primary font-paragraph font-medium">Akan Adinkra Symbol</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                    What is <span className="italic text-primary">Gye Nyame</span>?
                  </h2>
                </div>
                
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  <span className="font-medium italic text-foreground">Gye Nyame</span> is an Akan Adinkra symbol representing{' '}
                  <span className="font-bold text-primary">the supremacy and greatness of God.</span>
                </p>
                
                <p className="text-foreground/70 leading-relaxed">
                  For Ujima Creative, Gye Nyame serves as a reminder that our gifts, knowledge, and creativity are connected to something greater than ourselves. We strive to use what we create not simply for individual achievement, but to educate, empower, and contribute to meaningful change in the world.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Guiding Principles Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <span className="text-sm text-primary font-paragraph uppercase tracking-wider">Our Foundation</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
                Our Guiding Principles
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <AnimatedElement delay={0}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Ujima
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">Collective Responsibility</p>
                <p className="text-foreground/70 leading-relaxed">
                  We believe growth happens when we work together, share knowledge, and invest in one another.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Gye Nyame
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">Purpose Beyond Self</p>
                <p className="text-foreground/70 leading-relaxed">
                  We honor the greatness of God and recognize that our talents and creativity can serve a purpose greater than ourselves.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Creativity
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">Expression & Innovation</p>
                <p className="text-foreground/70 leading-relaxed">
                  We encourage people to think differently, tell their stories, solve problems, and turn ideas into meaningful work.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Empowerment
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">Knowledge Creates Opportunity</p>
                <p className="text-foreground/70 leading-relaxed">
                  We equip individuals with practical knowledge and skills that help them grow academically, creatively, and professionally.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Community
                </h3>
                <p className="text-sm font-semibold text-primary mb-4">Impact Through Connection</p>
                <p className="text-foreground/70 leading-relaxed">
                  We believe meaningful change begins when people have access to resources, encouragement, and opportunities to thrive.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <span className="text-sm text-primary font-paragraph uppercase tracking-wider">Our Values</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
                What Drives Us
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedElement delay={0}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Compassion
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  We care deeply about every student and family we serve, treating each person with dignity and respect.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Community
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  We build programs with community input, ensuring our services truly meet the needs of those we serve.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Excellence
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  We maintain the highest standards in our instruction while remaining accessible to all families.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Equity
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  No family is ever turned away due to financial need. Quality education is a right, not a privilege.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedElement>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
                <Image
                  src="https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=800&h=1000&fit=crop&auto=format"
                  alt="Educator working with students"
                  width={600}
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div>
                <span className="text-sm text-primary font-paragraph uppercase tracking-wider">Our Approach</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-6">
                  Holistic, Accessible, Effective
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      Virtual-First Design
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Our programs are built from the ground up for virtual delivery, ensuring seamless access from anywhere with an internet connection.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      Flexible Scheduling
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      We work around the schedules of working families, offering sessions at times that fit your life.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      Whole-Person Support
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Academic excellence and emotional well-being are inseparable. We provide mental health resources alongside educational support.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90 text-white">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Join Our Community
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Become part of a movement dedicated to empowering learners and strengthening communities through education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/programs"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] font-paragraph"
                >
                  Explore Programs
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-foreground rounded-lg hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] font-paragraph"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
