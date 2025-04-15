import { useState, useEffect } from "react";

export function useLocalStorage(
  storageKey = "searchValue",
): [string, (data: string) => void] {
  const [value, setValue] = useState(localStorage.getItem(storageKey) || "");

  useEffect(() => {
    localStorage.setItem(storageKey, value);
  }, [value, storageKey]);

  return [value, setValue];
}
