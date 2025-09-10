import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Contact = () => {
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const { ref: contactRef, isVisible: isContactVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={contactRef} className="py-24 bg-gradient-to-br from-orange-100/80 to-red-100/60 backdrop-blur-sm relative overflow-hidden">
      {/* Sunset background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
          isContactVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`} style={{ transitionDelay: '0.2s' }}></div>
        <div className={`absolute bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
          isContactVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`} style={{ animationDelay: '1s', transitionDelay: '0.4s' }}></div>
        
        {/* Sunset floating elements */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-orange-400/30 rounded-full animate-gentle-drift transition-all duration-1000 ${
              isContactVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
              transitionDelay: `${0.6 + i * 0.1}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Sunset header */}
          <div className={`mb-20 transition-all duration-1000 ${
            isContactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-6 group cursor-default">
              <span className="inline-block transition-all duration-500 group-hover:scale-105 group-hover:text-orange-600">
                Let's Build Something Amazing
              </span>
              {isButtonHovered && (
                <Sparkles className="inline-block ml-4 h-8 w-8 text-orange-500 animate-spin" />
              )}
            </h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto">
              Ready to take your frontend project to the next level? 
              Let's discuss how we can create exceptional user experiences together.
            </p>
          </div>

          {/* Interactive contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <a
              href="mailto:saketh1111@gmail.com"
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 animate-fade-in-up cursor-pointer relative overflow-hidden transition-all duration-300"
              onMouseEnter={() => setHoveredContact(0)}
              onMouseLeave={() => setHoveredContact(null)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-orange-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <Mail className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-orange-800 group-hover:text-orange-600 transition-colors duration-300">Email</h3>
                    <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-300">Direct contact</p>
                  </div>
                </div>
                <p className="text-orange-600 font-medium group-hover:text-orange-700 transition-colors duration-300">saketh1111@gmail.com</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/dsaketh/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 animate-fade-in-up cursor-pointer relative overflow-hidden transition-all duration-300"
              style={{ animationDelay: '200ms' }}
              onMouseEnter={() => setHoveredContact(1)}
              onMouseLeave={() => setHoveredContact(null)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-orange-600"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <Linkedin className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-orange-800 group-hover:text-orange-600 transition-colors duration-300">LinkedIn</h3>
                    <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-300">Professional network</p>
                  </div>
                </div>
                <p className="text-orange-600 font-medium group-hover:text-orange-700 transition-colors duration-300">Connect with me</p>
              </div>
            </a>

            <div 
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 animate-fade-in-up cursor-pointer relative overflow-hidden transition-all duration-300" 
              style={{ animationDelay: '400ms' }}
              onMouseEnter={() => setHoveredContact(2)}
              onMouseLeave={() => setHoveredContact(null)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-orange-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">📍</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-orange-800 group-hover:text-orange-600 transition-colors duration-300">Location</h3>
                    <p className="text-orange-600 group-hover:text-orange-700 transition-colors duration-300">Based in Texas</p>
                  </div>
                </div>
                <p className="text-orange-600 font-medium group-hover:text-orange-700 transition-colors duration-300">Frisco, Texas</p>
              </div>
            </div>
          </div>

          {/* Sunset CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:saketh1111@gmail.com" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 active:scale-95 shadow-md hover:shadow-lg font-semibold group relative overflow-hidden"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span className="relative z-10 flex items-center">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a 
              href="https://github.com/SAKETH1111" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 border border-orange-300 text-orange-700 hover:bg-orange-50 hover:text-orange-800 active:scale-95 shadow-md hover:shadow-lg font-semibold bg-white/80 backdrop-blur-sm group relative overflow-hidden"
            >
              <span className="relative z-10">View GitHub Profile</span>
              <div className="absolute inset-0 bg-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;