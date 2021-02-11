import { CompanyReport } from "../services/types";
import { StoreState } from "../Store/StoreState";

export function averageBalance(state: StoreState) {
  return (
    Object.values(state.reports).reduce(
      (acc, cur) => acc + Number(cur.account.balance),
      0
    ) / Object.values(state.reports).length
  );
}
export function averageProductionPercent(state: StoreState) {
  return (
    Object.values(state.reports).reduce(
      (acc, cur) => acc + Math.max(0, productionPercent(cur)),
      0
    ) / Object.values(state.reports).length
  );
}
export function productionPercent(company: CompanyReport) {
  return (
    (Number(company.account.time_up) /
      (Number(company.account.time_up) +
        Number(company.account.time_maint) +
        Number(company.account.time_down))) *
    100
  );
}
