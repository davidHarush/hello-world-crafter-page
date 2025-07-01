import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { PlusCircle, History, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  // Temporary subscription data -- replace with real values
  const plan = "Starter";
  const postsRemaining = 3;
  return <div className="min-h-screen bg-[#1A1A1A] text-[#E0E0E0]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              PostCrafter
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-pink-500 text-white">U</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[#E0E0E0] hover:text-white hover:bg-gray-800">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Welcome back!
            </h1>
            <p className="text-xl text-[#E0E0E0]">
              Ready to create your next viral LinkedIn post?
            </p>
          </div>

          {/* Subscription Status */}
          <div className="mx-auto w-fit rounded-full bg-gray-800/70 px-4 py-2 text-sm text-[#E0E0E0]">
            {plan === "Pro" ? `You’re on the Pro plan – unlimited posts included` : `Starter plan – ${postsRemaining} out of 8 posts remaining this month`}
          </div>

          {/* Primary Actions */}
          <div className="grid items-stretch md:grid-cols-2 gap-6">
            <Card className="flex h-full flex-col bg-gray-800/50 border-gray-700 hover:border-pink-500/30 transition-all duration-300 hover:scale-105 px-6 py-8">
              <div className="flex flex-col flex-1 text-center">
                <PlusCircle className="w-12 h-12 text-pink-400 mb-4 mx-auto" />
                <CardTitle className="text-2xl font-bold mb-2 text-white">Create New Post</CardTitle>
                <p className="mb-6 text-[#E0E0E0]">Generate engaging LinkedIn content with AI in minutes</p>
                <div className="mt-auto">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-full py-3">Start Creating</Button>
                </div>
              </div>
            </Card>

            <Card className="flex h-full flex-col bg-gray-800/50 border-gray-700 hover:border-pink-500/30 transition-all duration-300 hover:scale-105 px-6 py-8">
              <div className="flex flex-col flex-1 text-center">
                <History className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
                <CardTitle className="text-2xl font-bold mb-2 text-white">Posts History</CardTitle>
                <p className="mb-6 text-[#E0E0E0]">View, edit, and republish your previous posts</p>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-full py-3">View History</Button>
                </div>
              </div>
            </Card>
          </div>
          
        </div>
      </main>
    </div>;
};
export default Home;