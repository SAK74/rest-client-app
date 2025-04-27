"use client";

import { useVariablesStorage } from "@/lib/hooks/useLocalStorage";
import { type FormEventHandler, useRef, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function VariablesClient() {
  const { variables, addToVars, removeVar } = useVariablesStorage();
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const reset = () => {
    setNewKey("");
    setNewValue("");
    if (keyRef.current) {
      keyRef.current.disabled = false;
    }
  };

  const handleAdd = () => {
    if (!newKey.trim()) return;
    addToVars({ [newKey]: newValue });
    reset();
  };

  const handleDelete = (key: string) => {
    removeVar(key);
    reset();
  };

  const t = useTranslations("Vars_page");
  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    handleAdd();
  };

  const keyRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col gap-8 py-4 items-center">
      <div className="p-4">
        <h2>{t("tittle")}</h2>

        <form className="mt-4 space-x-2" onSubmit={onSubmit}>
          <Input
            className="w-36 inline-block"
            size={20}
            placeholder={t("var_name")}
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            ref={keyRef}
          />
          <Input
            className="w-36 inline-block"
            placeholder={t("var_value")}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Button onClick={handleAdd}>{t("add_update")}</Button>
        </form>

        <ul className="mt-4">
          {Object.entries(variables).map(([k, v]) => (
            <li key={k} className="mb-2 space-x-2 cursor-pointer">
              <Trash2Icon
                className="inline hover:stroke-red-500 dark:hover:stroke-red-500 stroke-destructive/50 cursor-pointer"
                size={25}
                onClick={() => {
                  handleDelete(k);
                }}
              />
              <span
                onClick={() => {
                  setNewKey(k);
                  setNewValue(v);
                  if (keyRef.current) {
                    keyRef.current.disabled = true;
                  }
                }}
              >
                <strong>{k}</strong> = {v}{" "}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
