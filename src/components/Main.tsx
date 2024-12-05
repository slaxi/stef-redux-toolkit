import React, { useEffect } from "react";
import Tabs from "./Tabs";
import { IRoot } from "../model/Images";
import {
  loadImages,
  selectImagesByCreationDate,
  TInitialState,
} from "../store/imagesList";
import ImageCard from "./ImageCard";
import Favorite from "./Favorite";
import Fallback from "./Fallback";
import { useDispatch, useSelector } from "react-redux";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: TInitialState) => state.list);
  const error = useSelector((state: TInitialState) => state.error);
  const favoriteTabOpen = useSelector((state: TInitialState) => state.favoriteTabOpen);

  useEffect(() => {
    dispatch(loadImages());
  }, [dispatch]);

  if (!list || !list?.length)
    return <Fallback message={error ?? "No list found!"} />;

  const imagesSorted = selectImagesByCreationDate(list);

  return (
    <>
      <Tabs isFavoriteOpen={favoriteTabOpen} />
      {!favoriteTabOpen && imagesSorted.length ? (
        <div className="images">
          {imagesSorted.map(({ id, filename, url, sizeInBytes }: IRoot) => (
            <ImageCard
              key={id}
              id={id}
              src={url}
              title={filename}
              size={`${(sizeInBytes / 1000000).toFixed(1)}MB`}
              showFavorite={false}
            />
          ))}
        </div>
      ) : (
        ""
      )}
      {favoriteTabOpen && <Favorite />}
    </>
  );
};

export default Main;
