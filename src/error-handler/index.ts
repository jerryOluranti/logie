import { LogError } from "../logger";

/**
 * Applies try catch to an async logic
 * @param promise function or expression that returns a promise
 * @returns Promise Data<T> & Error
 */
export async function catchAsync<T>(promise: Promise<T>): Promise<{ error: Error, data: null } | { error: null, data: T }> {
  try {
    return { error: null, data: await promise }
  } catch (err) {
    const error = new Error((err as { message: string }).message);
    LogError(error);
    return { error, data: null }
  }
}

/**
  * Applies try catch to an async logic
 * @param promise function or expression with no exprected return
 * @returns Promise Error | null
 */
export async function catchAsyncNoReturn(promise: any): Promise<Error | null> {
  try {
    await promise;
    return null;
  } catch (err) {
    const error = new Error((err as { message: string }).message);
    LogError(error);
    return error;
  }
}

/**
 * Applies try catch to a syncronous logic
 * @param result Syncronous function with expected return
 * @returns Data<T> & Error
 */
export function catchSync<T>(result: T): { error: Error, data: null } | { error: null, data: T } {
  try {
    return { error: null, data: result }
  } catch (err) {
    const error = new Error((err as { message: string }).message);
    LogError(error);
    return { error, data: null }
  }
}

/**
 * Applies try catch to a syncronous logic
 * @param result Syncronous function with no expected return
 * @returns Error | null
 */
export function catchSyncNoReturn(result: any): Error | null {
  try {
    result;
    return null;
  } catch (err) {
    const error = new Error((err as { message: string }).message);
    LogError(error);
    return error;
  }
}