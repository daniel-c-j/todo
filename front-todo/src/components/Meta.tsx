import { createPortal } from "react-dom";
import { memo } from "react";
import { PROJECT_DESC, PROJECT_NAME } from "../constants";

const keywords = [
  "fullstack application",
  "todo"
];

const Meta = memo(() => {
  return createPortal(
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta name="description" content={PROJECT_DESC} />
      <meta name="keywords" content={keywords.join(", ")} />

      <meta property="og:title" content={PROJECT_NAME} />
      <meta property="og:description" content={PROJECT_DESC} />

      <link rel="icon" type="image/png" href="icons/icon.png" sizes="32x32" />

      <title>{PROJECT_NAME}</title>
    </>,
    document.head
  );
});

export default Meta;
