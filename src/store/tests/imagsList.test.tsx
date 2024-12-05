import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import MockAdapter from "axios-mock-adapter";

import axios from "axios";
import { IRoot } from "../../model/Images";
import {
  addImagePreviewMark,
  addImages,
  changeFavoriteStatus,
  deleteImage,
  selectFavoritePics,
  selectImagesByCreationDate,
  selectSingleImagePreview,
} from "../imagesList";
import ImageCard from "../../components/ImageCard";
import { api } from "../middleware/api";
import { configureStore, Store } from "@reduxjs/toolkit";
import reducer from "../imagesList";
import { Provider } from "react-redux";
import ImageDetails from "../../components/ImageDetails";

let fakeAxios: MockAdapter;
let store: Store;

const getImage = (): IRoot => ({
  id: "74957345-6f5b-4d66-ae9d-5d0071b40279",
  url: "https://agencyanalytics-api.vercel.app/images/0.jpg",
  filename: "tennessee_female_rubber.jpg",
  uploadedBy: "Ms. Jimmie Cole",
  createdAt: "2017-07-15T08:23:20.462Z",
  updatedAt: "2022-12-16T12:41:33.736Z",
  dimensions: { width: 2400, height: 1200 },
  resolution: { width: 72, height: 72 },
  sizeInBytes: 4812732,
  favorited: true,
  description:
    "Laboriosam eligendi inventore officia nemo. Quisquam explicabo voluptatem. Illo laborum facilis.",
});

