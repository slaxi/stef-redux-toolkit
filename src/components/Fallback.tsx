import React from "react";

type Props = { message?: string };

const Fallback: React.FC<Props> = ({ message }) => {
  return (
    <>
      {message ? (
        <div className="image_card_fallback_error">
          <h2>{message}</h2>
        </div>
      ) : (
        <div className="image_card_fallback">
          <h2>Click an image for preview</h2>
          <img
            src="data:image/jpeg;base64,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"
            alt="fallback_image"
          />
        </div>
      )}
    </>
  );
};

export default Fallback;