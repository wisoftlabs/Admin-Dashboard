import { useState } from "react";

import { PaperCreateForm } from "@/components/paper/CreateDialog/PaperCreateForm";
import { PaperList } from "@/components/paper/PaperList";
import { PaperUpdateForm } from "@/components/paper/UpdateDialog/PaperUpdateForm";
import { Separator } from "@/components/ui/separator";
import type { Paper } from "@/lib/schemas/paper/paper";

export function PaperPage() {
  const [selectedId, setSelectedId] = useState<Paper["id"] | null>(null);

  const handleSelectPaper = (paperId: Paper["id"]) => {
    if (paperId === selectedId) return handleDeselect();

    setSelectedId(paperId);
  };

  const handleDeselect = () => {
    setSelectedId(null);
  };

  return (
    <div className="flex h-full space-x-2">
      <div className="w-3/5">
        <PaperList
          selectedPaperId={selectedId}
          onSelectPaper={handleSelectPaper}
        />
      </div>
      <Separator orientation="vertical" />
      <div className="w-2/5">
        {selectedId
          ? (
              <PaperUpdateForm
                selectedPaperId={selectedId}
                onDeleted={handleDeselect}
              />
            )
          : (
              <PaperCreateForm onSuccess={handleDeselect} />
            )}
      </div>
    </div>
  );
}
