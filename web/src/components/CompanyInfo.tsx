import {
  Badge,
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Stack,
  StatGroup,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ClerkReport, WebcheckReport } from "../services/types";
import { StoreContext } from "../Store";
import { FavoriteCompanyButton, StatBox } from "./";

export function CompanyInfo({
  companyNameOverride,
}: {
  companyNameOverride?: string;
}) {
  const { state } = useContext(StoreContext);
  const { companyName } = useParams<{ companyName: string }>();
  const name = companyNameOverride || companyName;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes(name)) {
      if (state.companies.includes(name)) {
        document.title = `${name} - Companies - Kyrrefarm`;
      } else {
        document.title = `[404 error] - Companies - Kyrrefarm`;
      }
    }
  }, [location.pathname, name, state.companies]);

  if (!state.companies.includes(name)) {
    return <Container>Company {name} does not exist</Container>;
  }

  const company = state.reports[name];
  const webchecks = state.reports[name].reports.filter(
    (e): e is WebcheckReport => e.type === "webcheck"
  );
  const clerks = state.reports[name].reports.filter(
    (e): e is ClerkReport => e.type === "clerk"
  );
  const income =
    Number(webchecks[0].reward) - Number(clerks[0].calculated_cost);

  return (
    <Flex justify="center">
      <Stack direction="column">
        <HStack>
          <FavoriteCompanyButton
            company={name}
            isFavorite={state.favoriteCompany === name}
          />
          <Text fontWeight="bold">{company.account.user}</Text>
          {webchecks[0].page_up === "yes" ? (
            <Badge ml={1} colorScheme="green">
              Up
            </Badge>
          ) : (
            <Badge ml={1} colorScheme="red">
              Down
            </Badge>
          )}
        </HStack>

        <StatBox
          label="Time in production"
          number={webchecks[0].time_in_production}
          unit="%"
          toFixed={2}
          helpText={webchecks[0].check_time}
          arrow={{
            value: (
              Number(webchecks[0].time_in_production) -
              Number(webchecks[webchecks.length - 1].time_in_production)
            ).toFixed(3),
            since: webchecks[webchecks.length - 1].check_time,
            unit: "%",
          }}
        />

        <StatGroup>
          <StatBox
            label="Balance"
            number={company.account.balance}
            toFixed={3}
            colorize
          />
          <StatBox label="Income" number={income} toFixed={3} colorize />
        </StatGroup>

        <StatBox
          label="Last webcheck reward"
          number={webchecks[0].reward}
          unit=" KC"
          toFixed={3}
          helpText={clerks[0].check_time}
          arrow={{
            value: (
              Number(webchecks[0].reward) -
              Number(webchecks[webchecks.length - 1].reward)
            ).toFixed(3),
            since: webchecks[webchecks.length - 1].check_time,
          }}
        />

        <StatBox
          label="Last clerk cost"
          number={clerks[0].calculated_cost}
          unit=" KC"
          toFixed={3}
          helpText={clerks[0].check_time}
          arrow={{
            value: (
              Number(clerks[0].calculated_cost) -
              Number(clerks[clerks.length - 1].calculated_cost)
            ).toFixed(3),
            since: clerks[clerks.length - 1].check_time,
          }}
        />

        <Box>
          <Center>
            <Text as="b">VMs</Text>
          </Center>
          <Table>
            <Thead>
              <Tr>
                <Th>Flavor</Th>
                <Th isNumeric>Count</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(clerks[0].vm_count)
                .filter((e) => Number(e[1]) > 0)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map((e, i) => (
                  <Tr key={i}>
                    <Td>{e[0]}</Td>
                    <Td isNumeric>{e[1]}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>

        <Box>
          <Center>
            <Text as="b">Bookface</Text>
          </Center>
          <Table>
            <Tbody>
              <Tr>
                <Td>Bonus</Td>
                <Td>
                  {webchecks[0].result.includes("bonus in action")
                    ? "Yes"
                    : "No"}
                </Td>
              </Tr>
              <Tr>
                <Td>Time to download</Td>
                <Td isNumeric>
                  {Number(
                    webchecks[0].result.includes("Download time longer than")
                      ? webchecks[0].result
                          .split(". Download time longer than")[0]
                          .split("time to download: ")[1]
                      : webchecks[0].result
                          .split(". Nunber of frontpage")[0]
                          .split("time to download: ")[1]
                  ).toFixed(2)}
                </Td>
              </Tr>
              <Tr>
                <Td>Frontpage users</Td>
                <Td isNumeric>
                  {
                    webchecks[0].result
                      .split(". Time since last")[0]
                      .split("users: ")[1]
                      .split(". Download time")[0]
                  }
                </Td>
              </Tr>
              <Tr>
                <Td>Images found</Td>
                <Td isNumeric>
                  {webchecks[0].result.includes("images found")
                    ? webchecks[0].result
                        .split(". time to download")[0]
                        .split("found: ")[1]
                    : 0}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Flex>
  );
}
