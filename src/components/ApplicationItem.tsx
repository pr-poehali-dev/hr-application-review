import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Eye } from "lucide-react";

interface Application {
  id: string;
  fullName: string;
  purpose: string;
  department: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  details: string;
}

interface ApplicationItemProps {
  application: Application;
  onView: (application: Application) => void;
}

const ApplicationItem = ({ application, onView }: ApplicationItemProps) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  };

  const statusText = {
    pending: "На рассмотрении",
    approved: "Одобрено",
    rejected: "Отклонено"
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[application.status]}`}>
              {statusText[application.status]}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {application.date}
            </span>
          </div>
          <h3 className="text-lg font-medium">{application.fullName}</h3>
          <p className="text-gray-700">{application.purpose}</p>
          <p className="text-sm text-gray-500">{application.department}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1" 
          onClick={() => onView(application)}
        >
          <Eye className="h-4 w-4" />
          Просмотр
        </Button>
      </div>
    </Card>
  );
};

export default ApplicationItem;
