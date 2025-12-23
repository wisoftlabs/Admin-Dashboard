import { useState } from "react";

import { AwardList } from "@/components/award/AwardList";
import { AwardCreateForm } from "@/components/award/CreateDialog/AwardCreateForm";
import { AwardUpdateForm } from "@/components/award/UpdateDialog/AwardUpdateForm";
import { Separator } from "@/components/ui/separator";
import type { Award } from "@/lib/schemas/award/award";

export function AwardPage() {
  const [selectedId, setSelectedId] = useState<Award["id"] | null>(null);

  const handleSelectAward = (awardId: Award["id"]) => {
    if (awardId === selectedId) return handleDeselect();

    setSelectedId(awardId);
  };

  const handleDeselect = () => {
    setSelectedId(null);
  };

  return (
    <div className="flex h-full space-x-2">
      <div className="w-3/5">
        <AwardList
          selectedAwardId={selectedId}
          onSelectAward={handleSelectAward}
        />
      </div>
      <Separator orientation="vertical" />
      <div className="w-2/5">
        {selectedId
          ? (
              <AwardUpdateForm
                selectedAwardId={selectedId}
                onDeleted={handleDeselect}
              />
            )
          : (
              <AwardCreateForm onSuccess={handleDeselect} />
            )}
      </div>
    </div>
  );
}
