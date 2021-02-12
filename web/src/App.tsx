import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  CompanyInfo,
  CompanyList,
  ErrorsWrapper,
  KyrrecoinFacts,
  LoadingWrapper,
  Menu,
  NotFound,
  Overview,
} from "./components";
import { Store } from "./Store";

type AppRoutes = {
  path: string;
  component: React.ReactNode | React.LazyExoticComponent<() => JSX.Element>;
}[];

const appRoutes: AppRoutes = [
  {
    path: "/",
    component: <Overview />,
  },
  {
    path: "/companies",
    component: <CompanyList />,
  },
  {
    path: "/companies/:companyName",
    component: <CompanyInfo />,
  },
  {
    path: "/kyrrecoin",
    component: <KyrrecoinFacts />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];

export function App() {
  return (
    <Router>
      <Store>
        <Menu />
        <Switch>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} exact={true}>
              <ErrorsWrapper>
                <LoadingWrapper>{route.component}</LoadingWrapper>
              </ErrorsWrapper>
            </Route>
          ))}
        </Switch>
      </Store>
    </Router>
  );
}
