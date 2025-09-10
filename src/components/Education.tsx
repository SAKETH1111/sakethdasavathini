import { GraduationCap, MapPin } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Education = () => {
  const { ref: eduRef, isVisible: isEduVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={eduRef} className="py-24 bg-gradient-to-br from-blue-50/80 to-slate-100/60 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Winter-style header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isEduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
              Education
            </h2>
            <p className="text-xl text-blue-700">
              Building a strong foundation in computer science
            </p>
          </div>

          {/* Winter-style education card */}
          <div className={`relative transition-all duration-1000 ${
            isEduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-slate-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                    Master's in Computer Science
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 font-medium text-lg mb-6">
                    <MapPin className="h-5 w-5" />
                    <span>University of Texas at Dallas (UTD)</span>
                  </div>
                  <p className="text-blue-700 leading-relaxed text-lg">
                    Advanced coursework in software engineering, algorithms, and web technologies. 
                    Specialized in modern frontend development practices and user experience design.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <div className="text-right">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-slate-600 text-white rounded-full font-medium shadow-lg">
                      Graduate Degree
                    </div>
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