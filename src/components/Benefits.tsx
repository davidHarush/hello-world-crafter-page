
import { TrendingUp, Clock, Lightbulb, Users, Zap, Target } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Boost Engagement",
      description: "Generate posts that get more likes, comments, and shares with AI-optimized content"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Save Hours Weekly",
      description: "Create professional posts in minutes instead of spending hours brainstorming"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Beat Writer's Block",
      description: "Never run out of content ideas with AI-powered suggestions tailored to your industry"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Grow Your Network",
      description: "Attract more connections and opportunities with consistently high-quality content"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "One-Click Publishing",
      description: "Publish directly to LinkedIn or copy content with a single click"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personal Branding",
      description: "Build your professional reputation with content that reflects your expertise"
    }
  ];

  return (
    <section className="py-20 bg-[#1A1A1A] text-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">PostCrafter</span>?
          </h2>
          <p className="text-xl text-[#E0E0E0] max-w-2xl mx-auto">
            Transform your LinkedIn presence and grow your professional network with AI-powered content creation
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-pink-400 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
              <p className="leading-relaxed text-[#E0E0E0]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
