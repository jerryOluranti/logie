import { log } from "../logger";

/**
 * Applies try catch to an async function
 * @param {Promise<T>} resolve promise
 * @param {Function} cb Optional - callback function to be triggered on error
 * @param {boolean} [_throw] Optional - specifies whether an error is thrown. default => false
 * @returns {Promise<T | undefined>} Promise<T | undefined>
 */
export async function catchAsync<T>(resolve: Promise<T>, cb?: any, _throw = false) {
  try {
    return (await resolve) as T;
  } catch (err) {
    return handleError(err, _throw, cb);
  }
}

/**
 * Applies try catch to an async function
 * @param {Promise<T>} resolve promise
 * @param {Function} cb Optional - callback function to be triggered on error
 * @param {boolean} [_throw] Optional - specifies whether an error is thrown. default => false
 * @returns {void} void
 */
export async function catchAsyncNoReturn<T>(resolve: Promise<T>, cb?: any, _throw = false) {
  try {
    await resolve;
  } catch (err) {
    handleError(err, _throw, cb);
  }
}

/**
 * Applies try catch to a sync function
 * @param {T} result function
 * @param {Function} cb Optional - callback function to be triggered on error
 * @param {boolean} [_throw] Optional - specifies whether an error is thrown. default => false
 * @returns {T | undefined} T | undefined
 */
export function catchSync<T>(result: T, cb?: any, _throw = false) {
  try {
    return result;
  } catch (err) {
    return handleError(err, _throw, cb);
  }
}

/**
 * Applies try catch to a sync function
 * @param {any} result function
 * @param {Function} cb Optional - callback function to be triggered on error
 * @param {boolean} [_throw] Optional - specifies whether an error is thrown. default => false
 * @returns {void} void
 */
export function catchSyncNoReturn(result: any, cb?: any, _throw = false) {
  try {
    result;
  } catch (err) {
    handleError(err, _throw, cb);
  }
}


function handleError(err: any, _throw: boolean, cb?: any) {
  log(err, "ERROR");
  if(cb) cb(err);
  if (_throw) log(err.message, 'ERROR');
  return undefined;
}