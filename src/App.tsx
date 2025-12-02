import { AuthenticatedLayout } from "@/layout/AuthenticatedLayout";
import { Route, Routes, Navigate } from "react-router";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NewsPage } from "./pages/NewsPage";
import { ProjectPage } from "./pages/ProjectPage";
import { PaperPage } from "./pages/PaperPage";
import { AwardPage } from "./pages/AwardPage";
import { LoginPage } from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <Toaster position="top-center"/>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<AuthenticatedLayout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="project" element={<ProjectPage />} />
            <Route path="paper" element={<PaperPage />} />
            <Route path="award" element={<AwardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
