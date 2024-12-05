import React from "react";
import { IRoot } from "../model/Images";
import ImageCard from "./ImageCard";
import { selectFavoritePics, TInitialState } from "../store/imagesList";
import { useSelector } from "react-redux";

const Favorite: React.FC = () => {
  const favoriteImages = useSelector<TInitialState, IRoot[]>(selectFavoritePics)
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
