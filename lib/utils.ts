import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(seconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
}

interface RetryOptions {
  /** Default: 3 */
  maxRetries?: number;
  /** Should multiply the backoff by 2 to the power of {attempt}. Default: false */
  exponentialBackoff?: boolean;
  /** Value in miliseconds. Default: 160ms */
  backoff?: number;
  /** Expected list of errors to retry, throws early if error is out of the list */
  expectedErrors: {
    instance: ErrorConstructor;
    message?: string;
  }[];
}

export async function withRetry<T>(callback: () => Promise<T>, options: RetryOptions): Promise<T> {
  const { maxRetries = 3, exponentialBackoff = false, backoff = 200, expectedErrors } = options;
  let err: unknown;

  if (expectedErrors.length === 0) {
    throw new Error("Expected errors list must not be empty");
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await callback();
    } catch (error) {
      if (!(error instanceof Error) || !isExpectedError(error, expectedErrors)) {
        err = error; // Unexpected error, throw early
        break;
      }

      if (attempt < maxRetries) {
        const backoffTime = exponentialBackoff ? backoff * Math.pow(2, attempt) : backoff;
        await sleep(backoffTime / 1000);
      } else {
        err = error; // Max retries reached, throw the last error
      }
    }
  }
  throw err;
}

function isExpectedError(
  error: Error,
  expectedErrors: {
    instance: ErrorConstructor;
    message?: string;
  }[]
): boolean {
  return expectedErrors.some(
    (e) =>
      error instanceof e.instance && (!e.message || (!!error && error.message.includes(e.message)))
  );
}

export function getScoreColor(percentage: number) {
  if (percentage >= 70) {
    return "text-green-700 dark:text-green-400";
  } else if (percentage >= 50) {
    return "text-yellow-700 dark:text-yellow-400";
  } else {
    return "text-red-700 dark:text-red-400";
  }
}
