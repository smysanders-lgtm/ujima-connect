import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Gift, Heart, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export default function DonationPage() {
  const [searchParams] = useSearchParams();
  const [donationAmount, setDonationAmount] = useState<number | null>(null);

  useEffect(() => {
    const amount = searchParams.get('amount');
    if (amount) {
      setDonationAmount(parseInt(amount, 10));
      // Scroll to donation form
      const formElement = document.getElementById('wix-donation-form');
      if (formElement) {
        setTimeout(() => {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [searchParams]);

  const handleDonate = (amount: number) => {
    // Scroll to donation form with amount parameter
    const formElement = document.getElementById('wix-donation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setDonationAmount(amount);
    }
  };

  const donationLevels = [
    {
      amount: '$25',
      amountValue: 25,
      title: 'Friend',
      description: 'Support a student with essential resources',
      benefits: ['Digital learning materials', 'Monthly impact updates', 'Donor recognition']
    },
    {
      amount: '$50',
      amountValue: 50,
      title: 'Advocate',
      description: 'Fund a mentoring session',
      benefits: ['All Friend benefits', 'Quarterly impact report', 'Exclusive webinar access']
    },
    {
      amount: '$100',
      amountValue: 100,
      title: 'Champion',
      description: 'Sponsor a workshop or training',
      benefits: ['All Advocate benefits', 'Annual impact dinner invitation', 'Custom impact report']
    },
    {
      amount: '$250+',
      amountValue: 250,
      title: 'Visionary',
      description: 'Create lasting change',
      benefits: ['All Champion benefits', 'Named scholarship option', 'Strategic partnership opportunities']
    }
  ];

  const impactAreas = [
    {
      icon: Gift,
      title: 'Scholarships',
      description: 'Direct financial support for deserving students',
      amount: '40%'
    },
    {
      icon: Heart,
      title: 'Programs',
      description: 'Educational workshops and mentoring initiatives',
      amount: '35%'
    },
    {
      icon: DollarSign,
      title: 'Operations',
      description: 'Staff, facilities, and program management',
      amount: '25%'
    }
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
            src="https://images.unsplash.com/photo-1532635241749-b22642131d25?w=1600&h=1000&fit=crop&auto=format"
            alt="Make a donation to support our mission"
            className="w-full h-full object-cover object-center opacity-70 lg:opacity-100"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 py-20">
          <div className="max-w-2xl">
            <AnimatedElement>
              <div className="mb-6">
                <span className="text-xs md:text-sm text-primary/90 font-paragraph tracking-[0.2em] uppercase">
                  Make a Donation
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1] tracking-tight">
                Your Generosity <br className="hidden md:block" />
                <span className="text-primary">Transforms Lives</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl font-light">
                Every donation directly supports our students and programs. Your contribution makes a measurable difference in the lives of young people pursuing their dreams.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Donation Levels */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Giving Levels
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Choose Your Impact Level
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationLevels.map((level, index) => (
              <AnimatedElement key={index} delay={index * 100}>
                <div className="bg-white border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all duration-500 p-8 flex flex-col h-full group">
                  <div className="mb-4">
                    <div className="text-4xl font-heading font-bold text-primary mb-2">
                      {level.amount}
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                      {level.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      {level.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8 pb-8 border-b border-gray-100 flex-1">
                    {level.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleDonate(level.amountValue)}
                    className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold w-full rounded-none transition-all duration-300"
                  >
                    Donate Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Breakdown */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Where Your Money Goes
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Transparent Impact
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <AnimatedElement key={index} delay={index * 100}>
                  <div className="bg-white p-10 border border-gray-100 hover:border-primary/30 transition-all duration-500">
                    <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-lg mb-6">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 font-light">
                      {area.description}
                    </p>
                    <div className="text-3xl font-heading font-bold text-primary">
                      {area.amount}
                    </div>
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donor Stories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/80 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Donor Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Making a Real Difference
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedElement delay={100}>
              <div className="bg-secondary p-10 border border-gray-100">
                <p className="text-lg leading-relaxed mb-6 font-light italic text-foreground">
                  "My donation helped fund a scholarship for a student who is now in college studying engineering. Knowing I played a part in her journey is incredibly fulfilling."
                </p>
                <div>
                  <p className="font-bold text-foreground">Robert Johnson</p>
                  <p className="text-sm text-gray-600">Donor since 2022</p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-secondary p-10 border border-gray-100">
                <p className="text-lg leading-relaxed mb-6 font-light italic text-foreground">
                  "I started with a small donation and have increased my support each year. The transparency and impact reports make it clear that every dollar counts."
                </p>
                <div>
                  <p className="font-bold text-foreground">Patricia Lee</p>
                  <p className="text-sm text-gray-600">Monthly Donor</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Wix Donations Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedElement>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Make Your Donation
              </h2>
              <p className="text-lg text-foreground/70 font-light">
                {donationAmount 
                  ? `You've selected ${donationAmount}. Complete your donation below.`
                  : 'Select an amount above or enter a custom amount to get started.'}
              </p>
            </div>
          </AnimatedElement>

          <div id="wix-donation-form" className="bg-secondary p-10 border border-gray-200">
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-4">
                Donation Amount
              </label>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-heading font-bold text-primary">$</span>
                <input
                  type="number"
                  value={donationAmount || ''}
                  onChange={(e) => setDonationAmount(e.target.value ? parseInt(e.target.value, 10) : null)}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg"
                  min="1"
                />
              </div>
            </div>

            <div className="bg-white p-8 border border-gray-200 rounded-lg mb-8">
              <h3 className="text-lg font-heading font-bold text-foreground mb-6">Donor Information</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-foreground">
                    I would like to receive updates about our programs and impact
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-foreground">
                    This donation is in honor or memory of someone
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-white p-8 border border-gray-200 rounded-lg mb-8">
              <h3 className="text-lg font-heading font-bold text-foreground mb-6">Payment Method</h3>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg cursor-pointer bg-primary/5">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <span className="font-semibold text-foreground">Credit / Debit Card</span>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary/30 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    className="w-4 h-4"
                  />
                  <span className="font-semibold text-foreground">Bank Transfer</span>
                </label>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      placeholder="12345"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-foreground text-white p-6 rounded-lg mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-light">Donation Amount:</span>
                <span className="text-3xl font-heading font-bold">
                  ${donationAmount || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-white/80">
                <span>Processing Fee:</span>
                <span>${(donationAmount ? Math.round(donationAmount * 0.029 * 100) / 100 : 0).toFixed(2)}</span>
              </div>
              <div className="border-t border-white/20 mt-4 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-3xl font-heading font-bold">
                  ${(donationAmount ? donationAmount + Math.round(donationAmount * 0.029 * 100) / 100 : 0).toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-primary text-[#151615] hover:bg-primary/90 font-semibold py-7 rounded-none text-lg transition-all duration-300 uppercase tracking-widest"
              disabled={!donationAmount || donationAmount < 1}
            >
              Complete Donation <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <p className="text-xs text-gray-600 text-center mt-6">
              Your donation is secure and encrypted. We never store your full card details.
            </p>
          </div>
        </div>
      </section>

      {/* ... keep existing code (FAQ Section and CTA Section) ... */}
      <section className="py-24 bg-foreground text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedElement>
            <div className="mb-16">
              <span className="text-xs text-primary/90 font-paragraph tracking-[0.2em] uppercase mb-4 block">
                Questions
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedElement>

          <div className="space-y-6">
            <AnimatedElement delay={100}>
              <div className="bg-white/10 p-8 border border-white/20 backdrop-blur-sm">
                <h3 className="text-xl font-heading font-bold mb-3">Are donations tax-deductible?</h3>
                <p className="text-white/80 leading-relaxed font-light">
                  Yes! We are a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law. You'll receive a receipt for your records.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white/10 p-8 border border-white/20 backdrop-blur-sm">
                <h3 className="text-xl font-heading font-bold mb-3">Can I set up a recurring donation?</h3>
                <p className="text-white/80 leading-relaxed font-light">
                  Absolutely! Monthly donations provide steady support for our programs. You can set up, modify, or cancel your recurring donation at any time.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white/10 p-8 border border-white/20 backdrop-blur-sm">
                <h3 className="text-xl font-heading font-bold mb-3">How do I know my donation is secure?</h3>
                <p className="text-white/80 leading-relaxed font-light">
                  We use industry-standard encryption and partner with trusted payment processors. Your financial information is never stored on our servers.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="bg-white/10 p-8 border border-white/20 backdrop-blur-sm">
                <h3 className="text-xl font-heading font-bold mb-3">Can I donate in honor of someone?</h3>
                <p className="text-white/80 leading-relaxed font-light">
                  Yes! You can make a donation in honor or memory of someone special. We'll send them (or their family) a notification of your generous gift.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1A4D2E_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedElement>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-12 h-12 mx-auto mb-8 flex items-center justify-center">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Ready to Give?
              </h2>
              
              <p className="text-lg text-foreground/70 mb-10 leading-relaxed font-light">
                Start making a difference today. Your donation will directly support students and programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleDonate(50)}
                  className="bg-primary text-[#151615] hover:bg-primary/90 font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300"
                >
                  Donate Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-white font-semibold px-10 py-7 rounded-none tracking-widest text-sm uppercase transition-all duration-300"
                >
                  <Link to="/get-involved">Back to Get Involved</Link>
                </Button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
