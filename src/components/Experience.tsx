import { Building2, Calendar } from "lucide-react";

const experiences = [
  {
    company: "eBay",
    role: "Senior Frontend Engineer",
    period: "Current",
    description: "Leading frontend development initiatives and architecting scalable web solutions for millions of users.",
    logo: "🏢",
    current: true
  },
  {
    company: "Amazon",
    role: "Frontend Engineer",
    period: "Previous",
    description: "Developed and maintained high-performance web applications serving global customers.",
    logo: "📦",
    current: false
  },
  {
    company: "Accenture",
    role: "Frontend Developer",
    period: "Previous",
    description: "Built responsive web applications and collaborated with cross-functional teams on enterprise solutions.",
    logo: "💼",
    current: false
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
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
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