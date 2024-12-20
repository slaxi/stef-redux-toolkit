import React from "react";
import ImageCard from "./ImageCard";
import ImageInfo from "./ImageInfo";
import { IRoot } from "../model/Images";
import { formatDate } from "../utils/formatDate";
import Fallback from "./Fallback";
import { useSelector } from "react-redux";
import { selectSingleImagePreview, TInitialState } from "../store/imagesList";

const ImageDetails: React.FC = () => {
  const image = useSelector<TInitialState, IRoot | null>(
    selectSingleImagePreview
  );

  if (!image) return <Fallback />;

  const {
    id,
    filename,
    url,
    sizeInBytes,
    uploadedBy,
    dimensions,
    resolution,
    description,
    createdAt,
    updatedAt,
    favorited,
  } = image;

  return (
    <aside>
      <div className="image_details">
        <section className="details_image_section">
          <ImageCard
            id={id}
            title={filename}
            size={`${(sizeInBytes / 1000000).toFixed(1)}MB`}
            showFavorite={true}
            src={url}
            favorite={favorited}
          />
          <ImageInfo
            uploadedBy={uploadedBy}
            dimensions={dimensions}
            resolution={resolution}
            description={description}
            createdAt={formatDate(createdAt)}
            updatedAt={formatDate(updatedAt)}
            id={id}
          />
        </section>
      </div>
    </aside>
  );
};

export default ImageDetails;
