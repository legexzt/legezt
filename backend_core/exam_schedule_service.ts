export interface ExamWindow {
  examId: string;
  title: string;
  startTimeIso: string;
  endTimeIso: string;
  durationMinutes: number;
}

export interface ExamTimingVerificationResult {
  status: "UPCOMING" | "LIVE" | "ENDED";
  canAccess: boolean;
  remainingSeconds: number;
  timeUntilStartSeconds: number;
  serverTimeIso: string;
  statusMessage: string;
}

/**
 * Verify Exam timing window against Current Server Time
 */
export function verifyExamTiming(
  startTimeIso: string,
  endTimeIso: string
): ExamTimingVerificationResult {
  const nowMs = Date.now();
  const startMs = new Date(startTimeIso).getTime();
  const endMs = new Date(endTimeIso).getTime();
  const serverTimeIso = new Date(nowMs).toISOString();

  if (isNaN(startMs) || isNaN(endMs) || startMs >= endMs) {
    return {
      status: "ENDED",
      canAccess: false,
      remainingSeconds: 0,
      timeUntilStartSeconds: 0,
      serverTimeIso,
      statusMessage: "Invalid exam schedule timing parameters configured.",
    };
  }

  if (nowMs < startMs) {
    const timeUntilStartSeconds = Math.ceil((startMs - nowMs) / 1000);
    return {
      status: "UPCOMING",
      canAccess: false,
      remainingSeconds: 0,
      timeUntilStartSeconds,
      serverTimeIso,
      statusMessage: `EXAM UPCOMING: Session starts in ${timeUntilStartSeconds} seconds. Access is locked.`,
    };
  }

  if (nowMs > endMs) {
    return {
      status: "ENDED",
      canAccess: false,
      remainingSeconds: 0,
      timeUntilStartSeconds: 0,
      serverTimeIso,
      statusMessage: "EXAM ENDED: Session window has expired. No further submissions accepted.",
    };
  }

  const remainingSeconds = Math.ceil((endMs - nowMs) / 1000);
  return {
    status: "LIVE",
    canAccess: true,
    remainingSeconds,
    timeUntilStartSeconds: 0,
    serverTimeIso,
    statusMessage: `EXAM LIVE: Active session. ${remainingSeconds} seconds remaining in window.`,
  };
}
