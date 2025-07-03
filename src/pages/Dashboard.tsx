
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import QuickActions from "@/components/QuickActions";
import RecentPosts from "@/components/RecentPosts";
import DailyTip from "@/components/DailyTip";
import ProfileStatus from "@/components/ProfileStatus";

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Mock data - in a real app, this would come from API/database
  const dashboardData = {
    postsThisMonth: 8,
    engagementRate: 4.2,
    totalViews: 12500,
    scheduledPosts: 3
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E0E0E0]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              PostCrafter
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout} 
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-lg text-gray-300">
              Here's what's happening with your LinkedIn content
            </p>
          </div>

          {/* Stats Overview */}
          <DashboardStats {...dashboardData} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <QuickActions />
              <RecentPosts />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <ProfileStatus />
              <DailyTip />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
