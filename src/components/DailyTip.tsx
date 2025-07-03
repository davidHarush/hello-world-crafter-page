
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const DailyTip = () => {
  const [tip, setTip] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const fetchRandomTip = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('daily_tips')
        .select('tip_text')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tip:', error);
        setTip('💡 Use emojis to catch attention in the first 3 lines');
      } else if (data && data.length > 0) {
        // Get a random tip
        const randomIndex = Math.floor(Math.random() * data.length);
        setTip(data[randomIndex].tip_text);
      }
    } catch (error) {
      console.error('Error:', error);
      setTip('💡 Use emojis to catch attention in the first 3 lines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomTip();
  }, []);

  return (
    <Card className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-700/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-400" />
          <CardTitle className="text-amber-200 text-lg">Daily Tip</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchRandomTip}
          disabled={loading}
          className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-amber-100 leading-relaxed">
          {loading ? 'Loading tip...' : tip}
        </p>
      </CardContent>
    </Card>
  );
};

export default DailyTip;
