
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$5",
      period: "/month",
      description: "Perfect for individuals getting started",
      features: [
        "8 AI-generated posts per month",
        "Basic templates and styles",
        "Google authentication",
        "Direct LinkedIn publishing",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$10",
      period: "/month",
      description: "Ideal for active professionals and businesses",
      features: [
        "Unlimited AI-generated posts",
        "Premium templates and styles",
        "Advanced customization options",
        "Priority support",
        "Analytics and insights",
        "Content scheduling",
        "Team collaboration"
      ],
      popular: true
    }
  ];

  return (
    <section className="py-20 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Simple, <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your content creation needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
              plan.popular 
                ? 'border-pink-500/50 shadow-pink-500/20 shadow-2xl' 
                : 'border-gray-700/50 hover:border-pink-500/30'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1 mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-lg mb-1">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 text-lg font-semibold rounded-full transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 hover:scale-105 shadow-lg hover:shadow-pink-500/25'
                    : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-pink-500/50'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400">
            All plans include a 7-day free trial. Cancel anytime, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
