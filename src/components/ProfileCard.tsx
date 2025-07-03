
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, AlertCircle, Crown, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  linkedin_connected: boolean;
  subscription_plan: string;
  subscription_status: string;
}

const ProfileCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        const { data, error } = await supabase
          .from('profiles')
          .select('linkedin_connected, subscription_plan, subscription_status')
          .eq('id', user.id)
          .single();

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

  if (loading) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <div className="text-gray-300">Loading profile...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-200 cursor-pointer group"
      onClick={handleProfileClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <Avatar className="w-16 h-16">
              <AvatarImage 
                src={user?.user_metadata?.avatar_url || ""} 
                alt={user?.user_metadata?.full_name || "User"} 
              />
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
                  {profileData.linkedin_connected ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-400" />
                  )}
                  <span className="text-xs text-gray-300">
                    LinkedIn {profileData.linkedin_connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>

                {/* Subscription Plan */}
                <div className="flex items-center gap-1">
                  {profileData.subscription_plan !== 'free' && (
                    <Crown className="h-4 w-4 text-yellow-400" />
                  )}
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
  );
};

export default ProfileCard;
