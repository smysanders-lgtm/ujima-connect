import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const mainTabs = [
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Events', path: '/events' },
    { name: 'Get Involved', path: '/get-involved' },
  ];

  const dropdownLinks = [
    { name: 'Resources', path: '/resources' },
    { name: 'Team', path: '/team' },
    { name: 'Become a Mentor', path: '/become-a-mentor' },
    { name: 'Volunteer Your Skills', path: '/volunteer-your-skills' },
    { name: 'Donation', path: '/donation' },
    { name: 'Spread the Word', path: '/spread-the-word' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Image
              src="https://static.wixstatic.com/media/0538ae_69faf28b5bd64aaa9b44ef3470ae5244~mv2.png"
              alt="Ujima Creative Writing Workshop Services Logo"
              width={120}
              className="h-auto"
            />
          </Link>

          {/* Desktop Navigation - Tab Style */}
          <nav className="hidden md:flex items-center gap-1">
            {mainTabs.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-paragraph transition-all duration-200 hover:text-primary ${
                  isActive(link.path)
                    ? 'text-primary font-medium'
                    : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 text-sm font-paragraph text-foreground hover:text-primary transition-all duration-200 flex items-center gap-1">
                  More
                  <ChevronDown size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {dropdownLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link
                      to={link.path}
                      className={`cursor-pointer ${
                        isActive(link.path) ? 'text-primary font-medium' : 'text-foreground'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-foreground/10 pt-4">
            <div className="flex flex-col space-y-4">
              {mainTabs.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-paragraph transition-colors hover:text-primary ${
                    isActive(link.path) ? 'text-primary font-medium' : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Dropdown */}
              <div className="border-t border-foreground/10 pt-4">
                <div className="text-sm font-paragraph text-foreground mb-2">More</div>
                <div className="flex flex-col space-y-2 pl-2">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-paragraph transition-colors hover:text-primary ${
                        isActive(link.path) ? 'text-primary font-medium' : 'text-foreground'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90 w-full"
              >
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
