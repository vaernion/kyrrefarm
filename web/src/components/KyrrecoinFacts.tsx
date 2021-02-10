import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { StoreContext } from "../Store";
import { StatBox } from "./StatBox";

export function KyrrecoinFacts() {
  const { state } = useContext(StoreContext);

  const totalCoins = Object.values(state.reports)
    .reduce((acc, cur) => acc + Number(cur.account.balance), 0)
    .toFixed(3);

  return (
    <Flex justify="center">
      <Stack direction="column">
        <Box>
          <Text fontWeight="bold">The Kyrrecoin Economy</Text>
        </Box>
        <StatBox label="Total coins" number={totalCoins} unit=" KC" />
      </Stack>
    </Flex>
  );
}
