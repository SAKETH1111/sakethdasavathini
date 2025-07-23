import { Trophy, Award, Star } from "lucide-react";

const achievements = [
  {
    title: "AWS QuickSight Hackathon Winner 2023",
    description: "Won AWS QuickSight Hackathon for innovative data visualization solutions",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Pinnacle Award 2021 - Accenture",
    description: "Recognized for exceptional performance and innovation in application development",
    icon: Award,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Mozilla Firefox Hyderabad Hackathon Winner 2019",
    description: "Developed innovative web solutions and won the Mozilla Firefox hackathon",
    icon: Star,
    color: "from-blue-500 to-cyan-500"
  }
];

const Achievements = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-accent/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-muted-foreground">
              Recognized for innovation and excellence in software development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-gradient-card shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in text-center"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-r ${achievement.color} items-center justify-center mb-6 shadow-elegant animate-glow`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
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