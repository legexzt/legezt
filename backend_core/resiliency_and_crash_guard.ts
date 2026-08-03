export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

/**
 * Safely executes any async backend function with zero unhandled crash Guarantee
 */
export async function safeExecute<T>(
  actionName: string,
  fn: () => Promise<T>
): Promise<ApiResponse<T>> {
  const timestamp = new Date().toISOString();
  try {
    const data = await fn();
    return {
      success: true,
      code: 200,
      message: `${actionName} executed successfully.`,
      data,
      timestamp,
    };
  } catch (error: any) {
    console.error(`[CRASH GUARD] Exception in ${actionName}:`, error);
    return {
      success: false,
      code: 500,
      message: `Backend Error during ${actionName}. Gracefully recovered.`,
      error: error?.message || String(error),
      timestamp,
    };
  }
}

/**
 * Validates payload schema fields without throwing exceptions
 */
export function validatePayloadFields(
  payload: any,
  requiredFields: string[]
): { valid: boolean; missingFields: string[] } {
  if (!payload || typeof payload !== "object") {
    return { valid: false, missingFields: requiredFields };
  }

  const missingFields = requiredFields.filter((field) => {
    const val = payload[field];
    return val === undefined || val === null || val === "";
  });

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}
