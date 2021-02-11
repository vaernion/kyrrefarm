import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Store";
import { FavoriteCompanyButton } from "./";

export function CompanyList() {
  const { state } = useContext(StoreContext);

  return (
    <Flex justify="center">
      <SimpleGrid columns={[1, 2, 3, 4]}>
        {state.companies.map((company, i) => (
          <HStack key={i} m={1}>
            <FavoriteCompanyButton
              company={company}
              isFavorite={state.favoriteCompany === company}
            />
            <Link to={"companies/" + company}>{company}</Link>
          </HStack>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
