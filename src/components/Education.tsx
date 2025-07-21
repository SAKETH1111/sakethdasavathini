import { GraduationCap, MapPin } from "lucide-react";

const Education = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Education
            </h2>
            <p className="text-xl text-muted-foreground">
              Building a strong foundation in computer science
            </p>
          </div>

          <div className="relative">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-gradient-card shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-elegant animate-glow">
                  <GraduationCap className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>

              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Master's in Computer Science
                </h3>
                <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-medium text-lg mb-4">
                  <MapPin className="h-5 w-5" />
                  <span>University of Texas at Dallas (UTD)</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced coursework in software engineering, algorithms, and web technologies. 
                  Specialized in modern frontend development practices and user experience design.
                </p>
              </div>

              <div className="flex-shrink-0">
                <div className="text-right">
                  <div className="inline-block px-4 py-2 bg-gradient-hero text-primary-foreground rounded-full font-medium shadow-elegant">
                    Graduate Degree
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;