import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { IRoot } from "../model/Images";
import { apiCallBegan, apiCallFailure, apiCallSuccess } from "./actions";
import { AppDispatch } from "./configureStore";

export type TInitialState = {
  list: IRoot[];
  favoriteTabOpen: boolean;
  singleImagePreview: IRoot | null;
  isLoading: boolean,
  error: string | null
};

const imagesList = createSlice({
  name: "images",
  initialState: {
    list: [] as IRoot[],
    favoriteTabOpen: false,
    singleImagePreview: null,
    isLoading: false,
    error: null
  } as TInitialState,
  reducers: {
    addImages: (
      state: TInitialState,
      action: PayloadAction<{ result: IRoot[] }>
    ) => {
      state.list = action.payload.result;
    },
    addImagePreviewMark: (
      state: TInitialState,
      action: PayloadAction<{ id: string }>
    ) => {
      const image = state.list.find((img: IRoot) => {
        return img.id === action.payload.id;
      });
      if (!image) return;
      state.singleImagePreview = image;
    },
    changeFavoriteTab: (
      state: TInitialState,
      action: PayloadAction<{ favorite: boolean }>
    ) => {
      state.favoriteTabOpen = action.payload.favorite;
    },
    changeFavoriteStatus: (
      state: TInitialState,
      action: PayloadAction<{ id: string }>
    ) => {
      const image = state.list.find((img: IRoot) => {
        return img.id === action.payload.id;
      });
      if (!image) return;
      if (
        state.singleImagePreview &&
        state.singleImagePreview.id === action.payload.id
      ) {
        state.singleImagePreview.favorited =
          !state.singleImagePreview.favorited;
      }
      image.favorited = !image.favorited;
    },
    deleteImage: (
      state: TInitialState,
      action: PayloadAction<{ id: string }>
    ) => {
      state.list = state.list.filter((img) => img.id !== action.payload.id);
      if (
        state.singleImagePreview &&
        state.singleImagePreview.id === action.payload.id
      ) {
        state.singleImagePreview = null;
      }
    },
    addLoadingState: (state: TInitialState, action: PayloadAction<{isLoading: boolean}>) => {
      state.isLoading = action.payload.isLoading
    },
    addErrorMessage: (state: TInitialState, action: PayloadAction<{message: string}>) => {
      state.error = `Something went wrong! Check the issue: ${action.payload.message}`
    },
  },
});

export const {
  addImages,
  addImagePreviewMark,
  changeFavoriteTab,
  changeFavoriteStatus,
  deleteImage,
  addLoadingState,
  addErrorMessage
} = imagesList.actions;

export default imagesList.reducer;

export const loadImages = () => {
  return apiCallBegan({
    url: "/images.json",
    onSuccess: apiCallSuccess.type,
    onFailure: apiCallFailure.type,
  });
};

export const setImagePreview = (id: string) => (dispatch: AppDispatch) => {
  return dispatch(addImagePreviewMark({ id }));
};

export const handleTabSwitch = (favorite: boolean) => (dispatch: AppDispatch) => {
 return dispatch(changeFavoriteTab({ favorite }));
};

export const handleFavoriteSwitch = (id: string) => (dispatch: AppDispatch) => {
  return dispatch(changeFavoriteStatus({ id }));
};

export const handleDeleteImage = (id: string) => (dispatch: AppDispatch) => {
  return dispatch(deleteImage({ id }));
};



export const selectImagesByCreationDate = createSelector(
  (state: IRoot[]) => state,
  (images) => {
    if (!images.length) return [];
    const sortedImages = images
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    return sortedImages;
  }
);

export const selectFavoritePics = createSelector(
  (state: TInitialState) => state.list,
  (images) => {
    return images.filter((img) => img.favorited);
  }
);

export const selectSingleImagePreview = createSelector(
  (state: TInitialState) => state,
  (images) => {
    if(!images) {
      return null
    }
    return images.singleImagePreview
  }
)

