"use client";

import { Methods } from "@/app/_constants/methods";
import { ChangeEventHandler, FC } from "react";

const Method: FC<{
  method: string;
  onMethodChange: (method: string) => void;
}> = ({ method, onMethodChange }) => {
  const onChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    onMethodChange(value);
  };

  return (
    <div>
      <select value={method} onChange={onChange}>
        {Methods.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Method;
