import { FC } from "react";

const BodyEditor: FC<{ decodedBody?: string }> = ({ decodedBody }) => {
  const onChange = () => {
    // can do it controlled or anymore...
  };

  // eslint-disable-next-line
  const onSubmit = () => {
    //todo: change path
    // similar to url input
  };
  // use tool json-editor or similar instead textarea
  return <textarea value={decodedBody} onChange={onChange}></textarea>;
};

export default BodyEditor;
