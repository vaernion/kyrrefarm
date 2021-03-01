import { Container, Flex, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { StoreContext } from "../Store";

export function ErrorsWrapper({ children }: { children: React.ReactNode }) {
  const { state } = useContext(StoreContext);

  if (state.errors.length > 0) {
    return (
      <Flex justify="center">
        <Stack direction="column">
          {state.errors.map((errorWithDate, i) => (
            <Container key={i}>
              <Text>
                {errorWithDate.date.toLocaleString()}{" "}
                {errorWithDate.error.toString()}
              </Text>
            </Container>
          ))}
        </Stack>
      </Flex>
    );
  }
  return <>{children}</>;
}
