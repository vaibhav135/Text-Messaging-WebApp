import axios from "axios";
import { useState, useEffect } from "react";
import "./profile.css";

const GenerateAvatar = async () => {
  function getRandomText(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  let response;
  try {
    response = await axios.get(
      "https://api.multiavatar.com/" + JSON.stringify(getRandomText(5))
    );

    //console.log(response);
  } catch (error) {
    console.error(error);
  }

  return response;
};

export default GenerateAvatar;
