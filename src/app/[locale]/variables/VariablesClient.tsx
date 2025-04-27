"use client";

import { getVariables } from "@/lib/getVariables";
import React, { useState, useEffect } from "react";

const STORAGE_KEY = "rest_client_variables";

type VarsRecord = Record<string, string>;

export default function VariablesClient() {
  const [variables, setVariables] = useState<VarsRecord>(
    () => getVariables() || {},
  );
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(variables));
  }, [variables]);

  const handleAdd = () => {
    if (!newKey.trim()) return;
    setVariables((prev) => ({ ...prev, [newKey]: newValue }));
    setNewKey("");
    setNewValue("");
  };

  const handleDelete = (key: string) => {
    const updated = { ...variables };
    delete updated[key];
    setVariables(updated);
  };

  return (
    <div className="flex flex-col gap-8 py-4 items-center">
      <div className="p-4">
        <h2>Manage Variables</h2>

        <div className="mt-4">
          <input
            placeholder="Variable name"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <input
            placeholder="Variable value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button onClick={handleAdd}>Add/Update</button>
        </div>

        <ul className="mt-4">
          {Object.entries(variables).map(([k, v]) => (
            <li key={k} className="mb-2">
              <strong>{k}</strong> = {v}{" "}
              <button onClick={() => handleDelete(k)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
