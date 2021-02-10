import {
  Badge,
  Box,
  Center,
  Container,
  Flex,
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
import { useContext } from "react";
import { useParams } from "react-router-dom";
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
        <Box>
          <Text fontWeight="bold">
            <FavoriteCompanyButton
              company={name}
              isFavorite={state.favoriteCompany === name}
            />
            {company.account.user}
            {webchecks[0].page_up === "yes" ? (
              <Badge ml={1} colorScheme="green">
                Up
              </Badge>
            ) : (
              <Badge ml={1} colorScheme="red">
                Down
              </Badge>
            )}
          </Text>
        </Box>

        <StatBox
          label="Time in production"
          number={webchecks[0].time_in_production}
          unit="%"
          toFixed={3}
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
                <Th>Count</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(clerks[0].vm_count)
                .filter((e) => Number(e[1]) > 0)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map((e) => (
                  <Tr>
                    <Td>{e[0]}</Td>
                    <Td>{e[1]}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Flex>
  );
}
