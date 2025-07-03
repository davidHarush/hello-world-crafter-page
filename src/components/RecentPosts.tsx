
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Heart, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  hashtags: string;
}

const RecentPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching posts:', error);
        } else {
          setPosts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-300">Loading posts...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-lg">Recent Posts</CardTitle>
        <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">No posts yet</div>
            <Button 
              onClick={() => window.location.href = '/new-post'}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Create Your First Post
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{post.title}</h4>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  {truncateContent(post.content || '')}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{formatDate(post.created_at)}</span>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>--</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>--</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>--</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentPosts;
