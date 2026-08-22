import { useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Check } from 'lucide-react';

interface ProgramRegistrationFormProps {
  programName: string;
  onClose: () => void;
}

export default function ProgramRegistrationForm({ programName, onClose }: ProgramRegistrationFormProps) {
  const [formData, setFormData] = useState({
    registrantName: '',
    registrantEmail: '',
    phoneNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.registrantName.trim() || !formData.registrantEmail.trim()) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Create registration entry
      await BaseCrudService.create('programregistrations', {
        _id: crypto.randomUUID(),
        registrantName: formData.registrantName,
        registrantEmail: formData.registrantEmail,
        phoneNumber: formData.phoneNumber,
        programName: programName,
        registrationDate: new Date().toISOString(),
      });

      setIsSuccess(true);
      
      // Close form after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to submit registration. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Close form"
        >
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <Check size={32} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              Registration Successful!
            </h3>
            <p className="text-foreground/70">
              Thank you for registering for {programName}. A confirmation email will be sent to {formData.registrantEmail}.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              Register for Program
            </h2>
            <p className="text-foreground/60 mb-6 font-paragraph">
              {programName}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="registrantName" className="block text-sm font-paragraph font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  id="registrantName"
                  name="registrantName"
                  type="text"
                  value={formData.registrantName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="registrantEmail" className="block text-sm font-paragraph font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  id="registrantEmail"
                  name="registrantEmail"
                  type="email"
                  value={formData.registrantEmail}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-paragraph font-medium text-foreground mb-2">
                  Phone Number (Optional)
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700 font-paragraph">{error}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-foreground/10 text-foreground hover:bg-foreground/20"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-white hover:bg-primary/90"
                >
                  {isSubmitting ? 'Registering...' : 'Register Now'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
