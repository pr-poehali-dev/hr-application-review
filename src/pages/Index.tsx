import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 color-black text-black">Добро пожаловать!</h1>
        <p className="text-xl text-gray-600 mb-6">Система управления кадрами кафедры</p>
        <div className="space-x-4">
          <Button asChild>
            <Link to="/hr">Перейти в отдел кадров</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/staff">Управление заявками</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
