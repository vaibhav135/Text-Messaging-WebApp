import axios from "axios";
/*
 * The FetchAllGroups groups functions will fetch all the groups
 * from the backend that has been created by different users.
 * Default group will be community group.
 */

const FetchAllGroups = async () => {
  const url: string = process.env.REACT_APP_BACKEND_URL || "";
  let groups: any;
  try {
    groups = await axios.get(`${url}get/api/getAllGroups`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
  // returning the dummy object
  return groups;
};

export default FetchAllGroups;
