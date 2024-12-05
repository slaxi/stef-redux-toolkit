import React from "react";
import { handleDeleteImage } from "../store/imagesList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/configureStore";

type TIMageInfo = {
  uploadedBy: string;
  dimensions: { height: number; width: number };
  resolution: { height: number; width: number };
  description: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

const ImageInfo: React.FC<TIMageInfo> = ({
  uploadedBy,
  dimensions,
  resolution,
  description,
  createdAt,
  updatedAt,
  id,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleImageDelete = () => dispatch(handleDeleteImage(id));
  return (
    <>
      <section className="details_info_section">
        <h2>Information</h2>
        <p>
          Uploaded by: <span>{uploadedBy}</span>
        </p>
        <p>
          Created <span>{createdAt}</span>
        </p>
        <p>
          Last modified<span>{updatedAt}</span>
        </p>
        <p>
          Dimensions
          <span>
            {dimensions.width} x {dimensions.height}
          </span>
        </p>
        <p>
          Resolution{" "}
          <span>
            {resolution.width} x {resolution.height}
          </span>
        </p>
      </section>
      <section className="details_info_section_description">
        <h2>Description</h2>
        <p>{description ? description : "No description found"}</p>
      </section>
      <button onClick={handleImageDelete}>Delete</button>
    </>
  );
};

export default ImageInfo;
