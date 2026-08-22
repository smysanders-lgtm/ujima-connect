import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { ArrowLeft, CheckCircle2, Upload } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';

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

export default function BecomeAMentorPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    expertise: '',
    resume: null as File | null,
    credentials: null as File | null,
    whyMentor: '',
    availability: '',
    experience: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');
  const [credentialsFileName, setCredentialsFileName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'resume' | 'credentials') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fileType]: file
      }));
      if (fileType === 'resume') {
        setResumeFileName(file.name);
      } else {
        setCredentialsFileName(file.name);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || 
          !formData.expertise.trim() || !formData.experience || !formData.availability || 
          !formData.whyMentor.trim() || !formData.resume) {
        alert('Please fill in all required fields and upload your resume.');
        return;
      }

      // Validate motivation text length
      if (formData.whyMentor.trim().length < 50) {
        alert('Please provide at least 50 characters for your motivation.');
        return;
      }

      // Convert experience string to number (extract first number from range)
      const experienceMap: { [key: string]: number } = {
        '0-2': 1,
        '2-5': 3,
        '5-10': 7,
        '10+': 15
      };
      const yearsOfExperience = experienceMap[formData.experience] || 0;

      // Create mentor application record in CMS
      // Note: File uploads are stored as file names only since direct upload API is not available
      await BaseCrudService.create('mentorapplications', {
        _id: crypto.randomUUID(),
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        expertise: formData.expertise,
        yearsOfExperience: yearsOfExperience,
        availability: formData.availability,
        motivation: formData.whyMentor,
        submissionDate: new Date().toISOString(),
        resumeUrl: resumeFileName,
        credentialsUrl: credentialsFileName
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          expertise: '',
          resume: null,
          credentials: null,
          whyMentor: '',
          availability: '',
          experience: ''
        });
        setResumeFileName('');
        setCredentialsFileName('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting mentor application:', error);
      alert('There was an error submitting your application. Please try again.');
    }
  };

  const mentorBenefits = [
    'Make a direct impact on student lives',
    'Flexible time commitment',
    'Comprehensive mentor training',
    'Access to mentoring resources',
    'Community of like-minded educators',
    'Professional development opportunities'
  ];

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
            alt="Become a mentor"
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
                Become a <span className="text-primary">Mentor</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl font-light">
                Share your expertise and experience with students who need guidance and support. Make a lasting impact on the next generation of leaders.
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
                Why Mentor With Us
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                The Rewards of Mentoring
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedElement delay={100}>
              <div className="space-y-6">
                {mentorBenefits.map((benefit, idx) => (
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
                  What We Provide
                </h3>
                <ul className="space-y-4 text-gray-700 font-light">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Comprehensive training and mentoring framework</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Ongoing support and resources</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Mentee matching based on expertise</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Regular check-ins and feedback</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Community events and networking</span>
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
                Mentor Application
              </h2>
              <p className="text-lg text-gray-600 mt-4 font-light">
                Tell us about yourself and why you'd like to mentor with us.
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Area of Expertise *
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g., STEM, Business, Arts"
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
              </div>

              {/* File Uploads */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Upload Resume *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, 'resume')}
                      required
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed border-gray-300 hover:border-primary transition-colors cursor-pointer bg-gray-50"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {resumeFileName || 'Click to upload'}
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, or DOCX</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Upload Credentials/Certifications
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={(e) => handleFileChange(e, 'credentials')}
                      className="hidden"
                      id="credentials-upload"
                    />
                    <label
                      htmlFor="credentials-upload"
                      className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed border-gray-300 hover:border-primary transition-colors cursor-pointer bg-gray-50"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {credentialsFileName || 'Click to upload'}
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, or PNG</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Why Mentor */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-foreground mb-3">
                  Why do you want to become a mentor? *
                </label>
                <textarea
                  name="whyMentor"
                  value={formData.whyMentor}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your motivation, what you hope to achieve, and how you plan to support your mentees..."
                />
                <p className="text-xs text-gray-500 mt-2">Minimum 50 characters</p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold px-10 py-3 rounded-none transition-all duration-300"
                >
                  Submit Application
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
                q: 'What qualifications do I need?',
                a: 'We welcome mentors from all backgrounds! You should have expertise or experience in your field and a genuine desire to help students grow. Professional certifications are a plus but not required.'
              },
              {
                q: 'How much time commitment is required?',
                a: 'We offer flexible arrangements. Most mentors commit 1-5 hours per week, but you can choose what works best for your schedule.'
              },
              {
                q: 'How are mentees matched with mentors?',
                a: 'We carefully match mentees with mentors based on expertise, interests, and goals. Our team ensures compatibility for the best mentoring relationship.'
              },
              {
                q: 'What support do mentors receive?',
                a: 'We provide comprehensive training, ongoing resources, regular check-ins, and a supportive community of mentors to help you succeed.'
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
