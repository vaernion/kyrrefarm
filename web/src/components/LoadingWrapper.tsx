import { Flex, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { StoreContext } from "../Store";

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const { state } = useContext(StoreContext);

  if (state.isLoading) {
    return (
      <Flex justify="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }
  return <>{children}</>;
}
