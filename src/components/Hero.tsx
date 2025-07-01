import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
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
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-500/25">
              Start Creating Posts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            
          </div>
          
          
        </div>
      </div>
    </section>;
};
export default Hero;