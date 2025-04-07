import { FC, use } from "react";

const ResponseView: FC<{ response?: Promise<Response> }> = ({ response }) => {
  const rawResponse = response && use(response); // eslint-disable-line
  // .....
  return (
    <div>
      {/* use json-viewer or similar */}
      Response view
    </div>
  );
};

export default ResponseView;
