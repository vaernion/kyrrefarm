import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Center,
  Container,
  HStack,
  IconButton,
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
import { useContext, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { StoreContext } from "../Store";
import { StoreState } from "../Store/StoreState";
import {
  averageBalance,
  averageProductionPercent,
  productionPercent,
} from "../utils/calcStats";
import { reportsToSortedArray } from "../utils/reportsToSortedArray";
import { CompanyInfo, FavoriteCompanyButton } from "./";

export function Overview() {
  const { state } = useContext(StoreContext);

  return (
    <>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={3}>
        {state.favoriteCompany ? (
          <Container border="2px" borderRadius="xl">
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

const OverviewTable = (state: StoreState) => {
  const [sortBy, setSortBy] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setSortAsc((s) => !s);
    } else {
      setSortBy(newSortBy);
    }
  };

  return (
    <Container border="2px" borderRadius="xl">
      <Center>
        <Text as="i">Overview</Text>
      </Center>
      <Table size="xs">
        <Thead>
          <Tr>
            <Th textDecoration={sortBy === "name" ? "underline" : ""}>
              Company
              <IconButton
                aria-label={`Sort by company ${
                  sortAsc ? "ascending" : "descending"
                }`}
                icon={sortAsc ? <ArrowDownIcon /> : <ArrowUpIcon />}
                onClick={() => handleSort("name")}
              />
            </Th>

            <Th textDecoration={sortBy === "prod" ? "underline" : ""}>
              Up
              <IconButton
                aria-label={`Sort by uptime ${
                  sortAsc ? "ascending" : "descending"
                }`}
                icon={sortAsc ? <ArrowDownIcon /> : <ArrowUpIcon />}
                onClick={() => handleSort("prod")}
              />
            </Th>

            <Th textDecoration={sortBy === "kc" ? "underline" : ""} isNumeric>
              KC
              <IconButton
                aria-label={`Sort by KC ${
                  sortAsc ? "ascending" : "descending"
                }`}
                icon={sortAsc ? <ArrowDownIcon /> : <ArrowUpIcon />}
                onClick={() => handleSort("kc")}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {reportsToSortedArray(state.reports, sortBy, sortAsc).map(
            (company, i) => (
              <Tr key={i}>
                <Td>
                  <HStack>
                    <FavoriteCompanyButton
                      company={company.account.user}
                      isFavorite={
                        state.favoriteCompany === company.account.user
                      }
                    />
                    <Link
                      as={ReactRouterLink}
                      to={"companies/" + company.account.user}
                    >
                      {company.account.user}
                    </Link>
                  </HStack>
                </Td>

                <Td>{productionPercent(company).toFixed(3)}%</Td>
                <Td isNumeric>{Number(company.account.balance).toFixed(3)}</Td>
              </Tr>
            )
          )}
          <Tr fontWeight="bold">
            <Td>Average</Td>
            <Td>{averageProductionPercent(state).toFixed(3)}%</Td>
            <Td isNumeric>{averageBalance(state).toFixed(3)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};
