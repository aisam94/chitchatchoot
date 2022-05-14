import { User } from "@firebase/auth";

const getRecipientEmail = (
  users: string[],
  usersLoggedIn: User | null | undefined
): string => {
  if (!usersLoggedIn) {
    return "";
  }

  const result = users?.filter(
    (userToFilter: string) => userToFilter !== usersLoggedIn?.email
  )[0];

  return result;
};

export default getRecipientEmail;
