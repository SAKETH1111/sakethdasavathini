import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import WeatherBackground from "@/components/WeatherBackground";
import WeatherAudioPlayer from "@/components/WeatherAudioPlayer";
import { useState, useEffect } from "react";

const Index = () => {
  const [currentWeather, setCurrentWeather] = useState<'spring' | 'summer' | 'autumn' | 'winter' | 'storm' | 'sunset'>('summer');
  const [activeSection, setActiveSection] = useState('hero');

  // Map sections to weather themes based on content topics
  const weatherMap: { [key: string]: 'spring' | 'summer' | 'autumn' | 'winter' | 'storm' | 'sunset' } = {
    'hero': 'summer',        // Introduction - Complete summer weather
    'experience': 'storm',   // Professional work - Complete thunderstorm
    'skills': 'spring',      // Technical abilities - Complete spring
    'education': 'winter',   // Academic background - Complete winter
    'achievements': 'autumn', // Awards and recognition - Fall weather with falling leaves
    'contact': 'sunset'      // Let's build something - Sunset theme
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const sections = ['hero', 'experience', 'skills', 'education', 'achievements', 'contact'];
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        const triggerPoint = scrollPosition + viewportHeight * 0.3; // Trigger when heading is 30% down the viewport

        let activeSection = 'hero'; // Default to hero

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = scrollPosition + rect.top;
            
            // Check if the trigger point has passed this section's top
            if (triggerPoint >= elementTop) {
              activeSection = section;
            } else {
              // If we haven't reached this section yet, stop checking
              break;
            }
          }
        }

      setActiveSection(activeSection);
      }, 50); // Throttle to 50ms
    };

    // Initial call to set the correct section on load
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    setCurrentWeather(weatherMap[activeSection] || 'sunset');
  }, [activeSection, weatherMap]);

  return (
    <div className="min-h-screen relative">
      <WeatherBackground weather={currentWeather} />
      
      
      <div className="relative z-10">
        <div id="hero">
          <Hero />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="education">
          <Education />
        </div>
        <div id="achievements">
          <Achievements />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </div>
      
            <WeatherAudioPlayer weather={currentWeather} />
    </div>
  );
};

export default Index;
