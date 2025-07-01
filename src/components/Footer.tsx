import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Twitter, Mail } from "lucide-react";
const Footer = () => {
  return <footer className="bg-black">
      {/* CTA Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Transform Your 
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"> LinkedIn Presence</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of professionals who are already creating viral content with PostCrafter
            </p>
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-500/25 text-xl px-[32px] py-[32px]">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              PostCrafter
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              AI-powered LinkedIn content creation tool that helps professionals and businesses create viral posts in minutes.
            </p>
            <div className="flex gap-4">
              
              
              
            </div>
          </div>
          
          
          
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              
              <li><a href="#" className="hover:text-pink-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PostCrafter. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;