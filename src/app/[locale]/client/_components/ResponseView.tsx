import { type FC } from "react";

const ResponseView: FC<{ response?: Response }> = ({ response }) => {
  // .....
  return (
    <div>
      {/* use json-viewer or similar */}
      Response view
      {response && (
        <div>
          <p>Response status: {response?.status}</p>
          <p>{response.statusText}</p>
          <p>Headers:</p>
          <ul>
            {Array.from(response.headers.entries()).map(([key, value]) => (
              <li key={key}>
                <strong>{key}: </strong>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResponseView;
