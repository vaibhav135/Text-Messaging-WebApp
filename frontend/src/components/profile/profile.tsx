import { useContext, useEffect, useState } from "react";

import InterestList from "./interest_list";
import GenerateAvatar from "./generate_avatar";
import LoginContext from "../context_provider/login_context";
import TopNavigation from "../navigation/navigation_bar/navigation_bar";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsGenderMale } from "react-icons/bs";
import { IconContext } from "react-icons";

import "./profile.css";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const { userInfoHook } = useContext(LoginContext);
  const [username, setUserName] = useState(userInfoHook.username);
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [dataListInput, setDataListInput] = useState("");
  const [hobbies, setHobbies] = useState<String[]>([]);
  const [gender, setGender] = useState("");
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    instagram: "",
    github: "",
  });
  const [profilePicture, setProfilePicture] = useState("");
  const [skipBtn, setSkipBtn] = useState(true);
  const [refreshPage, setRefreshPage] = useState(true);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const history = useHistory();

  useEffect(() => {
    if (refreshPage) {
      setRefreshPage(!refreshPage);
      const avatar_string = async () => {
        await sleep(1000);
        const someVar = await GenerateAvatar().then((res: any) =>
          setProfilePicture(res.data)
        );
      };
      avatar_string();
      //console.log(avatar_string);
    }
  }, [refreshPage]);

  //console.log(profile_picture());
  const profileSubmit = (events: any) => {
    events.preventDefault();
    history.push("/home");
  };

  const generateAnotherAvatar = () => {
    setRefreshPage(!refreshPage);
  };

  const profile_len = profilePicture.length;
  let profileImage = "";
  if (profile_len > 0) {
    profileImage = `data:image/svg+xml;utf8,${encodeURIComponent(
      profilePicture
    )}`;
    console.log(typeof profileImage);
  }

  const interest_list = InterestList();

  const removeInterests = (value: String) => {
    setHobbies(hobbies.filter((elements) => elements !== value));
  };

  const skipTohome = () => {
    history.push("/home");
  };

  return (
    <div className="profile_main_div">
      <TopNavigation
        className="top_navigation"
        userId={userInfoHook.id}
        username={username}
      />
      <div className="profile_div">
        <div className="profile_header_div">
          {skipBtn ? (
            <h3 className="profile_skip_btn" onClick={skipTohome}>
              {" "}
              skip{" "}
            </h3>
          ) : (
            <> </>
          )}{" "}
          <h1 className="profile_heading"> Profile </h1>
        </div>
        {profile_len > 0 ? (
          <img alt="user_avatar" id="avatar_image" src={profileImage} />
        ) : (
          <> </>
        )}{" "}
        <button className="generate_avatar_btn" onClick={generateAnotherAvatar}>
          {" "}
          generator another avatar
        </button>
        <form onSubmit={(e) => profileSubmit(e)} className="profile_form">
          <label htmlFor="username" id="profile_label">
            {" "}
            username
          </label>
          <input type="text" id="username_input" value={username} disabled />
          <label htmlFor="profile_name" id="profile_label">
            {" "}
            profile name{" "}
          </label>
          <input
            type="text"
            id="profile_name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            autoComplete="off"
          />
          <label id="profile_label" htmlFor="profile_description">
            {" "}
            describe yourself
          </label>
          <textarea
            id="profile_description"
            value={profileDescription}
            onChange={(e) => setProfileDescription(e.target.value)}
          ></textarea>
          <label htmlFor="profile_gender" id="profile_label">
            {" "}
            gender{" "}
          </label>
          <select
            id="profile_gender"
            defaultValue="Select a gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male"> male</option>
            <option value="female"> female </option>
            <option value="others"> others </option>
          </select>

          <label htmlFor="" id="profile_label">
            {" "}
            interests{" "}
          </label>
          <div className="interests_input_div">
            <input
              list="profile_interests"
              className="profile_interests"
              placeholder="Select an option"
              value={dataListInput}
              onChange={(e) => setDataListInput(e.target.value)}
            />
            <datalist id="profile_interests">
              {interest_list.map((value: string, index: number) => (
                <option key={index} value={value}>
                  {" "}
                  {value}{" "}
                </option>
              ))}
            </datalist>
            <button
              onClick={() => {
                setHobbies((preValue) => [...preValue, dataListInput]);
                setDataListInput("");
              }}
              className="data_list_add_btn"
            >
              add
            </button>
          </div>

          <div className="show_interests_div">
            {hobbies.length > 0 ? (
              <h3 className="show_interests_div_heading1">
                {" "}
                Selected options{" "}
              </h3>
            ) : (
              <h3 className="show_interests_div_heading2">
                {" "}
                No options selected{" "}
              </h3>
            )}

            <ul className="interests_list_ul">
              {hobbies.map((value: String, index: number) => (
                <RenderHobbies
                  value={value}
                  key={index}
                  removeInterests={() => removeInterests(value)}
                />
              ))}
            </ul>
          </div>

          <h2 className="profile_subheading"> Social Media</h2>
          <label htmlFor="facebook_inputType" id="profile_label">
            {" "}
            facebook{" "}
          </label>
          <input
            id="facebook_inputType"
            type="url"
            value={socialMedia.facebook}
            onChange={(e) =>
              setSocialMedia({
                facebook: e.target.value,
                instagram: "",
                github: "",
              })
            }
          />
          <label htmlFor="instagram_inputType" id="profile_label">
            {" "}
            instagram{" "}
          </label>
          <input
            type="url"
            id="instagram_inputType"
            value={socialMedia.instagram}
            onChange={(e) =>
              setSocialMedia({
                facebook: "",
                instagram: e.target.value,
                github: "",
              })
            }
          />
          <label id="profile_label" htmlFor="github_inputType">
            {" "}
            github{" "}
          </label>
          <input
            type="url"
            id="github_inputType"
            value={socialMedia.github}
            onChange={(e) =>
              setSocialMedia({
                facebook: "",
                instagram: "",
                github: e.target.value,
              })
            }
          />
          <input type="submit" className="profile_submit_btn" />
        </form>{" "}
      </div>
    </div>
  );
};

const RenderHobbies = (props: any) => {
  return (
    <>
      <div className="interests_list_div">{props.value} </div>
      <AiOutlineCloseCircle
        className="interests_remove_btn"
        onClick={props.removeInterests}
      />
    </>
  );
};

export default Profile;
