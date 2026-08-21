import { useEffect, useRef, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { ContactInquiries } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    senderName: '',
    emailAddress: '',
    phoneNumber: '',
    subject: '',
    inquiryMessage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectChange = (value: string) => {
    setFormData({
      ...formData,
      subject: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create<ContactInquiries>('contactinquiries', {
        _id: crypto.randomUUID(),
        senderName: formData.senderName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        subject: formData.subject,
        inquiryMessage: formData.inquiryMessage,
        submissionDate: new Date().toISOString(),
      });

      setIsSubmitted(true);
      setFormData({
        senderName: '',
        emailAddress: '',
        phoneNumber: '',
        subject: '',
        inquiryMessage: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(201,168,76,0.15),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Ready to get started? Have questions? We&apos;re here to help. Reach out today and let&apos;s discuss how our programs can support your family or community.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedElement>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">Email Us</h3>
                <a
                  href="mailto:info@ujima.org"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  info@ujima.org
                </a>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">Call Us</h3>
                <a
                  href="tel:5551234567"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  (555) 123-4567
                </a>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-foreground/5">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">Location</h3>
                <p className="text-foreground/70">Virtual Services Nationwide</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedElement>
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-foreground/5">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-primary" size={32} />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                      Thank You!
                    </h2>
                    <p className="text-foreground/70 leading-relaxed mb-8">
                      Your message has been received. We&apos;ll get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-foreground text-foreground hover:bg-foreground hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                        Send Us a Message
                      </h2>
                      <p className="text-foreground/70">
                        Fill out the form below and we&apos;ll respond within 24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="senderName" className="text-foreground font-medium mb-2 block">
                            Full Name *
                          </Label>
                          <Input
                            id="senderName"
                            name="senderName"
                            type="text"
                            required
                            value={formData.senderName}
                            onChange={handleChange}
                            className="border-foreground/20 focus:border-primary"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <Label htmlFor="emailAddress" className="text-foreground font-medium mb-2 block">
                            Email Address *
                          </Label>
                          <Input
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            required
                            value={formData.emailAddress}
                            onChange={handleChange}
                            className="border-foreground/20 focus:border-primary"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phoneNumber" className="text-foreground font-medium mb-2 block">
                            Phone Number
                          </Label>
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="border-foreground/20 focus:border-primary"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div>
                          <Label htmlFor="subject" className="text-foreground font-medium mb-2 block">
                            Subject *
                          </Label>
                          <Select value={formData.subject} onValueChange={handleSubjectChange}>
                            <SelectTrigger className="border-foreground/20 focus:border-primary">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Program Inquiry">Program Inquiry</SelectItem>
                              <SelectItem value="Scholarship Request">Scholarship Request</SelectItem>
                              <SelectItem value="Partnership Opportunity">Partnership Opportunity</SelectItem>
                              <SelectItem value="Volunteer Interest">Volunteer Interest</SelectItem>
                              <SelectItem value="General Question">General Question</SelectItem>
                              <SelectItem value="Feedback">Feedback</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="inquiryMessage" className="text-foreground font-medium mb-2 block">
                          Message *
                        </Label>
                        <Textarea
                          id="inquiryMessage"
                          name="inquiryMessage"
                          required
                          value={formData.inquiryMessage}
                          onChange={handleChange}
                          className="border-foreground/20 focus:border-primary min-h-[150px]"
                          placeholder="Tell us about your needs and how we can help..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] py-6 text-lg"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message
                            <Send size={18} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-primary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                No Family Turned Away
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                We are committed to ensuring that quality education is accessible to all, regardless of financial circumstances. If cost is a barrier, please reach out to discuss options. We work with every family to find a solution.
              </p>
              <div className="inline-block px-6 py-3 bg-white rounded-full shadow-lg">
                <p className="text-foreground font-medium">
                  <span className="text-primary font-bold">100% Virtual</span> • No Transportation Barriers • Flexible Scheduling
                </p>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
