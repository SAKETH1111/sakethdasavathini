import { Code2, Palette, Smartphone, Zap } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend Technologies",
    skills: ["React", "TypeScript", "Next.js", "Vue.js", "Angular", "JavaScript ES6+"],
    color: "text-blue-500"
  },
  {
    icon: Palette,
    title: "Styling & Design",
    skills: ["Tailwind CSS", "Styled Components", "SASS/SCSS", "CSS3", "Material-UI", "Chakra UI"],
    color: "text-purple-500"
  },
  {
    icon: Zap,
    title: "Build Tools & Performance",
    skills: ["Webpack", "Vite", "Rollup", "ESLint", "Prettier", "Bundle Optimization"],
    color: "text-yellow-500"
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    skills: ["Responsive Design", "Progressive Web Apps", "Mobile-First", "Accessibility (a11y)"],
    color: "text-green-500"
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