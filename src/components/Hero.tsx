import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-hero rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-accent rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Saketh Dasavathini
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
              Senior Full Stack Engineer at eBay
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              <span className="text-primary font-semibold">7+ years</span> of innovative full-stack development experience. 
              Expert in React, TypeScript, Node.js, AWS & Java. Building scalable solutions impacting 
              <span className="text-primary font-semibold"> millions of users</span> at world-class tech companies.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                AWS Certified Solutions Architect
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                AWS QuickSight Hackathon Winner 2023
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Frisco, Texas
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-300">
            <Button variant="hero" size="lg" className="group">
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary/40">
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 animate-fade-in delay-500">
            <a 
              href="https://linkedin.com/in/dsaketh/" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary/10 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-primary" />
            </a>
            <a 
              href="https://github.com/SAKETH1111" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary/10 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 text-primary" />
            </a>
            <a 
              href="mailto:saketh1111@gmail.com" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary/10 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-6 w-6 text-primary" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;