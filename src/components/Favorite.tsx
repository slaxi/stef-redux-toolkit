import React from "react";
import { IRoot } from "../model/Images";
import ImageCard from "./ImageCard";
import { selectFavoritePics } from "../store/imagesList";
import { store } from "../store/configureStore";

const Favorite = () => {
  const favoriteImages = selectFavoritePics(store.getState());
  return (
    <div className="images">
      {favoriteImages.map(
        ({ id, filename, url, sizeInBytes, favorited }: IRoot) => (
          <ImageCard
            key={id}
            id={id}
            src={url}
            title={filename}
            size={`${(sizeInBytes / 1000000).toFixed(1)}MB`}
            showFavorite={true}
            favorite={favorited}
          />
        )
      )}
    </div>
  );
};

export default Favorite;
