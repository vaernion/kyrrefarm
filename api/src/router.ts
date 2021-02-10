import express from "express";
import { reportService } from "./ReportService";

export const router = express.Router();

router.use((req, res, next) => {
  const seconds = 60 * 5;
  if (req.method == "GET") {
    res.set("Cache-control", `public, max-age=${seconds}`);
  } else {
    res.set("Cache-control", `no-store`);
  }
  next();
});

const apiTree = {
  _links: {
    self: { href: "/", methods: ["get"] },
    companyNames: {
      href: "companies",
      methods: ["get"],
    },
    allCompanyReports: {
      href: "reports",
      methods: ["get"],
    },
    oneCompanyReports: {
      href: "reports/:companyName",
      methods: ["get"],
    },
  },
};

router.get("/", (req, res) => {
  res.status(200).send(apiTree);
});

router.get("/companies", async (req, res) => {
  try {
    let formattedOutput = await reportService.getCompanies();
    res.status(200).send(formattedOutput);
  } catch (err) {
    console.error(`router /companies catch() ${err}`);
    res.status(500).send({ error: err.message });
  }
});

router.get("/reports/", async (req, res) => {
  try {
    let allReports = await reportService.getAllReports();
    res.status(200).send(allReports);
  } catch (err) {
    console.error(`router /reports/ catch() ${err}`);
    res.status(500).send({ error: err.message });
  }
});

router.get("/reports/:company", async (req, res) => {
  try {
    let company = req.params.company;
    let reports = await reportService.getReports(company);

    if (reports) {
      res.status(200).send(reports);
    } else {
      res.status(404).send({ error: `Company '${company}' not found` });
    }
  } catch (err) {
    console.error(`router /reports/:company catch() ${err}`);
    res.status(500).send({ error: err.message });
  }
});
