import { SerializedError } from "@reduxjs/toolkit";

export function isFetchBaseQueryError(
  error: unknown
): error is { status: number; data: unknown } {
  return typeof error === "object" && error !== null && "status" in error;
}

export function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === "object" && error !== null && "message" in error;
}
