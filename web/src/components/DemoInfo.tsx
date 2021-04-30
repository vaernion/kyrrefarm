import { IconButton } from "@chakra-ui/button";
import { useBoolean } from "@chakra-ui/hooks";
import { CloseIcon } from "@chakra-ui/icons";
import { Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { useContext } from "react";
import { StoreContext } from "../Store";

export function DemoInfo() {
  const { state } = useContext(StoreContext);
  const [showInfo, setShowInfo] = useBoolean(true);

  if (!state.isDemo || !showInfo) return null;

  return (
    <Container border="2px" borderRadius="xl" mb={6} centerContent w="auto">
      <Flex justify="center" align="center" width="100%">
        <Heading size="md">Demo</Heading>
        <IconButton
          aria-label="hide demo info"
          onClick={setShowInfo.off}
          icon={<CloseIcon />}
          marginLeft={2}
          alignSelf="flex-end"
        />
      </Flex>
      <Flex direction="row" justify="center">
        <Text>Example data, from server (source is unreliable)</Text>
      </Flex>
    </Container>
  );
}
