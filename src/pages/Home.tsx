import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, History, LogOut, CheckCircle, AlertCircle, Crown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
interface ProfileData {
  linkedin_connected: boolean;
  subscription_plan: string;
  subscription_status: string;
}
const Home = () => {
  const navigate = useNavigate();
  const {
    user,
    signOut
  } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    linkedin_connected: false,
    subscription_plan: 'free',
    subscription_status: 'active'
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const {
          data,
          error
        } = await supabase.from('profiles').select('linkedin_connected, subscription_plan, subscription_status').eq('id', user.id).single();
        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setProfileData({
            linkedin_connected: data.linkedin_connected || false,
            subscription_plan: data.subscription_plan || 'free',
            subscription_status: data.subscription_status || 'active'
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const handleCreatePost = () => {
    navigate('/new-post');
  };
  const handleViewHistory = () => {
    // TODO: Navigate to history page when implemented
    console.log('Navigate to history page');
  };
  const handleProfileClick = () => {
    // TODO: Navigate to edit profile page when it's built
    console.log('Navigate to edit profile - TODO');
  };
  const getPlanDisplayName = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'pro':
        return 'Pro';
      case 'starter':
        return 'Starter';
      default:
        return 'Free';
    }
  };
  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'pro':
        return 'text-yellow-400';
      case 'starter':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
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
                
                <AvatarFallback className="bg-pink-500 text-white">
                  {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
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
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-xl text-gray-300">
              Ready to create your next viral LinkedIn post?
            </p>
          </div>

          {/* Single Column Layout */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-gray-800/50 border-gray-700 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer" onClick={handleProfileClick}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* User Avatar */}
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.full_name || "User"} />
                      <AvatarFallback className="bg-pink-500 text-white text-lg">
                        {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="space-y-1">
                      <h3 className="text-white font-semibold text-lg">
                        {user?.user_metadata?.full_name || 'User'}
                      </h3>
                      <p className="text-gray-400 text-sm">{user?.email}</p>
                      
                      {/* Status Indicators */}
                      <div className="flex items-center gap-4 mt-2">
                        {/* LinkedIn Status */}
                        <div className="flex items-center gap-1">
                          {profileData.linkedin_connected ? <CheckCircle className="h-4 w-4 text-green-400" /> : <AlertCircle className="h-4 w-4 text-amber-400" />}
                          <span className="text-xs text-gray-300">
                            LinkedIn {profileData.linkedin_connected ? 'Connected' : 'Not Connected'}
                          </span>
                        </div>

                        {/* Subscription Plan */}
                        <div className="flex items-center gap-1">
                          {profileData.subscription_plan !== 'free' && <Crown className="h-4 w-4 text-yellow-400" />}
                          <span className={`text-xs font-medium ${getPlanColor(profileData.subscription_plan)}`}>
                            {getPlanDisplayName(profileData.subscription_plan)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </CardContent>
            </Card>

            {/* Create New Post Card */}
            <Card className="bg-gray-800/50 border-gray-700 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <PlusCircle className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <CardTitle className="text-2xl text-white">Create New Post</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6">
                  Generate engaging LinkedIn content with AI in minutes
                </p>
                <Button onClick={handleCreatePost} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-full py-3">
                  Start Creating
                </Button>
              </CardContent>
            </Card>

            {/* Posts History Card */}
            <Card className="bg-gray-800/50 border-gray-700 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <History className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-2xl text-white">Posts History</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6">
                  View, edit, and republish your previous posts
                </p>
                <Button onClick={handleViewHistory} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-full py-3">
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>;
};
export default Home;