import { useState } from "react";

import { PatentCreateForm } from "@/components/patent/CreateDialog/PatentCreateForm";
import { PatentList } from "@/components/patent/PatentList";
import { PatentUpdateForm } from "@/components/patent/UpdateDialog/PatentUpdateForm";
import { Separator } from "@/components/ui/separator";
import type { Patent } from "@/lib/schemas/patent/patent";

export function PatentPage() {
  const [selectedId, setSelectedId] = useState<Patent["id"] | null>(null);

  const handleSelectPatent = (patentId: Patent["id"]) => {
    if (patentId === selectedId) return handleDeselect();

    setSelectedId(patentId);
  };

  const handleDeselect = () => {
    setSelectedId(null);
  };

  return (
    <div className="flex h-full space-x-2">
      <div className="w-3/5">
        <PatentList
          selectedPatentId={selectedId}
          onSelectPatent={handleSelectPatent}
        />
      </div>
      <Separator orientation="vertical" />
      <div className="w-2/5">
        {selectedId
          ? (
              <PatentUpdateForm
                selectedPatentId={selectedId}
                onDeleted={handleDeselect}
              />
            )
          : (
              <PatentCreateForm onSuccess={handleDeselect} />
            )}
      </div>
    </div>
  );
}
