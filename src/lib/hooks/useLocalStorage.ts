import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

const HISTORY_KEY = "rest-client-history";
export const VARIABLES_KEY = "rest_client_variables";

function subscribe(key: string) {
  return function (cb: () => void) {
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
}

type StorageFnType<T, P> = [T | null, (val: P) => void];

function useLocalStorage(key: string): StorageFnType<string, string> {
  const subscribed = useMemo(() => subscribe(key), [key]);
  const storage = useSyncExternalStore(
    subscribed,
    () => window.localStorage.getItem(key),
    () => "",
  );
  const setStorage = useCallback(
    (value: string) => {
      window.localStorage.setItem(key, value);
    },
    [key],
  );
  return [storage, setStorage];
}

export interface HistoryItem {
  method: string;
  url: string;
  body: string;
  headers: { [k: string]: string };
}

export function useHistoryStorage() {
  const [value, setValue] = useLocalStorage(HISTORY_KEY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [value]);

  const history = useMemo(
    () => (value ? (JSON.parse(value) as HistoryItem[]) : []),
    [value],
  );
  const addToHistory = (newItem: HistoryItem) => {
    history.push(newItem);
    setValue(JSON.stringify(history));
  };
  const resetHistory = () => {
    setValue("");
  };
  return { history, addToHistory, resetHistory, loading };
}

export function useVariablesStorage() {
  const [value, setValue] = useLocalStorage(VARIABLES_KEY);

  const variables = useMemo(
    () => (value ? (JSON.parse(value) as Record<string, string>) : {}),
    [value],
  );

  const addToVars = useCallback(
    (newVar: Record<string, string>) => {
      const toSave = { ...variables, ...newVar };
      setValue(JSON.stringify(toSave));
    },
    [variables, setValue],
  );

  const removeVar = useCallback(
    (key: string) => {
      const updated = { ...variables };
      delete updated[key];

      setValue(JSON.stringify(updated));
    },
    [variables, setValue],
  );
  return { variables, addToVars, removeVar };
}
