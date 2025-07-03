import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ProfileData {
  linkedin_connected: boolean | null;
  subscription_plan: string | null;
  posts_this_month: number | null;
}

const ProfileCard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<ProfileData>({
    linkedin_connected: null,
    subscription_plan: null,
    posts_this_month: null
  });

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('linkedin_connected, subscription_plan, posts_this_month')
        .eq('id', user.id)
        .single();
      if (!error && data) setData(data);
    };
    load();
  }, [user]);

  const plan = data.subscription_plan || 'Free';

  return (
    <Card className="bg-gray-800/50 border-gray-700 rounded-3xl">
      <CardHeader>
        <CardTitle className="text-white text-lg">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.user_metadata?.avatar_url || ''} alt={user?.user_metadata?.full_name || 'User'} />
            <AvatarFallback className="bg-[#00BFA6] text-white">
              {user?.user_metadata?.full_name?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-white font-medium">{user?.user_metadata?.full_name || 'User'}</div>
            <div className="text-gray-400 text-sm">{user?.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {data.linkedin_connected ? (
            <CheckCircle className="text-[#00BFA6] w-4 h-4" />
          ) : (
            <AlertCircle className="text-amber-400 w-4 h-4" />
          )}
          <span className="text-gray-300">
            LinkedIn {data.linkedin_connected ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        <div className="text-gray-300 text-sm">{plan} Plan</div>
        {data.posts_this_month !== null && (
          <div className="text-xs text-gray-400">
            You've created {data.posts_this_month} posts this month
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
