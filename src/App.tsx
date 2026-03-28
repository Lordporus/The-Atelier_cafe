/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  MessageCircle, 
  Coffee, 
  Leaf, 
  Check, 
  ArrowRight, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Send, 
  Globe, 
  Share2, 
  Mail,
  Quote,
  Utensils
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800';
  const PHONE_NUMBER = '919886012345';
  const WHATSAPP_BASE_URL = `https://wa.me/${PHONE_NUMBER}`;
  const BOOKING_MESSAGE = encodeURIComponent('Hi, I want to book a table at Atelier Cafe.');

  const getWhatsAppLink = (message: string) => `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
  const bookingLink = getWhatsAppLink('Hi, I want to book a table for today.');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [activeSection, setActiveSection] = useState('home');
  const [analytics, setAnalytics] = useState({
    whatsappClicks: 0,
    menuOpens: 0,
    ctaClicks: 0,
    deliveryClicks: 0
  });

  const trackEvent = (event: keyof typeof analytics, label: string) => {
    console.log(`[Analytics] Event: ${String(event)} | Label: ${label} | Time: ${new Date().toISOString()}`);
    setAnalytics(prev => ({ ...prev, [event]: prev[event] + 1 }));
  };

  const fullMenu = {
    Starters: [
      { name: 'Gunpowder Wedges', price: '₹195', desc: 'Crispy potato wedges with spicy podi.', img: 'https://images.unsplash.com/photo-1573016608294-d447906a3a29?auto=format&fit=crop&q=80&w=400' },
      { name: 'Avocado Bhel', price: '₹285', desc: 'A healthy twist to your favorite street food.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Paneer Tikka Bao', price: '₹325', desc: 'Soft buns with spicy paneer filling.', img: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=400' },
      { name: 'Truffle Fries', price: '₹245', desc: 'Golden fries tossed in truffle oil and parmesan.', img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=400' },
    ],
    Mains: [
      { name: 'Truffle Dal Makhani', price: '₹445', desc: 'Our famous dal with a hint of truffle oil.', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Paneer Tikka Pizza', price: '₹425', desc: 'Thin crust pizza with smoky paneer.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400' },
      { name: 'Butter Chicken Bowl', price: '₹495', desc: 'Creamy butter chicken with fragrant rice.', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
      { name: 'Jackfruit Burger', price: '₹345', desc: 'Meaty texture burger, purely veg.', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400' },
      { name: 'Pesto Pasta', price: '₹395', desc: 'Creamy basil pesto with sun-dried tomatoes.', img: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400' },
    ],
    Beverages: [
      { name: 'Masala Chai Frappe', price: '₹245', desc: 'Signature cold chai with vanilla.', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400' },
      { name: 'Filter Coffee', price: '₹95', desc: 'Traditional Chikmagalur brew.', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400' },
      { name: 'Gulab Jamun Cheesecake', price: '₹375', desc: 'Fusion dessert special.', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400' },
      { name: 'Fresh Lime Soda', price: '₹125', desc: 'Refreshing and classic.', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' },
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection('about');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'menu', 'location'];
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  useEffect(() => {
    if (showFullMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowFullMenu(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showFullMenu]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Small delay to allow home to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', id: 'home', type: 'scroll' },
    { name: 'Menu', id: 'menu', type: 'scroll' },
    { name: 'Locations', id: 'location', type: 'scroll' },
    { name: 'About', id: 'about', type: 'route' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
          <button 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-headline italic text-primary cursor-pointer"
          >
            Atelier Cafe & Bistro
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => {
                  if (link.type === 'scroll') {
                    scrollToSection(link.id);
                  } else {
                    setCurrentPage('about');
                  }
                }}
                className={`font-headline font-bold tracking-tight text-lg transition-all duration-300 cursor-pointer relative group ${
                  (currentPage === 'home' && activeSection === link.id) || (currentPage === 'about' && link.id === 'about') 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  (currentPage === 'home' && activeSection === link.id) || (currentPage === 'about' && link.id === 'about')
                  ? 'w-full opacity-100' 
                  : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'
                }`}></span>
              </button>
            ))}
            <a 
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsappClicks', 'Navbar Booking Button')}
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Book via WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-surface-container border-b border-outline-variant/10 md:hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link) => (
                  <button 
                    key={link.name}
                    onClick={() => {
                      if (link.type === 'scroll') {
                        scrollToSection(link.id);
                      } else {
                        setCurrentPage('about');
                        setIsMenuOpen(false);
                      }
                    }}
                    className={`font-headline font-bold text-xl text-left transition-all duration-300 ${
                      (currentPage === 'home' && activeSection === link.id) || (currentPage === 'about' && link.id === 'about')
                      ? 'text-primary pl-4 border-l-4 border-primary' 
                      : 'text-on-surface hover:text-primary pl-0 border-l-0 border-transparent'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                <a 
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-on-primary w-full py-4 rounded-xl font-bold text-lg shadow-lg text-center"
                >
                  Book via WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {currentPage === 'home' ? (
        <>
          {/* Hero Section */}
          <header id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-50 scale-105" 
            alt="warm cozy cafe interior with wooden tables"
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1920"
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20"
            >
              Indiranagar's favorite hangout spot
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-headline text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-on-surface leading-[1.1] mb-8 tracking-tight font-bold"
            >
              Good Food.<br/><span className="italic text-primary font-normal">Great Vibes.</span><br/>Since 2022.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-on-surface-variant text-lg sm:text-xl md:text-2xl max-w-xl mb-10 leading-relaxed font-light"
            >
              Serving fresh food and great coffee in the heart of Indiranagar. Book your spot on WhatsApp for a quick bite or a long catch-up.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <a 
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsappClicks', 'Hero Booking Button')}
                  className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-lg font-bold shadow-coffee hover:opacity-90 transition-all flex items-center justify-center gap-2 min-h-[56px]"
                >
                  <MessageCircle size={24} fill="currentColor" />
                  Book Table on WhatsApp
                </a>
                <span className="text-primary/80 text-xs font-medium px-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Turn visitors into bookings instantly
                </span>
              </div>
              <button 
                onClick={() => {
                  setShowFullMenu(true);
                  trackEvent('menuOpens', 'Hero View Menu Button');
                }}
                className="border border-outline-variant/30 text-on-surface px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-lg font-semibold hover:bg-surface-container transition-colors backdrop-blur-sm min-h-[56px] flex items-center justify-center w-full sm:w-auto"
              >
                View Full Menu
              </button>
            </motion.div>
          </div>
        </div>
      </header>


      {/* Trust Strip */}
      <section className="py-12 bg-surface-container-lowest border-y border-outline-variant/10">
        <div className="container mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-background object-cover" 
                  alt={`regular customer ${i}`}
                  src={`https://i.pravatar.cc/100?u=customer${i}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=C${i}&background=random`; }}
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-on-primary shadow-lg">4.8★</div>
            </div>
            <p className="text-on-surface-variant font-medium tracking-tight">5000+ happy customers • Rated 4.8★ on Google (120+ reviews)</p>
          </div>
          <div className="h-px w-24 bg-outline-variant/20 hidden lg:block"></div>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-on-surface-variant/80 font-headline italic text-lg sm:text-xl">
            <span className="flex items-center gap-2"><Check size={16} className="text-primary" /> Fresh ingredients used daily</span>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-32 container mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4 lg:pt-12">
              <div className="rounded-xl overflow-hidden aspect-[4/5] shadow-lg">
                <img 
                  className="w-full h-full object-cover" 
                  alt="freshly brewed filter coffee"
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                />
              </div>
              <div className="bg-surface-container p-6 sm:p-8 rounded-xl">
                <Coffee className="text-primary mb-4" size={40} />
                <h4 className="font-headline text-xl mb-2">Real Filter Coffee</h4>
                <p className="text-on-surface-variant text-sm">Strong, aromatic, and brewed just the way you like it. Sourced from Chikmagalur.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-primary-container/20 p-6 sm:p-8 rounded-xl">
                <Leaf className="text-primary mb-4" size={40} />
                <h4 className="font-headline text-xl mb-2">Local Ingredients</h4>
                <p className="text-on-surface-variant text-sm">We buy our veggies from the local market every single morning.</p>
              </div>
              <div className="rounded-xl overflow-hidden aspect-[4/5] shadow-lg">
                <img 
                  className="w-full h-full object-cover" 
                  alt="fresh local market vegetables"
                  src="https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=800"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-primary font-label uppercase tracking-[0.2em] text-sm mb-4 block">Our Story</span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl mb-8 leading-tight">A Cozy Spot for <span className="italic">Indiranagar Folks</span></h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              We started Atelier in 2022 because we wanted a place that felt like home. No fancy rules, just good food, great coffee, and a space where you can be yourself.
            </p>
            <ul className="space-y-6 mb-10">
              {[
                { title: 'Home-style Cooking', desc: 'Our recipes are simple, honest, and made with a lot of heart. No artificial colors or preservatives.' },
                { title: 'Meet Chef Rahul', desc: 'Our head chef Rahul loves experimenting with local flavors. You might see him around the cafe asking for your feedback!' }
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Check className="text-primary" size={14} strokeWidth={3} />
                  </div>
                  <div>
                    <h5 className="font-bold text-on-surface">{item.title}</h5>
                    <p className="text-on-surface-variant text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant/10">
              <img 
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" 
                alt="Chef Rahul"
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=200"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Chef+Rahul&background=random'; }}
              />
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Head Chef</p>
                <p className="font-headline text-lg">Chef Rahul</p>
                <p className="text-xs text-on-surface-variant">"Cooking is about making people feel at home."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section id="menu" className="py-16 md:py-32 bg-surface-container-low">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-6">
            <div>
              <span className="text-primary font-label uppercase tracking-[0.2em] text-sm mb-4 block">Chef's Selection</span>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl">Signature Creations</h2>
              <p className="text-on-surface-variant/60 text-xs mt-2 italic">Prices & items can be easily updated anytime</p>
            </div>
            <button 
              onClick={() => {
                setShowFullMenu(true);
                trackEvent('menuOpens', 'Menu Section Link');
              }}
              className="text-primary font-bold flex items-center gap-2 hover:underline underline-offset-8 transition-all group"
            >
              View Full Menu <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Masala Chai Frappe',
                price: '₹245',
                desc: 'Our signature cold chai with a hint of vanilla. Perfect for Bangalore afternoons.',
                img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
                tag: 'Best Seller'
              },
              {
                title: 'Paneer Tikka Pizza',
                price: '₹425',
                desc: 'Thin crust pizza topped with smoky paneer tikka and fresh coriander.',
                img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
                tag: 'Must Try'
              },
              {
                title: 'Butter Chicken Bowl',
                price: '₹495',
                desc: 'Creamy butter chicken served with fragrant jeera rice. Pure comfort in a bowl.',
                img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800'
              }
            ].map((dish) => (
              <div key={dish.title} className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:translate-y-[-8px] transition-all duration-300">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={dish.title}
                    src={dish.img}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  />
                  {dish.tag && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                        {dish.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-headline text-xl sm:text-2xl">{dish.title}</h3>
                    <span className="text-primary font-bold">{dish.price}</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{dish.desc}</p>
                  <a 
                    href={getWhatsAppLink(`Hi, I want to order ${dish.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsappClicks', `Order ${dish.title}`)}
                    className="w-full py-3 border border-outline-variant/30 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors min-h-[44px] flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={14} fill="currentColor" />
                    Order on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Page CTA */}
      <section className="py-12 bg-surface-container-lowest">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-on-surface-variant text-sm font-medium">Craving something special? Join 5000+ happy diners.</p>
            <a 
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsappClicks', 'Mid-Page Booking Button')}
              className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              <MessageCircle size={20} fill="currentColor" />
              Book Your Table Now
            </a>
            <div className="flex flex-col gap-1">
              <p className="text-primary/60 text-xs italic">Get more customers directly on WhatsApp</p>
              <p className="text-on-surface-variant/40 text-[10px]">Instant WhatsApp confirmation • Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview Grid */}
      <section className="py-16 md:py-32 container mx-auto px-4 sm:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl mb-4">The Atelier Menu</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-16 gap-y-12 lg:gap-y-16">
          {[
            { 
              name: 'Truffle Dal Makhani', 
              price: '₹445', 
              desc: 'Our famous dal with a hint of truffle oil.',
              img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600'
            },
            { 
              name: 'Paneer Tikka Bao', 
              price: '₹325', 
              desc: 'Soft buns with spicy paneer filling.',
              img: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=600'
            },
            { 
              name: 'Avocado Bhel', 
              price: '₹285', 
              desc: 'A healthy twist to your favorite street food.',
              img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600'
            },
            { 
              name: 'Gulab Jamun Cheesecake', 
              price: '₹375', 
              desc: 'The best of both worlds in one dessert.',
              img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600'
            },
            { 
              name: 'Gunpowder Wedges', 
              price: '₹195', 
              desc: 'Crispy potato wedges with spicy podi.',
              img: 'https://images.unsplash.com/photo-1573016608294-d447906a3a29?auto=format&fit=crop&q=80&w=600'
            },
            { 
              name: 'Jackfruit Burger', 
              price: '₹345', 
              desc: 'A meaty texture burger that is purely veg.',
              img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600'
            }
          ].map((item) => (
            <div key={item.name} className="group flex flex-col gap-5 pb-8 border-b border-outline-variant/10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg bg-surface-container-low">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={item.name}
                  src={item.img}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="flex justify-between items-start">
                <div className="pr-4">
                  <h5 className="font-headline font-bold text-xl text-on-surface group-hover:text-primary transition-colors duration-300">{item.name}</h5>
                  <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <span className="text-primary font-bold text-lg shrink-0">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-16 md:py-32 container mx-auto px-4 sm:px-8">
        <div className="bg-surface-container rounded-xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px]">
            <img 
              className="w-full h-full object-cover" 
              alt="afternoon tea spread with snacks and coffee"
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=1200"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
            />
          </div>
          <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-20 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Limited Time Offer</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl mb-6">Afternoon Tea/Coffee Special</h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              Treat yourself to our signature curated platter. Perfect for your mid-day meetings or catch-ups. <span className="text-primary font-bold">Hurry, only 5 slots available for today!</span>
            </p>
            <div className="flex flex-wrap items-baseline gap-4 mb-10">
              <span className="text-4xl sm:text-5xl font-headline text-primary">₹899</span>
              <span className="text-on-surface-variant line-through text-xl">₹1299</span>
              <span className="text-on-tertiary-container bg-tertiary-container px-3 py-1 rounded text-xs font-bold animate-bounce">30% OFF</span>
            </div>
            <div className="flex flex-col gap-3">
              <a 
                href={getWhatsAppLink('Hi, I want to claim the Afternoon Special Offer.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-on-primary px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg font-bold shadow-lg hover:translate-y-[-2px] transition-all self-start min-h-[56px] flex items-center gap-2"
              >
                <MessageCircle size={24} fill="currentColor" />
                Claim Offer Now
              </a>
              <p className="text-on-surface-variant text-xs italic ml-1">Instant confirmation • No pre-payment required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-32 bg-surface-container-lowest">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 flex flex-col items-center gap-6">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl">What our regulars say</h2>
            <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" 
                alt="Google" 
                className="w-4 h-4" 
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <span className="text-sm font-bold">4.8/5 Rating</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-primary text-primary" />)}
              </div>
              <span className="text-xs text-on-surface-variant">(120+ Verified Reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Rohan Deshmukh',
                role: 'Bangalore Local',
                text: '"Best cafe in Indiranagar. Loved the pasta! The vibes here are just different, very chill."',
                img: 'https://i.pravatar.cc/100?u=rohan'
              },
              {
                name: 'Priya Nair',
                role: 'Regular Guest',
                text: '"Quick service and great ambience. I come here every weekend for their Filter Coffee. Highly recommend!"',
                img: 'https://i.pravatar.cc/100?u=priya',
                featured: true
              },
              {
                name: 'Arjun Reddy',
                role: 'Coffee Lover',
                text: '"The Masala Chai Frappe is a must-try. Perfect for a rainy afternoon in Bangalore. Staff is super friendly too."',
                img: 'https://i.pravatar.cc/100?u=arjun'
              }
            ].map((t) => (
              <div 
                key={t.name} 
                className={`bg-surface-container-low p-8 sm:p-10 rounded-xl relative transition-all duration-300 ${t.featured ? 'md:scale-105 border border-primary/10 shadow-coffee z-10' : ''}`}
              >
                <Quote className="text-primary-container opacity-20 absolute top-6 right-6" size={48} />
                <div className="flex gap-1 text-primary mb-6">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} fill="currentColor" />)}
                </div>
                <p className="text-on-surface-variant italic mb-8 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-bright">
                    <img 
                      className="w-full h-full object-cover" 
                      alt={t.name} 
                      src={t.img} 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=random`; }}
                    />
                  </div>
                  <div>
                    <h6 className="font-bold text-on-surface">{t.name}</h6>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post-Testimonials CTA */}
      <section className="py-12 bg-surface-container-low">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <div className="flex flex-col items-center gap-6">
            <h3 className="font-headline text-2xl sm:text-3xl">Join our happy guests today</h3>
            <a 
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary px-10 py-5 rounded-xl text-lg font-bold shadow-coffee hover:scale-105 transition-transform flex items-center gap-2"
            >
              <MessageCircle size={24} fill="currentColor" />
              Book Table on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Ambience Gallery */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl">Our Sanctuary</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-8 pb-8 no-scrollbar scroll-smooth snap-x">
          {[
            { img: 'https://images.unsplash.com/photo-1551632432-c735e7a030be?auto=format&fit=crop&q=80&w=800', width: 'min-w-[300px] sm:min-w-[400px]', caption: 'Crafting Coffee' },
            { img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800', width: 'min-w-[350px] sm:min-w-[500px]', caption: 'Art in a Cup' },
            { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', width: 'min-w-[250px] sm:min-w-[300px]', caption: 'Fresh from the Kitchen' },
            { img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', width: 'min-w-[300px] sm:min-w-[400px]', caption: 'Evening Vibes' }
          ].map((item, idx) => (
            <div key={idx} className={`${item.width} h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-2xl shrink-0 snap-center relative group`}>
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt={`gallery ${idx}`}
                src={item.img}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-headline text-lg">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Booking Works */}
      <section className="py-16 md:py-32 bg-surface-container-low">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <span className="text-primary font-label uppercase tracking-[0.2em] text-sm mb-4 block">Process</span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl">Seamless WhatsApp Booking</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { icon: MessageCircle, title: '1. Text Us', desc: 'Click the booking button and send our pre-filled message on WhatsApp.' },
              { icon: Clock, title: '2. Pick a Slot', desc: 'Select your preferred date, time, and number of guests from the options provided.' },
              { icon: Check, title: '3. Get Confirmed', desc: 'Receive an instant digital invite and confirmation for your table.' }
            ].map((step) => (
              <div key={step.title} className="text-center group">
                <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-primary transition-colors duration-300">
                  <step.icon className="text-primary group-hover:text-on-primary" size={32} />
                </div>
                <h4 className="font-headline text-2xl mb-4">{step.title}</h4>
                <p className="text-on-surface-variant">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section id="location" className="py-16 md:py-32 container mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl mb-8">Visit Us in Indiranagar</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <MapPin className="text-primary shrink-0" size={24} />
                <div>
                  <h5 className="font-bold text-xl mb-2 text-on-surface">Atelier Cafe & Bistro</h5>
                  <a 
                    href="https://maps.google.com/?q=Atelier+Cafe+Indiranagar+Bangalore" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-on-surface-variant leading-relaxed hover:text-primary transition-colors"
                  >
                    12th Main Rd, HAL 2nd Stage, Indiranagar,<br/>
                    Near Metro Station, Bangalore - 560038
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Clock size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-xl mb-2 text-on-surface">Opening Hours</h5>
                  <div className="text-on-surface-variant space-y-1">
                    <p className="flex justify-between gap-8"><span>Mon – Thu:</span> <span className="font-medium">10:00 AM – 10:00 PM</span></p>
                    <p className="flex justify-between gap-8"><span>Fri – Sun:</span> <span className="font-medium">09:00 AM – 11:00 PM</span></p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Phone className="text-primary shrink-0" size={24} />
                <div>
                  <h5 className="font-bold text-xl mb-2 text-on-surface">Call or WhatsApp</h5>
                  <a 
                    href="tel:+918041234567" 
                    className="text-on-surface-variant hover:text-primary transition-colors block"
                  >
                    +91 80 4123 4567 (Landline)
                  </a>
                  <a 
                    href={`https://wa.me/${PHONE_NUMBER}`} 
                    className="text-on-surface-variant hover:text-primary transition-colors block"
                  >
                    +91 98860 12345 (WhatsApp)
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl relative group">
            <img 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity" 
              alt="map of indiranagar"
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
            />
            <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <a 
                href="https://maps.google.com/?q=Atelier+Cafe+Indiranagar+Bangalore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
              >
                <MapPin size={20} />
                Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <div className="max-w-4xl mx-auto bg-surface-container-high py-16 sm:py-24 px-6 sm:px-12 rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl mb-8 leading-tight relative z-10">Ready to Unwind with<br/><span className="italic text-primary">Great Food?</span></h2>
            <p className="text-on-surface-variant text-lg sm:text-xl mb-12 max-w-2xl mx-auto relative z-10">
              We're waiting to host you. Experience the perfect blend of tradition and modernity today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center relative z-10">
              <a 
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-on-primary px-8 sm:px-12 py-4 sm:py-6 rounded-xl text-lg sm:text-xl font-bold shadow-2xl hover:scale-105 transition-transform min-h-[56px] flex items-center justify-center gap-2"
              >
                <MessageCircle size={24} fill="currentColor" />
                Book Table on WhatsApp
              </a>
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-outline-variant text-on-surface px-8 sm:px-12 py-4 sm:py-6 rounded-xl text-lg sm:text-xl font-bold hover:bg-surface-container transition-colors min-h-[56px] flex items-center justify-center"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

        </>
      ) : (
        <div className="pt-20">
          {/* About Hero */}
          <section className="relative h-[60vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                className="w-full h-full object-cover" 
                alt="Atelier cafe cozy exterior"
                src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=1920"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-8 relative z-10 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-headline text-5xl sm:text-7xl text-white mb-6"
              >
                Our Story
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/90 text-xl sm:text-2xl max-w-2xl mx-auto font-light"
              >
                A journey of flavors, community, and the perfect cup of coffee in the heart of Indiranagar.
              </motion.p>
            </div>
          </section>

          {/* Story Content */}
          <section className="py-20 bg-surface-container-lowest">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="max-w-3xl mx-auto space-y-8 text-lg text-on-surface-variant leading-relaxed">
                <p>
                  We started Atelier in 2022 with a simple vision: to create a space that felt like an extension of your own living room. No fancy rules, no pretension—just honest food and great vibes.
                </p>
                <p>
                  Indiranagar is a bustling hub, and we wanted to provide a sanctuary where you could slow down. Whether it's for a quick morning espresso or a long, lazy Sunday brunch with friends, Atelier is built for those who appreciate the finer, simpler things in life.
                </p>
                <p>
                  Our name, "Atelier," means a workshop or studio. For us, every plate and every cup is a piece of craft. We experiment, we refine, and we serve with love.
                </p>
              </div>
            </div>
          </section>

          {/* Meet the Chef */}
          <section className="py-20 container mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800" 
                  alt="Chef Rahul preparing food"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Chef+Rahul&background=random'; }}
                />
              </div>
              <div className="w-full lg:w-1/2">
                <span className="text-primary font-label uppercase tracking-[0.2em] text-sm mb-4 block">The Craft</span>
                <h2 className="font-headline text-4xl sm:text-5xl mb-8">Meet Chef Rahul</h2>
                <p className="text-on-surface-variant text-lg mb-6 leading-relaxed">
                  Chef Rahul brings over a decade of experience from kitchens across India, but his heart has always been in fusion and comfort food.
                </p>
                <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                  "I believe food should make you feel something. At Atelier, I take local ingredients and give them a global twist. It's about that first bite that makes you close your eyes and smile."
                </p>
                <div className="p-6 bg-surface-container rounded-2xl border-l-4 border-primary italic text-on-surface">
                  "Cooking isn't just a job for me; it's how I connect with people. Every dish that leaves my kitchen is a personal invitation to my world."
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="py-20 bg-surface-container-low">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="text-center mb-16">
                <h2 className="font-headline text-4xl sm:text-5xl">What We Stand For</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Leaf, title: 'Fresh Ingredients', desc: 'Sourced daily from local markets to ensure peak flavor.' },
                  { icon: MapPin, title: 'Local Sourcing', desc: 'Supporting our community by working with local farmers.' },
                  { icon: Coffee, title: 'Quality Focus', desc: 'From bean to cup, we never compromise on excellence.' },
                  { icon: Utensils, title: 'Friendly Vibe', desc: 'A warm welcome for everyone, every single time.' }
                ].map((value) => (
                  <div key={value.title} className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <value.icon className="text-primary mb-6" size={40} />
                    <h4 className="font-headline text-xl mb-4">{value.title}</h4>
                    <p className="text-on-surface-variant text-sm">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Ambience Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="text-center mb-16">
                <h2 className="font-headline text-4xl sm:text-5xl mb-4">The Atelier Vibe</h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto">Take a peek into our sanctuary in the city.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-80 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800" 
                    alt="Cozy window seating" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  />
                </div>
                <div className="h-80 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800" 
                    alt="Elegant restaurant interior" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  />
                </div>
                <div className="h-80 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800" 
                    alt="Ambient cafe lighting" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* About Final CTA */}
          <section className="py-20 bg-primary text-on-primary">
            <div className="container mx-auto px-4 sm:px-8 text-center">
              <h2 className="font-headline text-4xl sm:text-6xl mb-8">Ready to Visit Us?</h2>
              <p className="text-xl mb-12 opacity-90">We're waiting to host you and share our story through our food.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => scrollToSection('location')}
                  className="bg-on-primary text-primary px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:scale-105 transition-transform"
                >
                  Visit Us Today
                </button>
                <a 
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-on-primary text-on-primary px-10 py-5 rounded-xl font-bold text-xl hover:bg-on-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={24} fill="currentColor" />
                  Book on WhatsApp
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-surface-dim pt-16 pb-8 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="font-headline text-xl text-primary mb-6">Atelier Cafe & Bistro</div>
            <p className="text-sm leading-relaxed text-on-surface-variant mb-8">
              Indiranagar's favorite hangout spot. Serving fresh food and great vibes since 2022.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <a 
                  href="https://www.zomato.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('deliveryClicks', 'Footer Zomato')}
                  className="bg-[#E23744] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Order on Zomato
                </a>
                <a 
                  href="https://www.swiggy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('deliveryClicks', 'Footer Swiggy')}
                  className="bg-[#FC8019] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Order on Swiggy
                </a>
              </div>
              <a href="mailto:hello@ateliercafe.in" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 text-sm"><Mail size={18} /> hello@ateliercafe.in</a>
            </div>
          </div>
          <div>
            <h4 className="font-headline text-lg text-primary mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Menu', id: 'menu' },
                { name: 'Locations', id: 'location' },
                { name: 'About', id: 'about' }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => {
                      if (item.id === 'about') {
                        setCurrentPage('about');
                      } else {
                        scrollToSection(item.id);
                      }
                    }}
                    className="text-sm text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => alert('Our Privacy Policy is simple: We only use your data to manage your bookings and provide you with the best experience at Atelier. We never share your information with third parties.')}
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg text-primary mb-6">Join the Atelier</h4>
            <p className="text-sm text-on-surface-variant mb-6">Subscribe to receive exclusive menu previews and event invites.</p>
            <form className="flex gap-2">
              <input 
                className="bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary w-full text-on-surface" 
                placeholder="Your email address" 
                type="email"
              />
              <button className="bg-primary text-on-primary p-3 rounded-xl hover:opacity-90 transition-opacity">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-on-surface-variant">© 2024 Atelier Cafe & Bistro. Indiranagar, Bangalore.</p>
          <p className="text-sm text-on-surface-variant">Made with ❤️ for Bangalore</p>
        </div>
      </footer>

      {/* Full Menu Modal */}
      <AnimatePresence>
        {showFullMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullMenu(false)}
            className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl overflow-y-auto p-4 sm:p-8 flex justify-center"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-background min-h-screen sm:min-h-0 sm:my-8 rounded-3xl p-6 sm:p-12 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-12 sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10">
                <h2 className="font-headline text-3xl sm:text-5xl">Atelier Full Menu</h2>
                <button 
                  onClick={() => setShowFullMenu(false)}
                  className="p-2 hover:bg-surface-container rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="space-y-16 pb-32">
                {Object.entries(fullMenu).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-headline text-2xl sm:text-4xl text-primary mb-8 border-b border-primary/20 pb-2">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                      {items.map((item) => (
                        <div key={item.name} className="flex flex-col sm:flex-row gap-6 group">
                          <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0 shadow-md">
                            <img 
                              src={item.img} 
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-1">
                              <h5 className="font-bold text-xl text-on-surface group-hover:text-primary transition-colors">{item.name}</h5>
                              <span className="text-primary font-bold shrink-0 text-lg ml-4">{item.price}</span>
                            </div>
                            <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 left-0 w-full bg-gradient-to-t from-background via-background to-transparent pt-12 pb-4 flex flex-col items-center gap-4">
                <div className="flex gap-4 w-full max-w-xs">
                  <a 
                    href="https://www.zomato.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('deliveryClicks', 'Modal Zomato')}
                    className="flex-1 bg-[#E23744] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Zomato
                  </a>
                  <a 
                    href="https://www.swiggy.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('deliveryClicks', 'Modal Swiggy')}
                    className="flex-1 bg-[#FC8019] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Swiggy
                  </a>
                </div>
                <a 
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsappClicks', 'Modal Booking Button')}
                  className="bg-primary text-on-primary w-full max-w-xs py-5 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-3 hover:scale-105 transition-transform text-lg"
                >
                  <MessageCircle size={24} fill="currentColor" />
                  Book Table on WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a 
        href={bookingLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 sm:bottom-8 sm:right-8 z-[100] bg-[#25D366] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 duration-200"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={32} fill="currentColor" />
      </a>

      {/* Sticky Bottom Mobile Bar */}
      <div className="fixed bottom-0 left-0 w-full z-[90] md:hidden bg-background/95 backdrop-blur-md border-t border-outline-variant/20 px-4 py-3 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col">
          <span className="text-on-surface font-bold text-sm">Book Your Table</span>
          <span className="text-primary text-[10px] font-medium">Instant confirmation</span>
        </div>
        <a 
          href={bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg"
        >
          <MessageCircle size={18} fill="currentColor" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
