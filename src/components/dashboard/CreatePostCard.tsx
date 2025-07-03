import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const CreatePostCard = () => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate('/create')}
      className="cursor-pointer bg-gray-800/50 border-gray-700 hover:border-[#00BFA6] rounded-3xl h-40 flex items-center justify-center"
    >
      <CardContent className="flex items-center gap-3">
        <Plus className="w-6 h-6 text-[#00BFA6]" />
        <span className="text-xl text-white font-medium">Start Creating</span>
      </CardContent>
    </Card>
  );
};

export default CreatePostCard;
