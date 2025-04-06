"use client";

import React, { useState, useEffect } from "react";

const STORAGE_KEY = "rest_client_variables";

type VarsRecord = Record<string, string>;

export default function VariablesClient() {
  const [variables, setVariables] = useState<VarsRecord>({});
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          setVariables(parsed);
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(variables));
    }
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
    <div style={{ padding: "1rem" }}>
      <h2>Manage Variables</h2>

      <div style={{ marginTop: "1rem" }}>
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

      <ul style={{ marginTop: "1rem" }}>
        {Object.entries(variables).map(([k, v]) => (
          <li key={k} style={{ marginBottom: "0.5rem" }}>
            <strong>{k}</strong> = {v}{" "}
            <button onClick={() => handleDelete(k)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
