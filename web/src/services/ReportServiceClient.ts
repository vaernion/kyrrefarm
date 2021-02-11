import axios from "axios";
import { CompanyReport, CompanyReportDictionary } from "./types";

const apiVersion = "/api/v1/";
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://kyrrefarm.herokuapp.com" + apiVersion
    : "http://localhost:4000" + apiVersion;
console.info(`BACKEND_URL: ${BACKEND_URL}`);

class ReportServiceClient {
  async getCompanies() {
    let url = `${BACKEND_URL}companynames`;
    let res = await axios.get(url);
    let data: string[] = res.data;
    return data;
  }

  async getAllReports() {
    let url = `${BACKEND_URL}reports`;
    let res = await axios.get(url);
    let data: CompanyReportDictionary = res.data;
    return data;
  }

  async getReports(companyName: string) {
    let url = `${BACKEND_URL}reports/${companyName}`;
    let res = await axios.get(url);
    let data: CompanyReport = res.data;
    return data;
  }
}

export const reportServiceClient = new ReportServiceClient();
