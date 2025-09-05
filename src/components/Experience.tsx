import { Building2, Calendar } from "lucide-react";

const experiences = [
  {
    company: "eBay Inc",
    role: "Senior Full Stack Engineer",
    period: "Mar 2025 - Present",
    description: "Spearheading end-to-end development of scalable advertising solutions within eBay Ads ecosystem. Building modern React components with TypeScript, Marko.js, and Node.js. Optimized SPA performance by ~35% through lazy loading and code splitting.",
    logo: "🏢",
    current: true,
    highlights: ["eBay Ads Ecosystem", "35% Performance Optimization", "React/TypeScript/Node.js"]
  },
  {
    company: "Amazon AWS",
    role: "Software Development Engineer",
    period: "Jan 2023 - Feb 2025",
    description: "Full-stack developer for AWS QuickSight, building data analytics applications impacting 1M+ users worldwide. Specialized in React, TypeScript, Java, GraphQL APIs, and advanced JavaScript optimization techniques.",
    logo: "📦",
    current: false,
    highlights: ["AWS QuickSight", "1M+ Users Impact", "GraphQL Integration"]
  },
  {
    company: "Amazon AWS",
    role: "Software Development Engineer Intern",
    period: "Jun 2022 - Aug 2022",
    description: "Enhanced QuickSight visualization capabilities and developed innovative date range filtering features. Gained expertise in progressive web applications and React optimization.",
    logo: "📦",
    current: false,
    highlights: ["Data Visualization", "React Optimization", "PWA Development"]
  },
  {
    company: "Accenture",
    role: "Application Developer Associate",
    period: "Oct 2019 - Jul 2021",
    description: "Developed microservices using Spring Boot, implemented secure RESTful APIs with OAuth 2.0/JWT. Built automated client receipt generation impacting 500K+ customers. Containerized applications with Docker/Kubernetes.",
    logo: "💼",
    current: false,
    highlights: ["Microservices Architecture", "500K+ Customer Impact", "Docker/Kubernetes"]
  }
];

const Experience = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building exceptional user experiences at world-class technology companies
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-2xl bg-gradient-card shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in ${
                  exp.current ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {exp.current && (
                  <div className="absolute -top-3 -right-3 bg-gradient-hero text-primary-foreground px-4 py-1 rounded-full text-sm font-medium animate-glow">
                    Current
                  </div>
                )}
                
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center text-2xl shadow-elegant">
                    {exp.logo}
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <Building2 className="h-4 w-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  {exp.highlights && (
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, idx) => (
                        <span key={idx} className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;