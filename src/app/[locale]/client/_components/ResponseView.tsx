import React from "react";

type Props = {
  response?: Response;
  data?:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | Array<unknown>
    | null;
};

export default function ResponseView({ response, data }: Props) {
  if (!response) {
    return <p>No response yet</p>;
  }

  const renderBody = () => {
    if (data === null || data === undefined) return <em>No body</em>;
    if (typeof data === "string") return <pre>{data}</pre>;

    return (
      <pre
        style={{
          background: "#f4f4f4",
          padding: "1rem",
          borderRadius: "6px",
          fontSize: "14px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          maxHeight: "300px",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  };

  return (
    <div className="w-full text-left space-y-4">
      <div className="text-sm">
        <strong>Status:</strong> {response.status} {response.statusText}
      </div>
      <div>
        <strong>Body:</strong>
        <div className="mt-2">{renderBody()}</div>
      </div>
    </div>
  );
}
