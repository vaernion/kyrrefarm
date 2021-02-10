import { Actions, StoreAction } from "./Actions";
import { StoreState } from "./StoreState";

export const storeReducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case Actions.LOADING_BEGIN:
      return { ...state, isLoading: true };
    case Actions.LOADING_END:
      return { ...state, isLoading: false };
    case Actions.SET_FAVORITE_COMPANY:
      return { ...state, favoriteCompany: action.payload };
    case Actions.SET_COMPANIES:
      return { ...state, companies: action.payload };
    case Actions.SET_REPORTS:
      return { ...state, reports: action.payload };
  }
};
