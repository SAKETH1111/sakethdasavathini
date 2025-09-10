import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
// import Hero3D from "./Hero3D";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { ref: heroRef, isVisible: isHeroVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden" 
      style={{ 
        background: 'linear-gradient(180deg, rgba(135,206,235,0.8) 0%, rgba(152,216,232,0.6) 50%, rgba(240,230,140,0.9) 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* 3D Background */}
      {/* <Hero3D /> */}
      
      {/* Interactive background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-300/20 to-orange-400/20 rounded-full blur-3xl transition-all duration-1000 ease-out ${
            isHeroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transitionDelay: '0.2s'
          }}
        ></div>
        <div 
          className={`absolute bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-yellow-300/20 rounded-full blur-3xl transition-all duration-1000 ease-out ${
            isHeroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            transitionDelay: '0.4s'
          }}
        ></div>
        
        {/* Summer sun rays */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-10 bg-yellow-400/60 rounded-full animate-sunshine transition-all duration-1000 ${
              isHeroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              left: `${5 + i * 8}%`,
              top: `${-10}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + i * 0.3}s`,
              transitionDelay: `${0.6 + i * 0.1}s`
            }}
          ></div>
        ))}

        {/* Floating summer elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`summer-${i}`}
            className={`absolute w-4 h-4 bg-gradient-to-r from-yellow-300/50 to-orange-300/50 rounded-full animate-gentle-drift transition-all duration-1000 ${
              isHeroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 12}%`,
              animationDelay: `${i * 1.2}s`,
              transitionDelay: `${0.8 + i * 0.2}s`
            }}
          ></div>
        ))}

        {/* Summer sun elements */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`sun-${i}`}
            className={`absolute w-8 h-8 border-2 border-yellow-300/40 rounded-full animate-ripple transition-all duration-1000 ${
              isHeroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              left: `${15 + i * 25}%`,
              top: `${70 + i * 8}%`,
              animationDelay: `${i * 3}s`,
              transitionDelay: `${1 + i * 0.3}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Moving Sun Animation - Sunrise to Sunset */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-24 h-24 animate-sunrise-sunset">
          {/* Sun rays - alternating yellow and orange, rounded rectangular */}
          <div className="absolute inset-0 animate-sun-rays">
            {/* Rays around the entire circumference */}
            {Array.from({ length: 24 }, (_, i) => {
              const angle = (i * 15); // 15-degree intervals for 24 rays
              const isYellow = i % 2 === 0; // Alternate between yellow and orange
              return (
                <div
                  key={`ray-${i}`}
                  className="absolute animate-ray-pulse"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: '50% 0%',
                    transform: `rotate(${angle}deg) translateY(-35px)`,
                    animationDelay: `${i * 0.05}s`
                  }}
                >
                  {/* Rounded rectangular ray shape */}
                  <div 
                    className={`w-2 h-8 rounded-full ${isYellow ? 'bg-yellow-400' : 'bg-orange-500'}`}
                    style={{
                      filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.1))'
                    }}
                  />
                </div>
              );
            })}
          </div>
          
          {/* Main sun body - natural bright yellow */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full animate-sun-glow shadow-lg">
            {/* Natural highlight on upper right */}
            <div className="absolute top-2 right-3 w-5 h-4 bg-yellow-200 rounded-full opacity-80"></div>
            
            {/* Subtle inner glow */}
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-60"></div>
            
          </div>
        </div>
      </div>
      
      {/* Light beams across the hero section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/10 to-transparent animate-light-beam"></div>
        
        {/* Corner lighting effects */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-yellow-200/20 to-transparent animate-corner-light"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-yellow-200/20 to-transparent animate-corner-light"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main content with Apple typography */}
          <div className={`transition-all duration-1000 ${
            isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 
              className="text-rainfall-large text-orange-800 mb-6 group cursor-default relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Main name with sun lighting effect */}
              <span className="relative inline-block transition-all duration-500 group-hover:scale-105 group-hover:text-yellow-600 animate-name-highlight">
                Saketh Dasavathini
              </span>
              
              {isHovering && (
                <Sparkles className="inline-block ml-4 h-8 w-8 text-yellow-500 animate-spin" />
              )}
            </h1>
            <p className="text-rainfall-subheadline text-orange-700 mb-4 font-medium hover:text-yellow-600 transition-colors duration-300 cursor-default">
              Senior Full Stack Engineer at eBay
            </p>
            <p className="text-rainfall-body text-orange-600 mb-8 max-w-3xl mx-auto">
              <span className="font-semibold text-orange-800 hover:text-yellow-600 transition-colors duration-300 cursor-default">7+ years</span> of innovative full-stack development experience. 
              Expert in React, TypeScript, Node.js, AWS & Java. Building scalable solutions impacting 
              <span className="font-semibold text-orange-800 hover:text-yellow-600 transition-colors duration-300 cursor-default"> millions of users</span> at world-class tech companies.
            </p>
            
            {/* Interactive feature badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 text-rainfall-caption">
              <div className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="w-2 h-2 bg-yellow-500 rounded-full group-hover:animate-pulse"></div>
                <span className="group-hover:text-yellow-600 transition-colors duration-300">AWS Certified Solutions Architect</span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:animate-pulse"></div>
                <span className="group-hover:text-orange-600 transition-colors duration-300">AWS QuickSight Hackathon Winner 2023</span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover:animate-pulse"></div>
                <span className="group-hover:text-yellow-500 transition-colors duration-300">Frisco, Texas</span>
              </div>
            </div>
          </div>

          {/* Summer-style CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up-delay">
            <button className="btn-rainfall group bg-yellow-500 hover:bg-yellow-600">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="btn-rainfall-outline border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800">
              Download Resume
            </button>
          </div>

          {/* Summer-style Social Links */}
          <div className="flex justify-center space-x-4 animate-fade-in-up-delay">
            <a 
              href="https://linkedin.com/in/dsaketh/" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 hover-lift"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-orange-700" />
            </a>
            <a 
              href="https://github.com/SAKETH1111" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 hover-lift"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-orange-700" />
            </a>
            <a 
              href="mailto:saketh1111@gmail.com" 
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 hover-lift"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-orange-700" />
            </a>
          </div>

          {/* Summer-style scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center animate-bounce">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;