import React from "react";
import { store } from "../store/configureStore";
import { handleFavoriteSwitch, setImagePreview } from "../store/imagesList";

type Props = {
  id: string;
  src: string;
  title: string;
  size: string;
  showFavorite?: boolean;
  favorite?: boolean;
};

const ImageCard: React.FC<Props> = ({
  id,
  src,
  title,
  size,
  showFavorite,
  favorite,
}) => {
  const handleFavSwitch = (e: any) => {
    e.stopPropagation();
    store.dispatch(handleFavoriteSwitch(id));
  };
  return (
    <div className="image_card">
      <div
        className="image_wrapper"
        onClick={() => store.dispatch(setImagePreview(id))}
        data-testid="image_wrapper"
      >
        <img src={src} alt="description" />
      </div>
      <div className="image_title">
        <span className="title">{title}</span>
        {showFavorite && (
          <span className="favorite" onClick={handleFavSwitch}>
            {" "}
            {favorite ? "♥" : "♡"}
          </span>
        )}
      </div>
      <span className="size">{size}</span>
    </div>
  );
};

export default ImageCard;
