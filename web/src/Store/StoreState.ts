import { CompanyReportDictionary } from "../services/types";

export type StoreState = {
  isLoading: boolean;
  favoriteCompany: string | null;
  companies: string[];
  reports: CompanyReportDictionary;
  isDemo: boolean;
  errors: ErrorWithDate[];
};
export const initialState: StoreState = {
  isLoading: true,
  favoriteCompany: localStorage.getItem("favoriteCompany"),
  companies: [],
  reports: {},
  isDemo: false,
  errors: [],
};

export type ErrorWithDate = {
  error: Error;
  date: Date;
};
