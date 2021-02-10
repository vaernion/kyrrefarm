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
      dispatch({ type: Actions.LOADING_BEGIN });
      let companies = await reportServiceClient.getCompanies();
      let reports = await reportServiceClient.getAllReports();
      dispatch({ type: Actions.SET_COMPANIES, payload: companies });
      dispatch({ type: Actions.SET_REPORTS, payload: reports });
      dispatch({ type: Actions.LOADING_END });
    }
    fetchData();
  }, [isRequestingUpdate]);

  return (
    <>
      <StoreContext.Provider value={{ state, dispatch, setIsRequestingUpdate }}>
        {children}
      </StoreContext.Provider>
    </>
  );
}
