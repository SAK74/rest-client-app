import { useSyncExternalStore } from "react";

const subscribe = (key: string) => (cb: () => void) => {
  const callback = (ev: StorageEvent) => {
    if (ev.key === key) {
      cb();
    }
  };
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
};

type StorageFnType<T> = [T | null, (val: T) => void];

function useLocalStorage(key: string): StorageFnType<string> {
  const storage = useSyncExternalStore(
    subscribe(key),
    () => window.localStorage.getItem(key),
    () => "",
  );
  const setStorage = (value: string) => window.localStorage.setItem(key, value);
  return [storage, setStorage];
}

export interface HistoryItem {
  method: string;
  url: string;
  body: string;
  headers: { [k: string]: string };
}

export function useHistoryStorage() {
  const [value, setValue] = useLocalStorage("rest-client-history");

  const history = value ? (JSON.parse(value) as HistoryItem[]) : [];
  const addToHistory = (newItem: HistoryItem) => {
    history.push(newItem);
    setValue(JSON.stringify(history));
  };
  const resetHistory = () => {
    setValue("");
  };
  return { history, addToHistory, resetHistory };
}

export const useVariablesStorage = () => {};
