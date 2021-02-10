import { CompanyReportDictionary } from "../services/types";

export enum Actions {
  LOADING_BEGIN = "LOADING_BEGIN",
  LOADING_END = "LOADING_END",
  SET_FAVORITE_COMPANY = "SET_FAVORITE_COMPANY",
  SET_COMPANIES = "SET_COMPANIES",
  SET_REPORTS = "SET_REPORTS",
}

type ToggleLoading = {
  type: Actions.LOADING_BEGIN | Actions.LOADING_END;
};

type SetFavoriteCompany = {
  type: Actions.SET_FAVORITE_COMPANY;
  payload: string | null;
};

type SetCompanies = {
  type: Actions.SET_COMPANIES;
  payload: string[];
};

type SetReports = {
  type: Actions.SET_REPORTS;
  payload: CompanyReportDictionary;
};

export type StoreAction =
  | ToggleLoading
  | SetFavoriteCompany
  | SetCompanies
  | SetReports;
