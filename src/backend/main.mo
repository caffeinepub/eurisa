import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
  type SessionId = Nat;
  type Decision = { sceneIndex : Nat; choiceIndex : Nat };
  type Scores = {
    pollution : Nat;
    forest : Nat;
    happiness : Nat;
  };

  type Session = {
    decisions : [Decision];
    scores : ?Scores;
  };

  let sessions = Map.empty<SessionId, Session>();
  var nextSessionId = 0;

  func calculateScores(decisions : [Decision]) : Scores {
    var pollution = 50;
    var forest = 50;
    var happiness = 50;

    for (decision in decisions.values()) {
      switch (decision.choiceIndex) {
        case (0) {
          pollution += 10;
          forest -= 10;
          happiness += 5;
        };
        case (1) { // Neutral choice
        };
        case (2) {
          pollution -= 10;
          forest += 10;
          happiness -= 5;
        };
        case (_) { Runtime.trap("Invalid choice index") };
      };
    };

    {
      pollution = Nat.min(100, Nat.max(0, pollution));
      forest = Nat.min(100, Nat.max(0, forest));
      happiness = Nat.min(100, Nat.max(0, happiness));
    };
  };

  public shared ({ caller }) func createGameSession() : async SessionId {
    let sessionId = nextSessionId;
    nextSessionId += 1;

    let initialSession : Session = {
      decisions = [];
      scores = null;
    };

    sessions.add(sessionId, initialSession);
    sessionId;
  };

  public shared ({ caller }) func makeDecision(sessionId : SessionId, sceneIndex : Nat, choiceIndex : Nat) : async () {
    if (sceneIndex > 5 or choiceIndex > 2) {
      Runtime.trap("Invalid scene or choice index");
    };

    switch (sessions.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        if (session.decisions.size() > 5) {
          Runtime.trap("All decisions for this session have already been made");
        };

        let newDecision : Decision = {
          sceneIndex;
          choiceIndex;
        };

        let newDecisions = session.decisions.concat([newDecision]);
        let newScores = if (newDecisions.size() == 6) {
          ?calculateScores(newDecisions);
        } else { null };

        let newSession : Session = {
          decisions = newDecisions;
          scores = newScores;
        };

        sessions.add(sessionId, newSession);
      };
    };
  };

  public query ({ caller }) func getSessionState(sessionId : SessionId) : async Session {
    switch (sessions.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) { session };
    };
  };
};
