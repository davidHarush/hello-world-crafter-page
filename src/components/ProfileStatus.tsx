
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, AlertCircle, ExternalLink, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  linkedin_connected: boolean;
  subscription_plan: string;
  subscription_status: string;
  posts_this_month: number;
}

const ProfileStatus = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    linkedin_connected: false,
    subscription_plan: 'free',
    subscription_status: 'active',
    posts_this_month: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('linkedin_connected, subscription_plan, subscription_status, posts_this_month')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setProfileData({
            linkedin_connected: data.linkedin_connected || false,
            subscription_plan: data.subscription_plan || 'free',
            subscription_status: data.subscription_status || 'active',
            posts_this_month: data.posts_this_month || 0
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

  const handleConnectLinkedIn = () => {
    // TODO: Implement LinkedIn OAuth connection
    console.log('Connect LinkedIn - TODO');
  };

  const handleUpgradePlan = () => {
    // TODO: Implement subscription upgrade
    console.log('Upgrade plan - TODO');
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

  const isPremium = profileData.subscription_plan !== 'free';
  const monthlyLimit = isPremium ? 100 : 10;
  const usagePercentage = (profileData.posts_this_month / monthlyLimit) * 100;

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          Profile Status
          {isPremium && <Crown className="h-4 w-4 text-yellow-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.full_name || "User"} />
            <AvatarFallback className="bg-pink-500 text-white">
              {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-white font-medium">
              {user?.user_metadata?.full_name || 'User'}
            </div>
            <div className="text-gray-400 text-sm">{user?.email}</div>
          </div>
        </div>

        {/* LinkedIn Connection */}
        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
          <div className="flex items-center gap-2">
            {profileData.linkedin_connected ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-400" />
            )}
            <span className="text-white text-sm">LinkedIn</span>
          </div>
          {!profileData.linkedin_connected ? (
            <Button
              size="sm"
              onClick={handleConnectLinkedIn}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Connect
            </Button>
          ) : (
            <span className="text-green-400 text-sm">Connected</span>
          )}
        </div>

        {/* Subscription Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">Plan</span>
            <span className={`text-sm font-medium ${isPremium ? 'text-yellow-400' : 'text-gray-400'}`}>
              {profileData.subscription_plan.charAt(0).toUpperCase() + profileData.subscription_plan.slice(1)}
            </span>
          </div>
          
          {/* Usage Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Posts this month</span>
              <span>{profileData.posts_this_month}/{monthlyLimit}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  usagePercentage >= 90 ? 'bg-red-500' : 
                  usagePercentage >= 70 ? 'bg-amber-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
          </div>
          
          {!isPremium && (
            <Button
              size="sm"
              onClick={handleUpgradePlan}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <Crown className="h-3 w-3 mr-1" />
              Upgrade Plan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStatus;
