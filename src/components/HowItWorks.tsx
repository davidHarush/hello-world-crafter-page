
import { LogIn, User, MessageSquare, Share2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <LogIn className="w-8 h-8" />,
      title: "Sign In with Google",
      description: "Quick and secure authentication to get you started in seconds"
    },
    {
      number: "02",
      icon: <User className="w-8 h-8" />,
      title: "Describe Yourself",
      description: "Tell us about your business, industry, and professional background"
    },
    {
      number: "03",
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Enter Your Prompt",
      description: "Describe what you want to post about and let AI do the magic"
    },
    {
      number: "04",
      icon: <Share2 className="w-8 h-8" />,
      title: "Review & Publish",
      description: "Approve your post and publish directly to LinkedIn or copy manually"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From idea to published post in just 4 simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{step.icon}</div>
                </div>
                <div className="absolute -top-2 -right-2 bg-gray-800 text-pink-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-pink-500">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
