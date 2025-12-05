import { Navigate, Route, Routes } from "react-router";

import { AuthenticatedLayout } from "@/layout/AuthenticatedLayout";
import { AwardPage } from "@/pages/AwardPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NewsPage } from "@/pages/NewsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PaperPage } from "@/pages/PaperPage";
import { PatentPage } from "@/pages/PatentPage";
import { ProjectPage } from "@/pages/ProjectPage";
import { useAuthStore } from "@/store/useAuthStore";

export function Router() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Routes>
      {isAuthenticated
        ? (
            <Route path="/" element={<AuthenticatedLayout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="project" element={<ProjectPage />} />
              <Route path="paper" element={<PaperPage />} />
              <Route path="award" element={<AwardPage />} />
              <Route path="patent" element={<PatentPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          )
        : (
            <>
              <Route path="/" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
    </Routes>
  );
}
