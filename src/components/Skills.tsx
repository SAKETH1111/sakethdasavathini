import { Code2, Palette, Smartphone, Zap } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend Technologies",
    skills: ["React", "TypeScript", "JavaScript (ES6+)", "Next.js", "HTML5", "CSS3", "Marko.js"],
    color: "text-blue-500"
  },
  {
    icon: Zap,
    title: "Backend & Cloud",
    skills: ["Node.js", "Java", "Spring Boot", "AWS", "GraphQL", "REST APIs", "Microservices"],
    color: "text-green-500"
  },
  {
    icon: Palette,
    title: "UI/UX & Styling",
    skills: ["Tailwind CSS", "Material-UI v5", "Bootstrap", "CSS3", "Responsive Design", "WCAG"],
    color: "text-purple-500"
  },
  {
    icon: Smartphone,
    title: "DevOps & Testing",
    skills: ["Docker", "Kubernetes", "Jenkins CI/CD", "Jest", "React Testing Library", "Playwright"],
    color: "text-orange-500"
  }
];

const Skills = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Technical Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mastering modern frontend technologies to build exceptional user experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-card shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-hero shadow-elegant group-hover:animate-glow`}>
                    <category.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;