
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle } from "lucide-react";
import AppHeader from "../components/AppHeader";

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postLength, setPostLength] = useState('5');
  
  // Mock profile completeness check - in real app this would come from user data
  const isProfileIncomplete = true;



  const handleGenerate = () => {
    console.log('Generating post with:', { title, description, postLength });
    // TODO: Implement post generation logic
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Limit to approximately 60 characters
    if (value.length <= 60) {
      setTitle(value);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E0E0E0]">
      {/* Header */}
      <AppHeader
        showBack
        rightContent={
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-pink-500 text-white">U</AvatarFallback>
            </Avatar>
          </div>
        }
      />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Create New Post</h1>
            <p className="text-[#E0E0E0]">Generate engaging LinkedIn content with AI</p>
          </div>

          {/* Profile Incomplete Banner */}
          {isProfileIncomplete && (
            <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-amber-200 text-sm">
                  Complete your profile to improve post results
                </p>
                <Button 
                  variant="link" 
                  className="text-amber-400 hover:text-amber-300 p-0 h-auto font-medium text-sm mt-1"
                >
                  Update Profile →
                </Button>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-8">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white font-medium">
                Post Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Post title (max 6 words)"
                value={title}
                onChange={handleTitleChange}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-[#E0E0E0] rounded-lg focus:border-pink-500/30 focus:ring-pink-500/20"
              />
              <p className="text-xs text-[#E0E0E0]">
                {title.length}/60 characters
              </p>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what the post should say"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-[#E0E0E0] rounded-lg focus:border-pink-500/30 focus:ring-pink-500/20 resize-none"
              />
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

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!title.trim() || !description.trim()}
              className="w-full bg-gradient-to-r from-[#FF469D] to-[#FF0080] text-white font-semibold rounded-[24px] py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Post
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewPost;
