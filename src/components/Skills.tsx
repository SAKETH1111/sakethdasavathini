import { Code2, Palette, Smartphone, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend Technologies",
    skills: ["React", "TypeScript", "JavaScript (ES6+)", "Next.js", "HTML5", "CSS3", "Marko.js"],
    gradient: "var(--gradient-blue)",
    color: "text-blue-600",
    description: "Modern frontend frameworks and libraries for building responsive user interfaces"
  },
  {
    icon: Zap,
    title: "Backend & Cloud",
    skills: ["Node.js", "Java", "Spring Boot", "AWS", "GraphQL", "REST APIs", "Microservices"],
    gradient: "var(--gradient-green)",
    color: "text-green-600",
    description: "Scalable backend services and cloud infrastructure solutions"
  },
  {
    icon: Palette,
    title: "UI/UX & Styling",
    skills: ["Tailwind CSS", "Material-UI v5", "Bootstrap", "CSS3", "Responsive Design", "WCAG"],
    gradient: "var(--gradient-purple)",
    color: "text-purple-600",
    description: "Creating beautiful and accessible user experiences"
  },
  {
    icon: Smartphone,
    title: "DevOps & Testing",
    skills: ["Docker", "Kubernetes", "Jenkins CI/CD", "Jest", "React Testing Library", "Playwright"],
    gradient: "var(--gradient-orange)",
    color: "text-orange-600",
    description: "Automated testing and deployment pipelines for reliable software delivery"
  }
];

const Skills = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { ref: skillsRef, isVisible: isSkillsVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={skillsRef} className="py-24 bg-gradient-to-br from-orange-50/80 to-amber-100/60 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Autumn-style header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isSkillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-6 group cursor-default">
              <span className="inline-block transition-all duration-500 group-hover:scale-105 group-hover:text-orange-600">
                Technical Expertise
              </span>
            </h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto">
              Mastering modern technologies to build exceptional user experiences
            </p>
          </div>

          {/* Interactive skill cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer relative overflow-hidden transition-all duration-1000 ${
                  isSkillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              >
                {/* Hover effect overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: category.gradient }}
                ></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div 
                      className="p-4 rounded-2xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-orange-500 to-amber-600"
                    >
                      <category.icon className="h-7 w-7 text-white group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-orange-800 group-hover:text-orange-600 transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-sm text-orange-600 mt-1 group-hover:text-orange-700 transition-colors duration-300">
                        {category.description}
                      </p>
                    </div>
                    <ArrowRight 
                      className={`h-5 w-5 text-orange-500 transition-all duration-300 ${
                        expandedCard === index ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} 
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 hover:scale-105 transition-all duration-200 cursor-default group-hover:shadow-sm"
                        style={{
                          animationDelay: `${skillIndex * 50}ms`,
                          animation: hoveredCard === index ? 'fadeInUp 0.3s ease-out forwards' : 'none'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Expanded content */}
                  <div 
                    className={`mt-6 transition-all duration-300 overflow-hidden ${
                      expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pt-4 border-t border-orange-200">
                      <p className="text-orange-700 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
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