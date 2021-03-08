import { writeFileSync } from "fs";
import { companyNames } from "./names";
import { sshExec } from "./sshExec";
import { CompanyReport, CompanyReportDictionary } from "./types";

const reportsPath = "http://dcsg2003.skyhigh.iik.ntnu.no:9001";
const reportPrefix = "imt3003_report_last_100_";

class ReportService {
  #reportsCache: CompanyReportDictionary = {};
  #reportsFetchedDate: Date | null = null;
  #reportsCacheMinutes: number = 10;
  #reportsAlwaysUseCache: boolean = false;

  #companiesCache: string[] = companyNames;
  #companiesFetchedDate: Date | null = null;
  #companiesCacheMinutes: number = 60;
  #companiesAlwaysUseCache: boolean = true;

  #reportsArray: CompanyReport[] = [];

  async getCompanies() {
    if (
      !this.#companiesAlwaysUseCache &&
      (!this.#companiesFetchedDate ||
        Math.abs(new Date().getTime() - this.#companiesFetchedDate.getTime()) /
          1000 /
          60 >
          this.#companiesCacheMinutes)
    ) {
      let command = `curl -s ${reportsPath}/companies`;
      let output = await sshExec(command);

      let companies = output.stdout.split("\n").slice(1, -1).sort();

      this.#companiesFetchedDate = new Date();
      this.#companiesCache = companies;
      console.info(
        `${new Date().toJSON()} ReportService.getCompanies() cache miss`
      );
    } else {
      console.info(
        `${new Date().toJSON()} ReportService.getCompanies() cache hit`
      );
    }
    return this.#companiesCache;
  }

  async getAllReports() {
    if (
      !this.#reportsAlwaysUseCache &&
      (!this.#reportsFetchedDate ||
        Math.abs(new Date().getTime() - this.#reportsFetchedDate.getTime()) /
          1000 /
          60 >
          this.#reportsCacheMinutes)
    ) {
      if (this.#companiesCache.length === 0) {
        console.info(
          `${new Date().toJSON()} ReportService.getAllReports() empty companies cache`
        );
        await this.getCompanies();
      }
      let command = `for company in ${this.#companiesCache.join(
        " "
      )}; do curl -s ${reportsPath}/${reportPrefix}\${company}.json; echo ','; done`;
      let output = await sshExec(command);

      // slice away trailing comma for valid JSON syntax (comma + newline)
      let reportsJson = "[" + output.stdout.slice(0, -2) + "]";

      // handle invalid syntax in original files
      try {
        // parse to ensure valid syntax
        let reportsArray: CompanyReport[] = JSON.parse(reportsJson);
        this.#reportsArray = reportsArray;
      } catch (err) {
        if (err.message.includes("in JSON at position")) {
          console.time("ms to fix json formatting");
          let reportsJsonFixed = reportsJson
            //  fix double comma
            .split(",\n,")
            .join(",")
            // fix hanging comma at start of array
            .split("[\n,")
            .join("[")
            // fix trailing comma at end of array
            .split(",\n]")
            .join("]");
          console.timeEnd("ms to fix json formatting");

          if (process.env.NODE_ENV === "development") {
            writeFileSync("all-reports-stdout.log", reportsJson);
            writeFileSync("all-reports-fixed.json", reportsJsonFixed);
            writeFileSync("all-reports-stderr.log", output.stderr);
          }

          this.#reportsArray = JSON.parse(reportsJsonFixed);
        } else {
          throw err;
        }
      }
      // convert to a companyName->obj dictionary for easier lookups
      let reportsObj: {
        [key: string]: CompanyReport;
      } = this.#reportsArray.reduce(
        (acc, cur) => ({ ...acc, [cur.account.user]: cur }),
        {}
      );

      this.#reportsFetchedDate = new Date();
      this.#reportsCache = reportsObj;
      console.info(
        `${new Date().toJSON()} ReportService.getAllReports() cache miss`
      );
    } else {
      console.info(
        `${new Date().toJSON()} ReportService.getAllReports() cache hit`
      );
    }
    return this.#reportsCache;
  }

  async getReports(companyName: string) {
    if (
      !this.#reportsAlwaysUseCache &&
      (!this.#reportsFetchedDate ||
        Math.abs(new Date().getTime() - this.#reportsFetchedDate.getTime()) /
          1000 /
          60 >
          this.#reportsCacheMinutes)
    ) {
      await this.getAllReports();

      console.info(
        `${new Date().toJSON()} ReportService.getReports() cache miss`
      );
    } else {
      console.info(
        `${new Date().toJSON()} ReportService.getReports() cache hit`
      );
    }
    return this.#reportsCache.hasOwnProperty(companyName)
      ? this.#reportsCache[companyName]
      : null;
  }
}

export const reportService = new ReportService();
