/**
 * Parses a timestamp milliseconds to string
 * @param {number} timeStamp milliseconds
 * @returns {string} Returns a yyyy-mm-dd hh:mm:ss time string format
 */
export function formatDateTime(timestamp: number) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const hour = date.getHours();
  const mins = date.getMinutes();
  const secs = date.getSeconds();

  const mm = (month + 1) > 9 ? month + 1 : `0${month + 1}`;
  const dd = day > 9 ? day : `0${day}`;
  const _mins = mins > 9 ? mins : `0${mins}`;
  const _secs = secs > 9 ? secs : `0${secs}`;

  return `${year}-${mm}-${dd} ${
    hour
  }:${_mins}:${_secs}`;
}


/**
 * Converts a datetime string format to milliseconds
 * @param {string} str datetime string in format: [yyyy-mm-dd hh:mm:ss] 
 * @returns {number} milliseconds
 */
export function parseDateTime(str: string) {
  const timestamp = Date.parse(str.replaceAll(" ", "T"));
  if (timestamp === 0 || isNaN(timestamp)) throw new Error("Unable to parse datetime string; Invalid string format. [yyyy/mm/dd, hh:mm:ss]")
  return timestamp;
 }