import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoanApplicationSubmission, LoanStatus } from "../backend.d";
import { useActor } from "./useActor";

export function useGetLoanProducts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["loanProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLoanProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMyApplications() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllApplications() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitLoanApplication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (submission: LoanApplicationSubmission) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitLoanApplication(submission);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myApplications"] });
    },
  });
}

export function useRecordPayment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      applicationId,
      upiTransactionId,
    }: { applicationId: bigint; upiTransactionId: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.recordPlatformFeePayment(applicationId, upiTransactionId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myApplications"] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: LoanStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateApplicationStatus(id, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allApplications"] });
    },
  });
}

export function useCancelApplication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.cancelApplication(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myApplications"] });
    },
  });
}
