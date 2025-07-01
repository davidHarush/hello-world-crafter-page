import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, History, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  return <div className="min-h-screen bg-gray-900 text-white">
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
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-300 hover:text-white hover:bg-gray-800">
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
            <h1 className="text-4xl lg:text-5xl font-bold">
              Welcome back!
            </h1>
            <p className="text-xl text-gray-300">
              Ready to create your next viral LinkedIn post?
            </p>
          </div>

          {/* Primary Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <PlusCircle className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <CardTitle className="text-2xl text-white">Create New Post</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6">
                  Generate engaging LinkedIn content with AI in minutes
                </p>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-full py-3">
                  Start Creating
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <History className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-2xl text-white">Posts History</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6">
                  View, edit, and republish your previous posts
                </p>
                <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-full py-3">
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Status */}
          
        </div>
      </main>
    </div>;
};
export default Home;