describe("images slice", () => {
  const getImagesList: () => IRoot[] = () => store.getState().list;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore({
      reducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
    });
  });

  describe("list images creation", () => {
    it("should not add a image to the list if the response is not ok", async () => {
      fakeAxios.onGet("/images.json").reply(404);

      await store.dispatch(addImages({ result: [] }));

      expect(getImagesList()).toHaveLength(0);
    });
    it("should add a image to the list", async () => {
      const image = getImage();
      fakeAxios.onGet("/images.json").reply(200, [image]);

      await store.dispatch(addImages({ result: [image] }));

      expect(getImagesList()).toContainEqual(image);
    });
  });

  describe("list image manipulation", () => {
    it("should return the list of images sorted by data", () => {
      const imagesList = [
        { createdAt: 1732887381401 },
        { createdAt: 1732887385012 },
      ] as unknown as IRoot[];

      const sortedArray = selectImagesByCreationDate(imagesList);
      /**
       * expected result is sorted by last creation date,
       * since 1732887385012 is younger than 1732887381401
       */
      const expectedResult = [
        { createdAt: 1732887385012 },
        { createdAt: 1732887381401 },
      ];

      expect(sortedArray).toStrictEqual(expectedResult);
    });

    it("should return empty list if all images are not favorited", () => {
      const imagesList = [
        { id: "1", favorited: false },
        { id: "2", favorited: false },
        { id: "3", favorited: false },
      ] as IRoot[];
      const listFilteredByFavoritePictures = selectFavoritePics({
        list: imagesList,
        favoriteTabOpen: false,
        error: null,
        isLoading: false,
        singleImagePreview: null,
      });

      expect(listFilteredByFavoritePictures).toHaveLength(0);
    });
    it("should return the favorited pictures from image list", () => {
      const imagesList = [
        { id: "1", favorited: false },
        { id: "2", favorited: true },
        { id: "3", favorited: true },
      ] as IRoot[];
      const listFilteredByFavoritePictures = selectFavoritePics({
        list: imagesList,
        favoriteTabOpen: false,
        error: null,
        isLoading: false,
        singleImagePreview: null,
      });

      const expectedResult = [
        { id: "2", favorited: true },
        { id: "3", favorited: true },
      ];

      expect(listFilteredByFavoritePictures).toStrictEqual(expectedResult);
    });

    it("should return the single image from image list", () => {
      const imagesList = [
        { id: "1", favorited: false },
        { id: "2", favorited: true },
        { id: "3", favorited: true },
      ] as IRoot[];
      const singleImagePrev = { id: "1", favorited: false } as IRoot;
      const singleImage = selectSingleImagePreview({
        list: imagesList,
        favoriteTabOpen: false,
        error: null,
        isLoading: false,
        singleImagePreview: singleImagePrev,
      });

      const expectedResult = { id: "1", favorited: false };

      expect(singleImage).toStrictEqual(expectedResult);
    });
  });

  describe("test image for preview display", () => {
    it("should dispatch the action on clicking the image", async () => {
      const imageId = "74957345-6f5b-4d66-ae9d-5d0071b40279";
      store.dispatch = jest.fn();
      render(
        <Provider store={store}>
          <ImageCard
            id={imageId}
            title="tennessee_female_rubber.jpg"
            size="13215464"
            src="https://agencyanalytics-api.vercel.app/images/0.jpg"
          />
        </Provider>
      );
      const imageCard = screen.getByTestId("image_wrapper");

      fireEvent.click(imageCard);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
    it("should add image for preview on clicking the image", async () => {
      const imageId = "74957345-6f5b-4d66-ae9d-5d0071b40279";
      const image = getImage();
      store = configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        preloadedState: {
          list: [image],
          favoriteTabOpen: false,
          singleImagePreview: null,
          isLoading: false,
          error: null,
        },
      });
      render(
        <Provider store={store}>
          <ImageCard
            id={imageId}
            title="tennessee_female_rubber.jpg"
            size="13215464"
            src="https://agencyanalytics-api.vercel.app/images/0.jpg"
          />
        </Provider>
      );
      const imageCard = screen.getByTestId("image_wrapper");

      fireEvent.click(imageCard);
      await store.dispatch(addImagePreviewMark({ id: imageId }));
      const updatedState = await store.getState();

      expect(updatedState.singleImagePreview).toStrictEqual(image);
    });
  });

  describe("test image deletion from the list", () => {
    beforeEach(() => {
      const image = getImage();
      store = configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        preloadedState: {
          list: [image],
          favoriteTabOpen: false,
          singleImagePreview: image,
          isLoading: false,
          error: null,
        },
      });
    });

    it("should dispatch the action on clicking the delete button", async () => {
      store.dispatch = jest.fn();

      render(
        <Provider store={store}>
          <ImageDetails />
        </Provider>
      );
      const button = await screen.findByRole("button");

      fireEvent.click(button);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it("should delete the image ", async () => {
      render(
        <Provider store={store}>
          <ImageDetails />
        </Provider>
      );
      const button = await screen.findByRole("button");

      fireEvent.click(button);
      await store.dispatch(
        deleteImage({ id: "74957345-6f5b-4d66-ae9d-5d0071b40279" })
      );
      const updatedState = await store.getState();

      expect(updatedState.list).not.toHaveLength(1);
    });
  });

  describe("test change favorite image", () => {
    it("should remove the image from the list of favorite images", async () => {
      const image = getImage();
      const unfavoriteImage = { ...image, favorited: false };
      store = configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        preloadedState: {
          list: [image],
          favoriteTabOpen: false,
          singleImagePreview: image,
          isLoading: false,
          error: null,
        },
      });
      render(
        <Provider store={store}>
          <ImageDetails />
        </Provider>
      );
      const favoriteIcon = await screen.findByTestId("favorite-image");

      fireEvent.click(favoriteIcon);
      await store.dispatch(
        changeFavoriteStatus({ id: "74957345-6f5b-4d66-ae9d-5d0071b40279" })
      );

      const listFilteredByFavoritePictures = selectFavoritePics({
        list: [unfavoriteImage],
        favoriteTabOpen: false,
        error: null,
        isLoading: false,
        singleImagePreview: image,
      });

      expect(listFilteredByFavoritePictures).not.toHaveLength(1);
    });
  });
});
