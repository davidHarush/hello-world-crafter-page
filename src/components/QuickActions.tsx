
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Calendar, BarChart3, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Post",
      description: "Generate a new LinkedIn post with AI",
      icon: PlusCircle,
      color: "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600",
      onClick: () => navigate('/new-post'),
      primary: true
    },
    {
      title: "Schedule Post",
      description: "Plan your content calendar",
      icon: Calendar,
      color: "bg-gray-700 hover:bg-gray-600",
      onClick: () => console.log('Schedule post - TODO'),
      primary: false
    },
    {
      title: "Analytics",
      description: "View your performance",
      icon: BarChart3,
      color: "bg-gray-700 hover:bg-gray-600",
      onClick: () => console.log('Analytics - TODO'),
      primary: false
    },
    {
      title: "Settings",
      description: "Manage your preferences",
      icon: Settings,
      color: "bg-gray-700 hover:bg-gray-600",
      onClick: () => console.log('Settings - TODO'),
      primary: false
    }
  ];

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              className={`${action.color} text-white font-medium rounded-lg p-4 h-auto flex-col gap-2 transition-all duration-200`}
            >
              <action.icon className="h-5 w-5" />
              <div className="text-center">
                <div className="font-semibold">{action.title}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
