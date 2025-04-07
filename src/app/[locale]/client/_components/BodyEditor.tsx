import { FC } from "react";

const BodyEditor: FC<{ body?: string }> = ({ body }) => {
  const decoded = atob(body || "");
  const onChange = () => {
    // can do it controlled or anymore...
  };

  // eslint-disable-next-line
  const onSubmit = () => {
    //todo: change path
    // similar to url input
  };
  // use tool json-editor or similar instead textarea
  return <textarea value={decoded} onChange={onChange}></textarea>;
};

export default BodyEditor;
