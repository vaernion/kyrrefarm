import {
  Center,
  Container,
  Link,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { StoreContext } from "../Store";
import { StoreState } from "../Store/StoreState";
import { CompanyInfo } from "./";

export function Overview() {
  const { state } = useContext(StoreContext);

  return (
    <>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={3}>
        {state.favoriteCompany ? (
          <Container ml={3} border="2px" borderRadius="xl">
            <Center>
              <Text as="i">Favorite</Text>
            </Center>
            <CompanyInfo companyNameOverride={state.favoriteCompany} />
          </Container>
        ) : null}

        {OverviewTable(state)}
      </SimpleGrid>
    </>
  );
}

const OverviewTable = (state: StoreState) => (
  <Container ml={3} border="2px" borderRadius="xl">
    <Center>
      <Text as="i">Overview</Text>
    </Center>
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Company</Th>
          <Th isNumeric>Production</Th>
          <Th isNumeric>Balance</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.values(state.reports).map((company, i) => (
          <Tr key={i}>
            <Td>
              <Text>
                <Link
                  as={ReactRouterLink}
                  to={"companies/" + company.account.user}
                >
                  {company.account.user}
                </Link>
              </Text>
            </Td>
            <Td isNumeric>
              {(
                (Number(company.account.time_up) /
                  (Number(company.account.time_up) +
                    Number(company.account.time_maint) +
                    Number(company.account.time_down))) *
                100
              ).toFixed(3)}
              %
            </Td>
            <Td isNumeric>{Number(company.account.balance).toFixed(3)}</Td>
          </Tr>
        ))}
        <Tr fontWeight="bold">
          <Td>Average</Td>
          <Td isNumeric>
            {(
              (Object.values(state.reports).reduce((acc, cur) => {
                let uptime =
                  Number(cur.account.time_up) /
                  (Number(cur.account.time_up) +
                    Number(cur.account.time_maint) +
                    Number(cur.account.time_down));
                return acc + Math.max(0, uptime);
              }, 0) /
                Object.values(state.reports).length) *
              100
            ).toFixed(3)}
            %
          </Td>
          <Td isNumeric>
            {(
              Object.values(state.reports).reduce(
                (acc, cur) => acc + Number(cur.account.balance),
                0
              ) / Object.values(state.reports).length
            ).toFixed(3)}
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </Container>
);
