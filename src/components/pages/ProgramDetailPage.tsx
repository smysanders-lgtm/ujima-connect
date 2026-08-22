import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { EducationalPrograms } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle, CheckCircle, BookOpen, GraduationCap, Laptop, Settings, Bell, Mail } from 'lucide-react';

export default function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<EducationalPrograms | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadProgramData();
  }, [id]);

  const loadProgramData = async () => {
    try {
      if (!id) return;
      
      // Load program details
      const programData = await BaseCrudService.getById<EducationalPrograms>('educationalprograms', id);
      setProgram(programData);
    } catch (error) {
      console.error('Error loading program data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !program) return;

    setIsSubmitting(true);
    try {
      // Create a contact inquiry for schedule notifications
      await BaseCrudService.create('contactinquiries', {
        _id: crypto.randomUUID(),
        senderName: 'Schedule Notification',
        emailAddress: email,
        subject: `Schedule Notification Request - ${program.programName}`,
        inquiryMessage: `User wants to be notified when schedules are available for: ${program.programName}`,
        submissionDate: new Date().toISOString(),
      });

      setSubmitMessage({ type: 'success', text: 'Thank you! We\'ll notify you when schedules are available.' });
      setEmail('');
      setTimeout(() => setSubmitMessage(null), 5000);
    } catch (error) {
      console.error('Error submitting notification signup:', error);
      setSubmitMessage({ type: 'error', text: 'Failed to sign up. Please try again.' });
      setTimeout(() => setSubmitMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-40">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Program Not Found</h1>
              <p className="text-foreground/60 mb-8">The program you're looking for doesn't exist.</p>
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <a href="/programs">Back to Programs</a>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,168,76,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <a href="/programs">← Back to Programs</a>
            </Button>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {program.programImage ? (
                <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={program.programImage}
                    alt={program.programName || 'Program'}
                    width={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full md:w-48 h-48 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/30 flex items-center justify-center flex-shrink-0">
                  {getIconForProgram(program.programName)}
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
                  {program.programName}
                </h1>
                <p className="text-lg text-white/80 mb-4">
                  {program.tagline || program.shortDescription}
                </p>
                <div className="flex flex-wrap gap-3">
                  {program.format && (
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-paragraph">
                      {program.format}
                    </span>
                  )}
                  {program.platform && (
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-paragraph">
                      {program.platform}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">About This Program</h2>
                <p className="text-foreground/70 leading-relaxed">
                  {program.detailedDescription || program.shortDescription}
                </p>
              </div>

              {/* What's Included */}
              {program.whatsIncluded && (
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">What's Included</h2>
                  <ul className="space-y-3">
                    {parseWhatsIncluded(program.whatsIncluded).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Schedule Notification Section */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Schedule Coming Soon</h2>
                
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-2 border-primary/20 rounded-lg p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <Bell size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        Be the First to Know
                      </h3>
                      <p className="text-foreground/70">
                        Schedules for this program are coming soon! Sign up below to receive an email notification as soon as new sessions become available.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleNotificationSignup} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 px-4 py-3 rounded-lg border border-foreground/20 focus:border-primary focus:outline-none"
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="bg-primary text-white hover:bg-primary/90 disabled:bg-gray-400 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                      >
                        {isSubmitting ? 'Signing up...' : 'Notify Me'}
                      </Button>
                    </div>

                    {submitMessage && (
                      <div className={`p-4 rounded-lg flex items-start gap-3 ${
                        submitMessage.type === 'success'
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        {submitMessage.type === 'success' ? (
                          <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <p className={submitMessage.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                          {submitMessage.text}
                        </p>
                      </div>
                    )}
                  </form>

                  <p className="text-sm text-foreground/50 mt-4 flex items-center gap-2">
                    <Mail size={16} />
                    We'll send you an email when new schedules are available
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/5 rounded-lg p-6 border border-foreground/10 sticky top-24 space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wide mb-4">
                    Program Details
                  </h3>
                </div>

                {program.targetAudience && (
                  <div>
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">Who It's For</p>
                    <p className="text-sm text-foreground font-paragraph">{program.targetAudience}</p>
                  </div>
                )}

                {program.format && (
                  <div>
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">Format</p>
                    <p className="text-sm text-foreground font-paragraph">{program.format}</p>
                  </div>
                )}

                {program.schedule && (
                  <div>
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">Schedule</p>
                    <p className="text-sm text-foreground font-paragraph">{program.schedule}</p>
                  </div>
                )}

                {program.cost && (
                  <div>
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">Cost</p>
                    <p className="text-sm text-foreground font-paragraph">{program.cost}</p>
                  </div>
                )}

                {program.platform && (
                  <div>
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">Platform</p>
                    <p className="text-sm text-foreground font-paragraph">{program.platform}</p>
                  </div>
                )}

                <Button
                  asChild
                  className="w-full bg-primary text-white hover:bg-primary/90 mt-6"
                >
                  <a href="/contact">Get More Information</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-foreground to-foreground/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Contact us today to learn more about this program or to enroll in an upcoming session.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
            >
              <a href="/contact">Enroll Now</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
