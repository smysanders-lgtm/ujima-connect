import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ArrowLeft, CheckCircle2, Upload, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { VolunteerApplications } from '@/entities';

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
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function VolunteerYourSkillsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    areasOfInterest: '',
    availability: '',
    experience: '',
    portfolioLink: ''
  });

  const [documents, setDocuments] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const interestOptions = [
    'STEM Education',
    'Digital Literacy',
    'Business & Entrepreneurship',
    'Arts & Creative Skills',
    'Language & Communication',
    'Health & Wellness',
    'Career Development',
    'Financial Literacy',
    'Environmental Science',
    'Social Justice & Advocacy'
  ];

  const volunteerBenefits = [
    'Lead workshops in your field of expertise',
    'Tutor students one-on-one',
    'Support program operations and events',
    'Build meaningful connections with students',
    'Flexible scheduling options',
    'Professional development opportunities'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setDocuments(prev => [...prev, ...newFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.areasOfInterest || !formData.experience || !formData.availability) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Create application data
      const applicationData: VolunteerApplications = {
        _id: crypto.randomUUID(),
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        areasOfInterest: formData.areasOfInterest,
        experience: formData.experience,
        availability: formData.availability,
        portfolioLink: formData.portfolioLink || undefined,
        arraydocument: documents.length > 0 ? documents.map(doc => ({
          name: doc.name,
          size: doc.size,
          type: doc.type
        })) : undefined
      };

      // Submit to CMS
      await BaseCrudService.create('volunteerapplications', applicationData);

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          areasOfInterest: '',
          availability: '',
          experience: '',
          portfolioLink: ''
        });
        setDocuments([]);
      }, 3000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground selection:bg-primary/30">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#151615] text-white overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 w-full h-full lg:w-[60%] lg:left-auto lg:right-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#151615] via-[#151615]/80 to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-[#151615]/60 lg:hidden z-10" />
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1000&fit=crop&auto=format"
            alt="Volunteer your skills"
            className="w-full h-full object-cover object-center opacity-70 lg:opacity-100"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 py-20">
          <div className="max-w-2xl">
            <AnimatedElement>
              <Link to="/get-involved" className="inline-flex items-center gap-2 text-primary/90 hover:text-primary transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-paragraph">Back to Get Involved</span>
              </Link>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                Volunteer Your <span className="text-primary">Skills</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl font-light">
                Contribute your professional expertise through workshops, tutoring, or program support. Make a direct impact on students' lives.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Why Volunteer With Us
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                The Impact of Volunteering
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedElement delay={100}>
              <div className="space-y-6">
                {volunteerBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span className="text-lg text-gray-700 font-light">{benefit}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-secondary p-12 border border-gray-100">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Volunteer Opportunities
                </h3>
                <ul className="space-y-4 text-gray-700 font-light">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Lead specialized workshops and seminars</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Provide one-on-one tutoring sessions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Support program planning and execution</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Guest speak at events and assemblies</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Mentor career development initiatives</span>
                  </li>
                </ul>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Ready to Get Started?
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Volunteer Application
              </h2>
              <p className="text-lg text-gray-600 mt-4 font-light">
                Tell us about your skills and how you'd like to contribute.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <form onSubmit={handleSubmit} className="bg-white p-10 border border-gray-100">
              {submitted && (
                <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-bold text-green-900">Application Submitted!</p>
                      <p className="text-sm text-green-700">We'll review your application and contact you soon.</p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-2">0-2 years</option>
                    <option value="2-5">2-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Availability *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select availability</option>
                    <option value="1-2-hours">1-2 hours per week</option>
                    <option value="3-5-hours">3-5 hours per week</option>
                    <option value="5-10-hours">5-10 hours per week</option>
                    <option value="10+-hours">10+ hours per week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Portfolio Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="portfolioLink"
                    value={formData.portfolioLink}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>

              {/* Areas of Interest */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-foreground mb-4">
                  Areas of Interest *
                </label>
                <div className="space-y-3">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.areasOfInterest.includes(interest)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              areasOfInterest: prev.areasOfInterest ? `${prev.areasOfInterest}, ${interest}` : interest
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              areasOfInterest: prev.areasOfInterest.split(', ').filter(i => i !== interest).join(', ')
                            }));
                          }
                          setError('');
                        }}
                        className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                      />
                      <span className="text-gray-700 font-light">{interest}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">Select at least one area of interest</p>
              </div>

              {/* Document Upload */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-foreground mb-3">
                  Upload Supporting Documents (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleDocumentChange}
                    className="hidden"
                    id="documents-upload"
                  />
                  <label
                    htmlFor="documents-upload"
                    className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed border-gray-300 hover:border-primary transition-colors cursor-pointer bg-gray-50"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Click to upload documents
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, or images</p>
                    </div>
                  </label>
                </div>

                {documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-bold text-foreground">Uploaded documents:</p>
                    {documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200">
                        <span className="text-sm text-gray-700">{doc.name}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(idx)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-white hover:bg-accent/90 font-semibold px-10 py-3 rounded-none transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-white font-semibold px-10 py-3 rounded-none transition-all duration-300"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </AnimatedElement>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Common Questions
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedElement>

          <div className="space-y-8">
            {[
              {
                q: 'What types of skills are you looking for?',
                a: 'We welcome volunteers from all professional backgrounds! Whether you work in tech, education, business, arts, or any other field, we can find ways to leverage your expertise.'
              },
              {
                q: 'How flexible is the volunteer schedule?',
                a: 'Very flexible! You can choose your own schedule based on your availability. Whether you can commit 1 hour or 10+ hours per week, we have opportunities for you.'
              },
              {
                q: 'Do I need prior volunteer experience?',
                a: 'No prior experience necessary! We provide training and support to help you succeed. What matters most is your willingness to share your knowledge and make a difference.'
              },
              {
                q: 'What support will I receive?',
                a: 'We provide comprehensive orientation, ongoing guidance, resources, and a supportive community of volunteers. Our team is here to help you succeed.'
              }
            ].map((item, idx) => (
              <AnimatedElement key={idx} delay={idx * 100}>
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                    {item.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {item.a}
                  </p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
