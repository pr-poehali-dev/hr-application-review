import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Calendar, Building, User, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Application {
  id: string;
  fullName: string;
  purpose: string;
  department: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  details: string;
}

interface ApplicationModalProps {
  isOpen: boolean;
  application: Application;
  onClose: () => void;
  onAction: (id: string, action: "approve" | "reject") => void;
}

const ApplicationModal = ({
  isOpen,
  application,
  onClose,
  onAction
}: ApplicationModalProps) => {
  const isPending = application.status === "pending";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Заявка №{application.id}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">ФИО сотрудника</p>
              <p className="font-medium">{application.fullName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Цель заявки</p>
              <p className="font-medium">{application.purpose}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Подразделение</p>
              <p className="font-medium">{application.department}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Дата подачи</p>
              <p className="font-medium">{application.date}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Дополнительная информация</p>
            <p className="text-gray-700">{application.details}</p>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          {isPending ? (
            <>
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => onAction(application.id, "reject")}
              >
                Отклонить
              </Button>
              <Button 
                onClick={() => onAction(application.id, "approve")}
              >
                Одобрить
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Закрыть
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
