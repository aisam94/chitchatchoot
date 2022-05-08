import { User } from "@firebase/auth";

const getRecipientEmail = (
  users: string[],
  usersLoggedIn: User | null | undefined
): string => {
  //this is only for 1 to 1 chat as only filter one user from array
  //maybe there is a better way to extract email

  if (!usersLoggedIn) {
    return "";
  }

  const result = users?.filter(
    (userToFilter: string) => userToFilter !== usersLoggedIn?.email
  )[0];

  return result;
};

export default getRecipientEmail;
