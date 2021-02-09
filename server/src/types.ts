export type CompanyReport = {
  account: {
    [K in
      | "user"
      | "balance"
      | "endpoint"
      | "time_up"
      | "time_maint"
      | "time_down"
      | "company"]: string;
  };
  reports: (WebcheckReport | ClerkReport)[];
};

type WebcheckReport = { type: "webcheck" } & {
  [K in
    | "check_time"
    | "page_up"
    | "text_found"
    | "time_to_download"
    | "reward"
    | "qos_portion"
    | "time_in_production"
    | "worker_host"
    | "result"]: string;
};

type ClerkReport = {
  type: "clerk";
  vm_count: {
    [K in
      | "t1_small"
      | "m1_tiny"
      | "m1_large"
      | "m1_medium"
      | "r1_small"
      | "t1_medium"
      | "c1_medium"
      | "l1_medium"
      | "r1_large"
      | "t1_large"
      | "l1_small"
      | "r1_tiny"
      | "t1_xlarge"
      | "c1_xlarge"
      | "c1_large"
      | "t1_tiny"
      | "c1_small"
      | "r1_xlarge"
      | "m1_xlarge"
      | "m1_small"
      | "r1_medium"
      | "c1_tiny"
      | "l1_xlarge"
      | "l1_tiny"
      | "l1_2xlarg"
      | "l1_large"]: 0 | string;
  };
} & {
  [K in
    | "check_time"
    | "time_since_last_check"
    | "calculated_cost"
    | "result"
    | "worker_host"]: string;
};
