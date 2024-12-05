import React from "react";
import { handleFavoriteSwitch, setImagePreview } from "../store/imagesList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/configureStore";

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
  const dispatch = useDispatch<AppDispatch>();
  const handleFavSwitch = (e: any) => {
    e.stopPropagation();
    dispatch(handleFavoriteSwitch(id));
  };
  return (
    <div className="image_card">
      <div
        className="image_wrapper"
        onClick={() => dispatch(setImagePreview(id))}
        data-testid="image_wrapper"
      >
        <img src={src} alt="description" />
      </div>
      <div className="image_title">
        <span className="title">{title}</span>
        {showFavorite && (
          <span
            className="favorite"
            onClick={handleFavSwitch}
            data-testid="favorite-image"
          >
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
