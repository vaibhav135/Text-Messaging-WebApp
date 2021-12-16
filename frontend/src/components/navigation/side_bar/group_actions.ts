import axios from "axios";

export const removerUserFromGroup = async (data: object, url: string) => {
  await axios
    .delete(`${url}delete/api/removeMember`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${localStorage.getItem("token")}`,
      },
      data,
    })
    .then((res) => {
      if (res.data.status === "ok") {
        console.log("request successful");
      } else {
        console.log(res.data.error);
      }
    });
};

export const addUserToGroup = async (data: object, url: string) => {
  await axios
    .patch(`${url}patch/api/updateGroupMember`, data, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      if (res.data.status === "ok") {
        console.log("request successful");
      } else {
        console.log(res.data.error);
      }
    });
};
