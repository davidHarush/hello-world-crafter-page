import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
const Pricing = () => {
  const plans = [{
    name: "Starter",
    subtitle: "Perfect for individuals getting started",
    price: "$8/month",
    features: ["8 AI-generated posts per month", "Professional templates and tone options", "Google Sign-in", "Direct LinkedIn publishing"],
    highlight: false
  }, {
    name: "Pro",
    subtitle: "For professionals who post often",
    price: "$10/month",
    features: ["Unlimited AI-generated posts", "Professional templates and tone options", "Google Sign-in", "Direct LinkedIn publishing"],
    highlight: true
  }];
  return <section className="py-20 bg-[#0D0F1A] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Simple, <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-400">Choose the plan that fits your content creation needs</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {plans.map((plan, index) => <div key={index} className={`flex h-full flex-col rounded-2xl border p-8 shadow-md bg-[#2A2A2A] ${plan.highlight ? 'border-pink-500/60 shadow-pink-500/20' : 'border-gray-700/40'}`}>
              <div>
                <h3 className="text-2xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.subtitle}</p>
                <div className="text-4xl font-bold text-center mb-6">{plan.price}</div>
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-pink-500 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </li>)}
                </ul>
              </div>
              <div className="mt-auto pt-8">
                <Button className="w-full bg-pink-600 hover:bg-pink-500 text-white px-0 text-xl py-[24px]">Get Started</Button>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Pricing;