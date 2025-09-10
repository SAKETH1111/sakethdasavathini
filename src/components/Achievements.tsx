import { Trophy, Award, Star } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const achievements = [
  {
    title: "AWS QuickSight Hackathon Winner 2023",
    description: "Won AWS QuickSight Hackathon for innovative data visualization solutions",
    icon: Trophy,
    gradient: "var(--gradient-orange)"
  },
  {
    title: "Pinnacle Award 2021 - Accenture",
    description: "Recognized for exceptional performance and innovation in application development",
    icon: Award,
    gradient: "var(--gradient-purple)"
  },
  {
    title: "Mozilla Firefox Hyderabad Hackathon Winner 2019",
    description: "Developed innovative web solutions and won the Mozilla Firefox hackathon",
    icon: Star,
    gradient: "var(--gradient-blue)"
  }
];

const Achievements = () => {
  const { ref: achRef, isVisible: isAchVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={achRef} className="py-24 bg-gradient-to-br from-green-50/90 to-green-100/80 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Fall-style header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isAchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Awards & Recognition
            </h2>
            <p className="text-xl text-green-700">
              Recognized for innovation and excellence in software development
            </p>
          </div>

          {/* Fall-style achievement cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 text-center transition-all duration-1000 border border-green-200 ${
                    isAchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  <div 
                    className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-500 to-red-600"
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-green-700 leading-relaxed text-lg">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;