"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentMockData } from "@/lib/mock-data/student";
import type { TaskStatus } from "@/types/student";

export const studentKeys = {
  all: ["student"] as const,
  overview: () => [...studentKeys.all, "overview"] as const,
  submissions: () => [...studentKeys.all, "submissions"] as const,
  consultations: () => [...studentKeys.all, "consultations"] as const,
  notifications: () => [...studentKeys.all, "notifications"] as const,
  group: () => [...studentKeys.all, "group"] as const,
  advisers: () => [...studentKeys.all, "advisers"] as const,
  defense: () => [...studentKeys.all, "defense"] as const,
  grades: () => [...studentKeys.all, "grades"] as const,
};

// ── Overview (dashboard home) ──────────────────────────────────
export function useStudentOverview() {
  return useQuery({
    queryKey: studentKeys.overview(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300)); // simulate network
      return studentMockData.overview;
    },
    staleTime: 30_000,
  });
}

// ── Submissions ────────────────────────────────────────────────
export function useSubmissions() {
  return useQuery({
    queryKey: studentKeys.submissions(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return studentMockData.submissions;
    },
  });
}

// ── Consultations ──────────────────────────────────────────────
export function useConsultations() {
  return useQuery({
    queryKey: studentKeys.consultations(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return {
        list: studentMockData.consultations,
        next: studentMockData.nextConsultation,
      };
    },
  });
}

// ── Notifications ──────────────────────────────────────────────
export function useNotifications() {
  return useQuery({
    queryKey: studentKeys.notifications(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150));
      return studentMockData.notifications;
    },
  });
}

// ── Group ──────────────────────────────────────────────────────
export function useStudentGroup() {
  return useQuery({
    queryKey: studentKeys.group(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return studentMockData.group;
    },
  });
}

// ── Advisers ───────────────────────────────────────────────────
export function useAdvisers() {
  return useQuery({
    queryKey: studentKeys.advisers(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return {
        assigned: studentMockData.assignedAdviser,
        available: studentMockData.availableAdvisers,
      };
    },
  });
}

// ── Defense ───────────────────────────────────────────────────
export function useDefense() {
  return useQuery({
    queryKey: studentKeys.defense(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return {
        requirements: studentMockData.defenseRequirements,
        eligibility: studentMockData.defenseEligibility,
      };
    },
  });
}

// ── Grades ────────────────────────────────────────────────────
export function useGrades() {
  return useQuery({
    queryKey: studentKeys.grades(),
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return studentMockData.grades;
    },
  });
}

// ── Optimistic task toggle ─────────────────────────────────────
export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: TaskStatus }) => {
      await new Promise((r) => setTimeout(r, 150));
      return { taskId, status };
    },
    onMutate: async ({ taskId, status }) => {
      await queryClient.cancelQueries({ queryKey: studentKeys.overview() });
      const previous = queryClient.getQueryData(studentKeys.overview());
      queryClient.setQueryData(studentKeys.overview(), (old: typeof studentMockData.overview | undefined) => {
        if (!old) return old;
        return {
          ...old,
          pendingTasks: old.pendingTasks.map((t) =>
            t.id === taskId ? { ...t, status } : t
          ),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(studentKeys.overview(), ctx?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.overview() });
    },
  });
}
