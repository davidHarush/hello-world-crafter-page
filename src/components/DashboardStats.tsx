
import { Users, TrendingUp, MessageSquare, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  postsThisMonth: number;
  engagementRate: number;
  totalViews: number;
  scheduledPosts: number;
}

const DashboardStats = ({ postsThisMonth, engagementRate, totalViews, scheduledPosts }: DashboardStatsProps) => {
  const stats = [
    {
      title: "Posts This Month",
      value: postsThisMonth,
      icon: MessageSquare,
      color: "text-pink-400"
    },
    {
      title: "Engagement Rate",
      value: `${engagementRate}%`,
      icon: TrendingUp,
      color: "text-green-400"
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "Scheduled Posts",
      value: scheduledPosts,
      icon: Calendar,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
