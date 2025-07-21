import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/10 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-60 h-60 bg-gradient-hero rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-accent rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to take your frontend project to the next level? 
              Let's discuss how we can create exceptional user experiences together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <a
              href="mailto:saketh@example.com"
              className="group p-8 rounded-2xl bg-gradient-card shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-hero shadow-elegant group-hover:animate-glow">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-foreground">Email Me</h3>
                  <p className="text-muted-foreground">Quick response guaranteed</p>
                </div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/saketh-dasavathini"
              className="group p-8 rounded-2xl bg-gradient-card shadow-card hover:shadow-hover transition-all duration-500 animate-fade-in hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-hero shadow-elegant group-hover:animate-glow">
                  <Linkedin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-foreground">LinkedIn</h3>
                  <p className="text-muted-foreground">Professional networking</p>
                </div>
              </div>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="group">
              Start a Conversation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary/40">
              View GitHub Profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;