import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Scores {
    happiness: bigint;
    pollution: bigint;
    forest: bigint;
}
export interface Decision {
    sceneIndex: bigint;
    choiceIndex: bigint;
}
export type SessionId = bigint;
export interface Session {
    scores?: Scores;
    decisions: Array<Decision>;
}
export interface backendInterface {
    createGameSession(): Promise<SessionId>;
    getSessionState(sessionId: SessionId): Promise<Session>;
    makeDecision(sessionId: SessionId, sceneIndex: bigint, choiceIndex: bigint): Promise<void>;
}
