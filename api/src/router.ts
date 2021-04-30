import express from "express";
import { reportService } from "./ReportService";

export const router = express.Router();

// Cache-Control
router.use((req, res, next) => {
  // const seconds = 5 * 60;
  // if (req.method == "GET") {
  // res.set("Cache-control", `public, max-age=${seconds}`);
  // } else {
  res.set("Cache-control", `no-store`);
  // }
  next();
});

const apiTree = {
  _links: {
    self: { href: "/", methods: ["get"] },
    companyNames: {
      href: "companynames",
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

router.get("/companynames", async (req, res) => {
  const maxAttempts = 3;
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      let formattedOutput = await reportService.getCompanies();
      res.status(200).send(formattedOutput);
      break;
    } catch (err) {
      attempts++;
      if (attempts < maxAttempts) {
        continue;
      } else {
        console.error(`router /companynames catch() ${err}`);
        res.status(500).send({ error: err.message });
        break;
      }
    }
  }
});

router.get("/reports/", async (req, res) => {
  const maxAttempts = 3;
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      let allReports = await reportService.getAllReports();
      res.status(200).send(allReports);
      break;
    } catch (err) {
      attempts++;
      if (attempts < maxAttempts) {
        continue;
      } else {
        console.error(`router /reports/ catch() ${err}`);
        res.status(500).send({ error: err.message });
        break;
      }
    }
  }
});

router.get("/reports/:company", async (req, res) => {
  const maxAttempts = 3;
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      let company = req.params.company;
      let reports = await reportService.getReports(company);

      if (reports) {
        res.status(200).send(reports);
      } else {
        res.status(404).send({ error: `Company '${company}' not found` });
      }
      break;
    } catch (err) {
      attempts++;
      if (attempts < maxAttempts) {
        continue;
      } else {
        console.error(`router /reports/:company catch() ${err}`);
        res.status(500).send({ error: err.message });
        break;
      }
    }
  }
});
