
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, title, description, length } = await req.json();
    
    console.log('Generating post for user:', userId);
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Length:', length);

    // Create a mock response for now (you can integrate with OpenAI later)
    const generatedPost = {
      "post title": title,
      "post content": `${description}\n\n${'Here is some engaging content that would be perfect for LinkedIn. '.repeat(parseInt(length) || 5)}\n\nThis post is designed to drive engagement and showcase your expertise in your field.`,
      "Hashtags": ["#LinkedIn", "#Professional", "#Success", "#Growth", "#Business"]
    };

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save the generated post to the database
    const { data: savedPost, error: saveError } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        title: generatedPost["post title"],
        description: description,
        content: generatedPost["post content"],
        hashtags: generatedPost["Hashtags"].join(','),
        generated: new Date().toISOString()
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving post:', saveError);
      throw new Error('Failed to save generated post');
    }

    console.log('Post saved successfully:', savedPost.id);

    return new Response(JSON.stringify({
      output: generatedPost,
      id: savedPost.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-post function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate post' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
