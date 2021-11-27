import { useContext, useState } from "react";

import Category from "./category";
import PopUpContext from "../context_provider/popup_context";
import { AiOutlineClose } from "react-icons/ai";

// Css in home_page.css

const CreateGroup = (props: any) => {
  // Since the user can only select 5 categores at max. If the user
  // selects more than 5 then a message will appear that they cannot
  // select more than 5
  const [restrictCategories, setRestrictCategories] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [descriptionTextArea, setDescriptionTextArea] = useState("");
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const { popUpState, setPopUpState } = useContext(PopUpContext);

  const url = process.env.REACT_APP_BACKEND_URL;
  console.log(url);
  console.log(props.userId + "\n" + props.username);

  //send date in ISO-8601 format
  const date = new Date().toISOString();
  console.log(date);
  console.log(new Date(date));

  const categories: string[] = [
    "memes",
    "comics",
    "fun",
    "music",
    "dancing",
    "outdoors",
    "gym",
    "health",
    "bikes",
    "cars",
    "hiking",
    "books",
    "political",
    "debate",
    "friends",
    "cooking",
    "sports",
    "video games",
    "technology",
    "programming",
    "science",
    "research",
    "education",
    "video creation",
    "tik tok",
    "dating",
    "cosmos",
  ];
  //console.log(typeof `Bearer ${localStorage.getItem("token")}`);

  // submit button will trigger this function
  const createGroupSubmit = async (e: any) => {
    e.preventDefault();
    //console.log(groupName);
    //console.log(descriptionTextArea);
    //console.log(categoryList);

    //post request here
    //		name: {type: String, required: true, unique:true},
    //description: {type: String},
    //tags:{type:[String]},
    //createdOn: {type: Date, required: true},
    //admins: {type: String,required: true },
    //moderators: {type: [Schema.Types.ObjectId] },
    //members: {type: [Schema.Types.ObjectId]},

    const data = {
      name: groupName,
      description: descriptionTextArea,
      tags: categoryList,
      createdOn: new Date(),
      admins: props.userId,
      moderators: [props.userId],
      members: [props.userId],
    };

    const res = await fetch(url + "post/api/createGroup", {
      method: "POST",
      credentials: "include",
      headers: {
        "x-access-token": `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.status === "ok") {
      console.log(res);
    } else {
      console.log(res.error);
    }

    setPopUpState(!popUpState);
  };

  const addCategories = (value: string) => {
    setRestrictCategories(restrictCategories + 1);
    setCategoryList([...categoryList, value]);
  };

  const subtractCategories = (value: string) => {
    setRestrictCategories(restrictCategories - 1);
    setCategoryList(categoryList.filter((item) => item !== value));
  };

  //console.log(restrictCategories);

  return (
    <div className="popup_page">
      <div className="inline_elements">
        <AiOutlineClose className="close_button" onClick={props.closeState} />{" "}
        <h1 className=" textFont1 heading_popup_page ">Create Group </h1>
      </div>
      {restrictCategories > 5 ? (
        <h3 className="textFont2" id="categories_restriction_warning">
          {" "}
          you can select upto 5 categories{" "}
        </h3>
      ) : (
        <> </>
      )}
      <form
        className="create_group_form"
        onSubmit={(e) => createGroupSubmit(e)}
      >
        <label
          htmlFor="group_name_input"
          className="textFont2"
          id="label_create_group"
        >
          Group Name{" "}
        </label>
        <input
          type="text"
          id="group_name_input"
          value={groupName}
          onChange={(e: any) => setGroupName(e.target.value)}
          required
        />
        <label
          htmlFor="description_textarea"
          className="textFont2"
          id="label_create_group"
        >
          {" "}
          Description{" "}
        </label>
        <textarea
          id="description_textarea"
          value={descriptionTextArea}
          onChange={(e: any) => setDescriptionTextArea(e.target.value)}
        >
          {" "}
        </textarea>
        <label id="label_create_group" className="textFont2">
          {" "}
          Select any five categories{" "}
        </label>
        <ul className="category_ul">
          {" "}
          {categories.map((value: string, index: number) => (
            <Category
              value={value}
              key={index}
              addCategories={() => addCategories(value)}
              subtractCategories={() => subtractCategories(value)}
            />
          ))}
        </ul>
        <input
          style={
            restrictCategories > 5
              ? {
                  pointerEvents: "none",
                }
              : {}
          }
          type="submit"
          value="Submit"
          className="create_group_submit_button"
        />
      </form>
    </div>
  );
};

export default CreateGroup;
