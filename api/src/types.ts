export type CompanyReportDictionary = { [key: string]: CompanyReport };

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
  reports: (
    | WebcheckReport
    | ClerkReport
    | WebuseReport
    | ContinousReport
    | any
  )[];
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

type WebuseReport = { type: "webuse" } & {
  [K in "check_time" | "command" | "repetition"]: string;
};

type ContinousReport = { type: "continuous" } & {
  [K in
    | "check_time"
    | "command"
    | "reply_time_transfer"
    | "cpu_time_system_seconds"
    | "errors-total"
    | "errors-other"
    | "reply_size_content"
    | "errors-client-timo"
    | "errors-connreset"
    | "connection_time_median"
    | "reply_status_1xx"
    | "connections"
    | "connection_rate"
    | "cpu_time_system_percent"
    | "reply_status_4xx"
    | "connection_length_replies/conn"
    | "reply_size_header"
    | "net_io_kb/s"
    | "connection_time_avg"
    | "reply_status_2xx"
    | "reply_status_3xx"
    | "errors-addrunavail"
    | "errors-ftab-full"
    | "connection_time_min"
    | "connection_time_ms"
    | "errors-socket-timo"
    | "ms/conn"
    | "reply_size_total"
    | "errors-fd-unavail"
    | "reply_status_5xx"
    | "reply_rate_stddev"
    | "reply_time_response"
    | "replies"
    | "reply_size_footer"
    | "connection_time_stddev"
    | "errors-connrefused"
    | "request_rate_req/s"
    | "request_size"
    | "cpu_time_user_percent"
    | "requests"
    | "reply_rate_max"
    | "connection_time_max"
    | "cpu_time_user_seconds"
    | "reply_rate_avg"
    | "test-duration"
    | "reply_rate_min"
    | "request_rate_ms/req"]: string;
};
