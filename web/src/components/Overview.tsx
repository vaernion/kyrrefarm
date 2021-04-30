import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
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
import { useContext, useEffect, useState } from "react";
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
      <SimpleGrid minChildWidth={["350px", "500px"]} spacing="10px">
        {state.favoriteCompany ? (
          <Box>
            <Container border="2px" borderRadius="2xl">
              <Center>
                <Text as="i">Favorite</Text>
              </Center>
              <CompanyInfo companyNameOverride={state.favoriteCompany} />
            </Container>
          </Box>
        ) : null}

        {OverviewTable(state)}
      </SimpleGrid>
    </>
  );
}

const OverviewTable = (state: StoreState) => {
  const [sortBy, setSortBy] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    document.title = "Overview - Kyrrefarm";
  }, []);

  const handleSort = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setSortAsc((s) => !s);
    } else {
      if (newSortBy === "name") {
        setSortAsc(true);
      } else {
        setSortAsc(false);
      }
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
                size="sm"
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
                size="sm"
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
                size="sm"
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
            (company, i) => {
              let recentWebcheck = company.reports.find(
                (e) => e.type === "webcheck"
              );
              let recentlyUp =
                recentWebcheck &&
                "page_up" in recentWebcheck &&
                recentWebcheck.page_up === "yes";
              return (
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
                      {recentlyUp ? (
                        <Badge ml={1} colorScheme="green">
                          Up
                        </Badge>
                      ) : (
                        <Badge ml={1} colorScheme="red">
                          Down
                        </Badge>
                      )}
                    </HStack>
                  </Td>

                  <Td>{productionPercent(company).toFixed(2)}%</Td>
                  <Td isNumeric>
                    {Number(company.account.balance).toFixed(2)}
                  </Td>
                </Tr>
              );
            }
          )}
          <Tr fontWeight="bold">
            <Td>Average</Td>
            <Td>{averageProductionPercent(state).toFixed(2)}%</Td>
            <Td isNumeric>{averageBalance(state).toFixed(2)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};
