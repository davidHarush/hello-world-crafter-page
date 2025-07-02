
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
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ 
        error: 'Authorization header missing' 
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract the token from Bearer token
    const token = authHeader.replace('Bearer ', '');
    
    // Create Supabase client with the user's access token
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, token);

    // Verify the user's session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth verification failed:', authError);
      return new Response(JSON.stringify({ 
        error: 'Invalid or expired session' 
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { userId, title, description, length, audience, tone } = await req.json();
    
    // Verify the userId matches the authenticated user
    if (userId !== user.id) {
      return new Response(JSON.stringify({ 
        error: 'User ID mismatch' 
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating post for user:', userId);
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Length:', length);
    console.log('Audience:', audience);
    console.log('Tone:', tone);

    // Create a mock response for now (you can integrate with OpenAI later)
    const generatedPost = {
      "post title": title,
      "post content": `${description}\n\n${'Here is some engaging content that would be perfect for LinkedIn. '.repeat(parseInt(length) || 5)}\n\nThis post is designed to drive engagement and showcase your expertise in your field.`,
      "Hashtags": ["#LinkedIn", "#Professional", "#Success", "#Growth", "#Business"]
    };

    // Use service role key for database operations
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Save the generated post to the database
    const { data: savedPost, error: saveError } = await supabaseAdmin
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
