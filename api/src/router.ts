import express from "express";
import { reportService } from "./ReportService";

export const router = express.Router();

router.get("/companies", async (req, res) => {
  try {
    let formattedOutput = await reportService.getCompanies();
    res.status(200).send(formattedOutput);
  } catch (err) {
    console.log(`router /companies catch: ${err}`);
    res.status(500).send(err);
  }
});

router.get("/reports/", async (req, res) => {
  try {
    let reports = await reportService.getAllReports();
    res.status(200).send(reports);
  } catch (err) {
    console.log(`router /reports/ catch: ${err}`);
    res.status(500).send(err);
  }
});

router.get("/reports/:company", async (req, res) => {
  try {
    let company = req.params.company;
    let report = await reportService.getReports(company);

    if (report) {
      res.status(200).send(report);
    } else {
      res.status(404).send(`${company} not found`);
    }
  } catch (err) {
    console.log(`router /reports/:company catch: ${err}`);
    res.status(500).send(err);
  }
});
