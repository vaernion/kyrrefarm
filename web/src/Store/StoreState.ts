import { CompanyReportDictionary } from "../services/types";

export type StoreState = {
  isLoading: boolean;
  favoriteCompany: string | null;
  companies: string[];
  reports: CompanyReportDictionary;
  errors: ErrorWithDate[];
};
export const initialState: StoreState = {
  isLoading: true,
  favoriteCompany: localStorage.getItem("favoriteCompany"),
  companies: [],
  reports: {},
  errors: [],
};

export type ErrorWithDate = {
  error: Error;
  date: Date;
};
