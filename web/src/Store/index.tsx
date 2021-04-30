import { createContext, useEffect, useReducer, useState } from "react";
import { reportServiceClient } from "../services/ReportServiceClient";
import { Actions, StoreAction } from "./Actions";
import { storeReducer } from "./storeReducer";
import { initialState, StoreState } from "./StoreState";

export const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
  setIsRequestingUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  state: initialState,
  dispatch: (action: StoreAction) => action,
  setIsRequestingUpdate: () => {},
});

export function Store({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const [isRequestingUpdate, setIsRequestingUpdate] = useState(true);

  useEffect(() => {
    if (!isRequestingUpdate) return;

    async function fetchData() {
      try {
        dispatch({ type: Actions.LOADING_BEGIN });
        let companies = await reportServiceClient.getCompanies();
        let reports = await reportServiceClient.getAllReports();
        dispatch({ type: Actions.SET_COMPANIES, payload: companies.data });
        dispatch({ type: Actions.SET_REPORTS, payload: reports.data });
        dispatch({ type: Actions.SET_IS_DEMO, payload: reports.isDemo });
        dispatch({ type: Actions.LOADING_END });
      } catch (err) {
        dispatch({
          type: Actions.ERROR_FOUND,
          payload: {
            error: err.response?.data?.error
              ? new Error(`${err.message} ${err.response.data.error}`)
              : err,
            date: new Date(),
          },
        });
      }
    }

    fetchData();
    setIsRequestingUpdate(false);
  }, [isRequestingUpdate]);

  // automatically re-fetch every 5 minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setIsRequestingUpdate(true);
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <StoreContext.Provider value={{ state, dispatch, setIsRequestingUpdate }}>
        {children}
      </StoreContext.Provider>
    </>
  );
}
