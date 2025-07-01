
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-2 text-pink-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered LinkedIn Content
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Create <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Viral</span> LinkedIn Posts in Minutes
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stop struggling with writer's block. PostCrafter uses AI to generate high-quality, engaging LinkedIn posts that get noticed and drive results for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-500/25"
            >
              Start Creating Posts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-gray-400 text-sm">
              Sign in with Google • No credit card required
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div>Posts Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2K+</div>
              <div>Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">95%</div>
              <div>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
