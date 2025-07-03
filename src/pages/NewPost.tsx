import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
const NewPost = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    user,
    session
  } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postLength, setPostLength] = useState('5');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audience, setAudience] = useState('General');
  const [tone, setTone] = useState('Professional');

  // Mock profile completeness check - in real app this would come from user data
  const isProfileIncomplete = true;
  const handleBack = () => {
    navigate('/home');
  };
  const handleGenerate = async () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and description fields.",
        variant: "destructive"
      });
      return;
    }

    // Check if user is authenticated
    if (!session || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to generate posts.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
    setIsGenerating(true);
    try {
      console.log('Generating post with:', {
        title,
        description,
        postLength,
        audience,
        tone
      });
      console.log('User ID:', user.id);
      console.log("Access token:", session.access_token);
      const response = await fetch("https://zgjiibivucwjtzjelcde.supabase.co/functions/v1/generate-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnamlpYml2dWN3anR6amVsY2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjU2MTEsImV4cCI6MjA2NjUwMTYxMX0.kxunwr8SvRTup1DaSbqEn4fD4cdY9WHCch2SdtBch_o"
        },
        body: JSON.stringify({
          userId: user.id,
          title: title.trim(),
          description: description.trim(),
          length: parseInt(postLength),
          audience,
          tone
        })
      });
      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401 || response.status === 403) {
          const errorData = await response.json();
          toast({
            title: "Authentication Error",
            description: errorData.error || "Your session has expired. Please log in again.",
            variant: "destructive"
          });
          console.error("Auth error:", errorData);
          await supabase.auth.signOut();
          navigate('/');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Generated post:', data);
      toast({
        title: "Post Generated Successfully!",
        description: "Your LinkedIn post has been created and saved."
      });

      // Optional navigation to post preview
      // navigate(`/post/${data.id}`);
    } catch (error) {
      console.error('Error generating post:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Limit to approximately 60 characters
    if (value.length <= 60) {
      setTitle(value);
    }
  };
  return <div className="min-h-screen bg-[#1A1A1A] text-[#E0E0E0]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBack} className="text-[#E0E0E0] hover:text-white hover:bg-gray-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                PostCrafter
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10">
                
                <AvatarFallback className="bg-pink-500 text-white">
                  {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Create New Post</h1>
            <p className="text-[#E0E0E0]">Generate engaging LinkedIn content with AI</p>
          </div>

          {/* Profile Incomplete Banner */}
          {isProfileIncomplete && <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-amber-200 text-sm">
                  Complete your profile to improve post results
                </p>
                <Button variant="link" className="text-amber-400 hover:text-amber-300 p-0 h-auto font-medium text-sm mt-1">
                  Update Profile →
                </Button>
              </div>
            </div>}

          {/* Form */}
          <div className="space-y-8">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white font-medium">
                Post Title
              </Label>
              <Input id="title" type="text" placeholder="Post title (max 6 words)" value={title} onChange={handleTitleChange} className="bg-gray-800/50 border-gray-700 text-white placeholder:text-[#E0E0E0] rounded-lg focus:border-pink-500/30 focus:ring-pink-500/20" />
              <p className="text-xs text-[#E0E0E0]">
                {title.length}/60 characters
              </p>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white font-medium">
                Description
              </Label>
              <Textarea id="description" placeholder="Describe what the post should say" value={description} onChange={e => setDescription(e.target.value)} rows={5} className="bg-gray-800/50 border-gray-700 text-white placeholder:text-[#E0E0E0] rounded-lg focus:border-pink-500/30 focus:ring-pink-500/20 resize-none" />
            </div>

            {/* Post Length Selector */}
            <div className="space-y-2">
              <Label htmlFor="post-length" className="text-white font-medium">
                Post Length
              </Label>
              <Select value={postLength} onValueChange={setPostLength}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-lg focus:border-pink-500/30 focus:ring-pink-500/20">
                  <SelectValue placeholder="Select post length" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="4">4 paragraphs</SelectItem>
                  <SelectItem value="5">5 paragraphs</SelectItem>
                  <SelectItem value="6">6 paragraphs</SelectItem>
                  <SelectItem value="7">7 paragraphs</SelectItem>
                  <SelectItem value="8">8 paragraphs</SelectItem>
                  <SelectItem value="9">9 paragraphs</SelectItem>
                  <SelectItem value="10">10 paragraphs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Audience Selector */}
            <div className="space-y-2">
              <Label htmlFor="audience" className="text-white font-medium">
                Audience
              </Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-lg focus:border-pink-500/30 focus:ring-pink-500/20">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Tech Professionals">Tech Professionals</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Founders">Founders</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Tone Selector */}
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-white font-medium">
                Tone
              </Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-lg focus:border-pink-500/30 focus:ring-pink-500/20">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Inspiring">Inspiring</SelectItem>
                  <SelectItem value="Funny">Funny</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button onClick={handleGenerate} disabled={!title.trim() || !description.trim() || isGenerating} className="w-full bg-gradient-to-r from-[#FF469D] to-[#FF0080] text-white font-semibold rounded-[24px] py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {isGenerating ? <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Post...
                </> : 'Generate Post'}
            </Button>
          </div>
        </div>
      </main>
    </div>;
};
export default NewPost;