"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(
  key: string,
): [string, (value: string) => void, isLoading: boolean] {
  const [storedValue, setStoredValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item || "");
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setStoredValue("");
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  return [storedValue, setValue, isLoading];
}
