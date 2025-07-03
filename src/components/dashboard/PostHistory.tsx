import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string | null;
  created_at: string | null;
}

const PostHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('posts')
        .select('id,title,content,created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);
      if (!error && data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [user]);

  const formatDate = (date: string | null) =>
    date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';

  const truncate = (text: string, len = 60) =>
    text.length <= len ? text : text.slice(0, len) + '...';

  const handleCopy = (content: string | null) => {
    if (content) navigator.clipboard.writeText(content);
  };

  if (loading) {
    return (
      <Card className="bg-gray-800/50 border-gray-700 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-white text-lg">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 rounded-3xl">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-white text-lg">Recent Posts</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/posts')}
          className="text-[#00BFA6] hover:text-[#00d7be]"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p className="text-gray-300">No posts yet.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-700/30 rounded-lg p-3 flex justify-between items-start"
              >
                <div>
                  <h4 className="text-white font-medium">
                    {truncate(post.title || 'Untitled')}
                  </h4>
                  <div className="text-xs text-gray-400">
                    {formatDate(post.created_at)} · Published
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-gray-300 hover:text-red-500">
                    <Trash className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-gray-300 hover:text-white"
                    onClick={() => handleCopy(post.content)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostHistory;
