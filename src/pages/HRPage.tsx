import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicationItem from "@/components/ApplicationItem";
import ApplicationModal from "@/components/ApplicationModal";

interface Application {
  id: string;
  fullName: string;
  purpose: string;
  department: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  details: string;
}

const mockApplications: Application[] = [
  {
    id: "1",
    fullName: "Иванов Иван Иванович",
    purpose: "Прием на должность доцента",
    department: "Кафедра информатики",
    date: "24.04.2025",
    status: "pending",
    details: "Кандидат технических наук, опыт преподавания 5 лет. Предыдущее место работы - МГТУ."
  },
  {
    id: "2",
    fullName: "Петрова Мария Сергеевна",
    purpose: "Перевод на другую должность",
    department: "Кафедра математики",
    date: "23.04.2025",
    status: "pending",
    details: "Старший преподаватель, стаж работы в вузе 7 лет. Желает перейти на кафедру информатики."
  },
  {
    id: "3",
    fullName: "Сидоров Алексей Петрович",
    purpose: "Увольнение",
    department: "Кафедра физики",
    date: "22.04.2025",
    status: "pending",
    details: "Доцент, стаж работы 10 лет. Причина увольнения - переезд в другой город."
  },
  {
    id: "4",
    fullName: "Козлова Анна Дмитриевна",
    purpose: "Продление контракта",
    department: "Кафедра истории",
    date: "21.04.2025",
    status: "pending",
    details: "Ассистент, стаж работы 3 года. Желает продлить контракт на 2 года."
  },
  {
    id: "5",
    fullName: "Николаев Сергей Александрович",
    purpose: "Изменение нагрузки",
    department: "Кафедра информатики",
    date: "20.04.2025",
    status: "pending",
    details: "Профессор, стаж работы 15 лет. Просит уменьшить нагрузку в связи с научной работой."
  }
];

const HRPage = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplicationAction = (id: string, action: "approve" | "reject") => {
    setApplications(applications.map(app => 
      app.id === id 
        ? { ...app, status: action === "approve" ? "approved" : "rejected" } 
        : app
    ));
    setIsModalOpen(false);
  };

  const pendingApplications = applications.filter(app => app.status === "pending");
  const approvedApplications = applications.filter(app => app.status === "approved");
  const rejectedApplications = applications.filter(app => app.status === "rejected");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Система управления заявками отдела кадров</h1>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending" className="relative">
            Новые заявки
            {pendingApplications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {pendingApplications.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Одобренные</TabsTrigger>
          <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {pendingApplications.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Нет новых заявок</p>
          ) : (
            pendingApplications.map(application => (
              <ApplicationItem 
                key={application.id}
                application={application}
                onView={handleViewApplication}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          {approvedApplications.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Нет одобренных заявок</p>
          ) : (
            approvedApplications.map(application => (
              <ApplicationItem 
                key={application.id}
                application={application}
                onView={handleViewApplication}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-4">
          {rejectedApplications.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Нет отклоненных заявок</p>
          ) : (
            rejectedApplications.map(application => (
              <ApplicationItem 
                key={application.id}
                application={application}
                onView={handleViewApplication}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      {selectedApplication && (
        <ApplicationModal
          isOpen={isModalOpen}
          application={selectedApplication}
          onClose={handleCloseModal}
          onAction={handleApplicationAction}
        />
      )}
    </div>
  );
};

export default HRPage;
