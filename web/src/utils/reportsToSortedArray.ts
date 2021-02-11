import { CompanyReportDictionary } from "../services/types";
import { productionPercent } from "./calcStats";

export function reportsToSortedArray(
  reports: CompanyReportDictionary,
  by: string,
  asc: boolean
) {
  let arr = Object.values(reports);
  if (by === "name") {
    if (asc) {
      arr = arr.sort((a, b) => a.account.user.localeCompare(b.account.user));
    } else {
      arr = arr.sort((a, b) => b.account.user.localeCompare(a.account.user));
    }
  } else if (by === "prod") {
    if (asc) {
      arr = arr.sort((a, b) =>
        productionPercent(a) > productionPercent(b) ? 1 : -1
      );
    } else {
      arr = arr.sort((a, b) =>
        productionPercent(b) > productionPercent(a) ? 1 : -1
      );
    }
  } else if (by === "kc") {
    if (asc) {
      arr = arr.sort((a, b) =>
        Number(a.account.balance) > Number(b.account.balance) ? 1 : -1
      );
    } else {
      arr = arr.sort((a, b) =>
        Number(b.account.balance) > Number(a.account.balance) ? 1 : -1
      );
    }
  }
  return arr;
}
