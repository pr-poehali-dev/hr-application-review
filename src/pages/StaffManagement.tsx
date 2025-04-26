import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FileEdit, User, Calendar, Building, FileText, Briefcase } from "lucide-react";

interface Application {
  id: string;
  fullName: string;
  purpose: string;
  department: string;
  position: string;
  date: string;
  status: "new" | "approved" | "rejected";
  details: string;
}

const mockApplications: Application[] = [
  {
    id: "1",
    fullName: "Иванов Иван Иванович",
    purpose: "Прием на работу",
    department: "Кафедра информатики",
    position: "Доцент",
    date: "25.04.2025",
    status: "new",
    details: "Кандидат технических наук, стаж преподавания 5 лет. Область интересов: искусственный интеллект, машинное обучение."
  },
  {
    id: "2",
    fullName: "Петрова Ольга Сергеевна",
    purpose: "Перевод",
    department: "Кафедра математики",
    position: "Старший преподаватель",
    date: "24.04.2025",
    status: "new",
    details: "Заявка на перевод с кафедры физики. Опыт работы в университете 7 лет."
  },
  {
    id: "3",
    fullName: "Сидоров Петр Алексеевич",
    purpose: "Увольнение",
    department: "Кафедра физики",
    position: "Профессор",
    date: "23.04.2025",
    status: "new",
    details: "Причина увольнения: переезд в другой город. Отработал в университете 10 лет."
  },
  {
    id: "4",
    fullName: "Кузнецова Мария Дмитриевна",
    purpose: "Продление контракта",
    department: "Кафедра иностранных языков",
    position: "Ассистент",
    date: "22.04.2025",
    status: "new",
    details: "Просьба о продлении контракта на 3 года. Преподаватель английского языка."
  }
];

const StaffManagement = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleApplicationAction = (id: string, action: "approve" | "reject") => {
    setApplications(applications.map(app => 
      app.id === id 
        ? { ...app, status: action === "approve" ? "approved" : "rejected" } 
        : app
    ));
    setIsDialogOpen(false);
  };

  const newApplications = applications.filter(app => app.status === "new");
  const approvedApplications = applications.filter(app => app.status === "approved");
  const rejectedApplications = applications.filter(app => app.status === "rejected");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Управление заявками сотрудников</h1>
      
      {/* Навигация и фильтры слева/сверху */}
      <div className="mb-6">
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="w-full flex justify-start mb-4">
            <TabsTrigger value="new" className="relative">
              Новые заявки
              {newApplications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {newApplications.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Одобренные</TabsTrigger>
            <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
          </TabsList>
          
          {/* Список заявок - новые */}
          <TabsContent value="new" className="space-y-4">
            {newApplications.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Нет новых заявок</p>
            ) : (
              newApplications.map(application => (
                <Card key={application.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Новая
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
                      onClick={() => handleViewApplication(application)}
                    >
                      <FileEdit className="h-4 w-4" />
                      Просмотреть
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
          
          {/* Список заявок - одобренные */}
          <TabsContent value="approved" className="space-y-4">
            {approvedApplications.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Нет одобренных заявок</p>
            ) : (
              approvedApplications.map(application => (
                <Card key={application.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Одобрена
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
                      onClick={() => handleViewApplication(application)}
                    >
                      <FileEdit className="h-4 w-4" />
                      Просмотреть
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
          
          {/* Список заявок - отклоненные */}
          <TabsContent value="rejected" className="space-y-4">
            {rejectedApplications.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Нет отклоненных заявок</p>
            ) : (
              rejectedApplications.map(application => (
                <Card key={application.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Отклонена
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
                      onClick={() => handleViewApplication(application)}
                    >
                      <FileEdit className="h-4 w-4" />
                      Просмотреть
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Модальное окно для просмотра заявки */}
      {selectedApplication && (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Заявка №{selectedApplication.id}</DialogTitle>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">ФИО сотрудника</p>
                  <p className="font-medium">{selectedApplication.fullName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Цель заявки</p>
                  <p className="font-medium">{selectedApplication.purpose}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Подразделение</p>
                  <p className="font-medium">{selectedApplication.department}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Должность</p>
                  <p className="font-medium">{selectedApplication.position}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Дата подачи</p>
                  <p className="font-medium">{selectedApplication.date}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Дополнительная информация</p>
                <p className="text-gray-700">{selectedApplication.details}</p>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              {selectedApplication.status === "new" ? (
                <>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Отмена
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleApplicationAction(selectedApplication.id, "reject")}
                  >
                    Отклонить
                  </Button>
                  <Button 
                    onClick={() => handleApplicationAction(selectedApplication.id, "approve")}
                  >
                    Одобрить
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={handleCloseDialog}>
                  Закрыть
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StaffManagement;
