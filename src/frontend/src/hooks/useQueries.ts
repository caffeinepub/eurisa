import { useMutation, useQuery } from "@tanstack/react-query";
import type { Session, SessionId } from "../backend.d";
import { useActor } from "./useActor";

// Re-export types for convenience
export type { SessionId, Session };

export function useCreateGameSession() {
  const { actor } = useActor();
  return useMutation<SessionId, Error>({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createGameSession();
    },
  });
}

export function useMakeDecision() {
  const { actor } = useActor();
  return useMutation<
    void,
    Error,
    { sessionId: SessionId; sceneIndex: bigint; choiceIndex: bigint }
  >({
    mutationFn: async ({ sessionId, sceneIndex, choiceIndex }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.makeDecision(sessionId, sceneIndex, choiceIndex);
    },
  });
}

export function useGetSessionState(sessionId: SessionId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Session>({
    queryKey: ["session", sessionId?.toString()],
    queryFn: async () => {
      if (!actor || sessionId === null) throw new Error("Not ready");
      return actor.getSessionState(sessionId);
    },
    enabled: !!actor && !isFetching && sessionId !== null,
  });
}
