"use client";

import { useGrades } from "@/hooks/use-student";
import { FinalGradeCard } from "@/components/grading/FinalGradeCard";
import { PanelistScoresCard } from "@/components/grading/PanelistScoresCard";
import { GradesSkeleton } from "@/components/grading/GradesSkeleton";

export default function GradesPage() {
  const { data: grades, isPending } = useGrades();

  if (isPending) return <GradesSkeleton />;
  if (!grades) return null;

  const isReleased = grades.status === "released";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">Grades</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Panelist scores, final grade, and evaluation remarks
        </p>
      </div>

      <FinalGradeCard finalGrade={grades.finalGrade} isReleased={isReleased} />
      <PanelistScoresCard scores={grades.panelistScores} isReleased={isReleased} />
    </div>
  );
}
