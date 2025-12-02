import { HomeLayout } from "./layout/HomeLayout";
import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NewsPage } from "./pages/NewsPage";
import { ProjectPage } from "./pages/ProjectPage";
import { PaperPage } from "./pages/PaperPage";
import { AwardPage } from "./pages/AwardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/paper" element={<PaperPage />} />
        <Route path="/award" element={<AwardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
