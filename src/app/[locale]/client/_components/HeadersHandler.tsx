import { FC } from "react";

const HeadersHandler: FC<{ _headers?: Record<string, string> }> = ({
  _headers,
}) => {
  // handle headers similar to url
  return (
    <ul>
      {_headers &&
        Object.entries(_headers).map(([key, val]) => (
          <li key={key}>
            key: {key} value: {val}
          </li>
        ))}
    </ul>
  );
};

export default HeadersHandler;
