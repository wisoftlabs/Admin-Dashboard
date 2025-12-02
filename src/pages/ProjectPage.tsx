import { Separator } from "@/components/ui/separator";
import { ProjectList } from "@/components/project/ProjectList";
import { useState } from "react";
import type { Project } from "@/lib/schemas/project/project";
import { ProjectCreateForm } from "@/components/project/ProjectCreateForm";
import { ProjectUpdateForm } from "@/components/project/ProjectUpdateForm";

export function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject((prev) => (prev?.id === project.id ? null : project));
  };

  const handleDeselect = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex h-full space-x-2">
      <div className="w-3/5">
        <ProjectList
          selectedProject={selectedProject}
          onSelectProject={handleSelectProject}
        />
      </div>
      <Separator orientation="vertical" />
      <div className="w-2/5">
        {selectedProject ? (
          <ProjectUpdateForm selectedProject={selectedProject} onDeleted={handleDeselect} />
        ) : (
          <ProjectCreateForm onSuccess={handleDeselect} />
        )}
      </div>
    </div>
  );
}
