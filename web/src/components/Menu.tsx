import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const menuItems: { href: string; name: string }[] = [
  {
    href: "/companies",
    name: "Companies",
  },
  {
    href: "/kyrrecoin",
    name: "Kyrrecoin",
  },
];

export function Menu() {
  return (
    <>
      <NavBar items={menuItems} />
    </>
  );
}

function NavBar({ items, ...rest }: { items: typeof menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((s) => !s);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <NavBarContainer {...rest}>
      <Logo
        text="Kyrrefarm"
        w="100px"
        // color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} items={items} />
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
      />
    </NavBarContainer>
  );
}

const NavBarContainer = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    mb={8}
    p={8}
    // bg={["primary.500", "primary.500", "transparent", "transparent"]}
    // color={["white", "white", "primary.700", "primary.700"]}
    {...rest}
  >
    {children}
  </Flex>
);

const MenuLinks = ({
  isOpen,
  items,
}: {
  isOpen: boolean;
  items: typeof menuItems;
}) => (
  <Box
    display={{ base: isOpen ? "block" : "none", md: "block" }}
    flexBasis={{ base: "100%", md: "auto" }}
  >
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
    >
      {items.map((item, i) => (
        <MenuItem key={i} href={item.href} abc="abc">
          {item.name}
        </MenuItem>
      ))}
    </Stack>
  </Box>
);

const Logo = ({ text, ...rest }: { text: string; [k: string]: any }) => (
  <Box {...rest}>
    <Link as={ReactRouterLink} to="/">
      <Text fontSize="lg" fontWeight="bold">
        {text}
      </Text>
    </Link>
  </Box>
);

const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => (
  <Box display={{ base: "block", md: "none" }} onClick={toggle}>
    {isOpen ? <CloseIcon /> : <HamburgerIcon />}
  </Box>
);

const MenuItem = ({
  children,
  href = "/",
  ...rest
}: {
  children: React.ReactNode;
  href: string;
  [k: string]: any;
}) => (
  <Link as={ReactRouterLink} to={href}>
    <Text display="block" {...rest}>
      {children}
    </Text>
  </Link>
);
