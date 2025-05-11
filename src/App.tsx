import React, { useState, useEffect } from "react";
import { HeroSection } from "./components/hero-section";
import { PortfolioGrid } from "./components/portfolio-grid";
import { AboutSection } from "./components/about-section";
import { ContactForm } from "./components/contact-form";
import { ThemeSwitcher } from "./components/theme-switcher";
import { Button, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import LogoDark from "./assets/logo-black.svg";
import LogoLight from "./assets/logo.white.svg";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if dark mode is active for body class
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
      if (isDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    };

    checkDarkMode();

    // Set up a mutation observer to watch for changes to the html class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/90 backdrop-blur-lg shadow-md py-2" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <Image 
              src={isDarkMode ? LogoLight : LogoDark} 
              alt="Rahul Tiwari Logo" 
              className="h-10 w-auto outline-none"
            />
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-default-600 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <ThemeSwitcher />
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeSwitcher />
            <Button
              isIconOnly
              variant="light"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon icon={mobileMenuOpen ? "lucide:x" : "lucide:menu"} className="text-xl" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-divider">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-medium text-default-600 hover:text-primary-600 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
      
      <main id="home">
        <HeroSection />
        <PortfolioGrid />
        <AboutSection />
        <ContactForm />
      </main>
      
      <footer className="py-12 px-4 bg-default-50 dark:bg-black-900/95 border-divider dark:border-default-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <Image 
                  src={isDarkMode ? LogoLight : LogoDark} 
                  alt="Rahul Tiwari Logo" 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-default-600 dark:text-default-400 max-w-xs">
                A graphic designer crafting beautiful digital experiences through thoughtful design
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-default-200">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-default-600 dark:text-default-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-default-200">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="LinkedIn" className="text-default-600 dark:text-default-400 hover:text-primary-600 dark:hover:text-primary-400">
                  <Icon icon="lucide:linkedin" className="text-xl" />
                </a>
                <a href="#" aria-label="Instagram" className="text-default-600 dark:text-default-400 hover:text-primary-600 dark:hover:text-primary-400">
                  <Icon icon="lucide:instagram" className="text-xl" />
                </a>
                <a href="#" aria-label="Twitter" className="text-default-600 dark:text-default-400 hover:text-primary-600 dark:hover:text-primary-400">
                  <Icon icon="lucide:twitter" className="text-xl" />
                </a>
                <a href="#" aria-label="Dribbble" className="text-default-600 dark:text-default-400 hover:text-primary-600 dark:hover:text-primary-400">
                  <Icon icon="lucide:dribbble" className="text-xl" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-divider dark:border-default-800 text-center text-default-500 dark:text-default-400">
            © {new Date().getFullYear()} Rahul Tiwari. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
