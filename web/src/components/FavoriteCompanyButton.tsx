import { StarIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { StoreContext } from "../Store";
import { Actions } from "../Store/Actions";

export function FavoriteCompanyButton({
  company,
  isFavorite,
}: {
  company: string;
  isFavorite: boolean;
}) {
  const { dispatch } = useContext(StoreContext);
  const [isSaving, setIsSaving] = useState(false);

  const handleFavoriteCompany = () => {
    setIsSaving(true);
    if (isFavorite) {
      dispatch({ type: Actions.SET_FAVORITE_COMPANY, payload: null });
      localStorage.removeItem("favoriteCompany");
    } else {
      dispatch({ type: Actions.SET_FAVORITE_COMPANY, payload: company });
      localStorage.setItem("favoriteCompany", company);
    }
    setIsSaving(false);
  };

  return (
    <IconButton
      icon={<StarIcon />}
      aria-label={`Make ${company} favorite`}
      isLoading={isSaving}
      onClick={handleFavoriteCompany}
      isRound={true}
      size={"sm"}
      //   colorScheme="whiteAlpha"
      color={isFavorite ? "orange" : "gray"}
    />
  );
}
