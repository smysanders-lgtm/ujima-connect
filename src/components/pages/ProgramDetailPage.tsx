import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { EducationalPrograms } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, Users, AlertCircle, CheckCircle, XCircle, BookOpen, GraduationCap, Laptop, Settings } from 'lucide-react';

interface ProgramSchedule {
  _id: string;
  scheduleName?: string;
  startDate?: string;
  startTime?: string;
  totalSpots?: number;
  availableSpots?: number;
  status?: string;
  registrationDeadline?: string;
}

export default function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<EducationalPrograms | null>(null);
  const [schedules, setSchedules] = useState<ProgramSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgramData();
  }, [id]);

  const loadProgramData = async () => {
    try {
      if (!id) return;
      
      // Load program details
      const programData = await BaseCrudService.getById<EducationalPrograms>('educationalprograms', id);
      setProgram(programData);

      // Load schedules for this program
      const schedulesResult = await BaseCrudService.getAll<ProgramSchedule>('programschedules', [], { limit: 100 });
      setSchedules(schedulesResult.items || []);
    } catch (error) {
      console.error('Error loading program data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'full':
        return <XCircle size={20} className="text-red-600" />;
      case 'coming soon':
        return <AlertCircle size={20} className="text-yellow-600" />;
      default:
        return <AlertCircle size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-green-50 border-green-200';
      case 'full':
        return 'bg-red-50 border-red-200';
      case 'coming soon':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'full':
        return 'bg-red-100 text-red-800';
      case 'coming soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return timeString;
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

              {/* Schedules Section */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Available Schedules</h2>
                
                {schedules.length > 0 ? (
                  <div className="space-y-4">
                    {schedules.map((schedule) => (
                      <div
                        key={schedule._id}
                        className={`border-2 rounded-lg p-6 transition-all duration-200 ${getStatusColor(schedule.status)}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                              {schedule.scheduleName}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                              {schedule.startDate && (
                                <div className="flex items-center gap-2">
                                  <Calendar size={16} className="text-primary" />
                                  <span>{formatDate(schedule.startDate)}</span>
                                </div>
                              )}
                              {schedule.startTime && (
                                <div className="flex items-center gap-2">
                                  <Clock size={16} className="text-primary" />
                                  <span>{formatTime(schedule.startTime)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(schedule.status)}
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadgeColor(schedule.status)}`}>
                              {schedule.status || 'Unknown'}
                            </span>
                          </div>
                        </div>

                        {/* Availability Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">Availability</span>
                            <span className="text-sm font-bold text-foreground">
                              {schedule.availableSpots} / {schedule.totalSpots} spots available
                            </span>
                          </div>
                          <div className="w-full bg-foreground/10 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-primary to-primary/80 h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${((schedule.totalSpots || 0) - (schedule.availableSpots || 0)) / (schedule.totalSpots || 1) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Spots Info */}
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-primary" />
                            <span className="text-sm text-foreground/70">
                              {schedule.availableSpots === 0
                                ? 'Class Full'
                                : `${schedule.availableSpots} spot${schedule.availableSpots !== 1 ? 's' : ''} left`}
                            </span>
                          </div>
                          {schedule.registrationDeadline && (
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-primary" />
                              <span className="text-sm text-foreground/70">
                                Register by {formatDate(schedule.registrationDeadline)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* CTA Button */}
                        <Button
                          asChild
                          disabled={schedule.status?.toLowerCase() === 'full' || schedule.availableSpots === 0}
                          className={`w-full md:w-auto ${
                            schedule.status?.toLowerCase() === 'full' || schedule.availableSpots === 0
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-primary text-white hover:bg-primary/90'
                          }`}
                        >
                          <a href="/contact">
                            {schedule.status?.toLowerCase() === 'full' || schedule.availableSpots === 0
                              ? 'Class Full - Join Waitlist'
                              : 'Enroll Now'}
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-secondary/10 border border-foreground/10 rounded-lg p-8 text-center">
                    <AlertCircle size={32} className="text-foreground/40 mx-auto mb-3" />
                    <p className="text-foreground/60">No schedules available yet. Check back soon!</p>
                  </div>
                )}
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
