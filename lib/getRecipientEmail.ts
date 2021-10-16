//this is only for 1 to 1 chat as only filter one user from array
const getRecipientEmail = (users: any, usersLoggedIn: any) => {
  const result = users?.filter(
    (userToFilter: any) => userToFilter !== usersLoggedIn?.email
  );

  return result;
};

export default getRecipientEmail;
