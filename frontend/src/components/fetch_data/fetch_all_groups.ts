/*
 * The FetchAllGroups groups functions will fetch all the groups
 * from the backend that has been created by different users.
 * Default group will be community group.
 */

const FetchAllGroups = () => {
  const groups = {
    groups: [
      {
        name: "Community group",
        description: "It's a community group",
        profile_image: "some image link",
        members: [
          "Alan",
          "Tara",
          "Mara",
          "Mila",
          "Sebastian",
          "Ani",
          "Ken",
          "Wanne",
        ],
        owner: "Alan",
        Admins: ["Alan", "Tara", "Mara", "Sebastian"],
        created_on: "1/11/2021 10:40:34 pm",
      },
    ],
  };

  // returning the dummy object
  return groups;
};

export default FetchAllGroups;
