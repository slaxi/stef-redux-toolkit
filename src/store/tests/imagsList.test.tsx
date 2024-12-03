import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { store } from "../configureStore";
import { IRoot } from "../../model/Images";
import {
  addImagePreviewMark,
  addImages,
  selectFavoritePics,
  selectImagesByCreationDate,
  setImagePreview,
} from "../imagesList";
import Main from "../../components/Main";
import ImageCard from "../../components/ImageCard";

let fakeAxios: MockAdapter;

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

      const sortedArray = selectImagesByCreationDate({
        list: imagesList,
        favoriteTabOpen: false,
        error: null,
        isLoading: false,
        singleImagePreview: null,
      });
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
  });
});
