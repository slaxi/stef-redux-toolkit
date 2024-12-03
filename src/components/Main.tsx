import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import { store } from "../store/configureStore";
import { IRoot } from "../model/Images";
import {
  loadImages,
  selectImagesByCreationDate,
  TInitialState,
} from "../store/imagesList";
import ImageCard from "./ImageCard";
import Favorite from "./Favorite";
import Fallback from "./Fallback";

const Main: React.FC = () => {
  const [data, setData] = useState<TInitialState | null>(null);

  useEffect(() => {
    store.dispatch(loadImages());
    const unsubscribe = store.subscribe(() => setData(store.getState()));
    return () => {
      unsubscribe();
    };
  }, []);

  if (!data || !data?.list.length)
    return <Fallback message={data?.error ?? "No data found!"} />;

  const imagesSorted = selectImagesByCreationDate(store.getState());

  return (
    <>
      <Tabs isFavoriteOpen={data.favoriteTabOpen} />
      {!data.favoriteTabOpen && imagesSorted.length ? (
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
      {data.favoriteTabOpen && <Favorite />}
    </>
  );
};

export default Main;
