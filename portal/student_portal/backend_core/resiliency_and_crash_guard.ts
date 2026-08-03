export interface ApiResponse {
  success?: boolean;
  data?: any;
  error?: string;
  code?: number;
  message?: string;
  student?: any;
  authenticated?: boolean;
  [key: string]: any;
}
export const safeExecute = async (name: string, fn: () => Promise<any>): Promise<any> => {
  try {
    const res = await fn();
    return { success: true, ...res };
  } catch(e: any) {
    return { success: false, error: e.message };
  }
};
export const validatePayloadFields = (payload: any, fields: string[]) => {
  const missingFields: string[] = [];
  for (const f of fields) if (!payload || !payload[f]) missingFields.push(f);
  return { valid: missingFields.length === 0, missingFields };
};
