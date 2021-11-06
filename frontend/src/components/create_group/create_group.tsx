import React, { useContext, useState } from "react";

import Category from "./category";
import PopUpContext from "../context_provider/popup_context";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

// Css in home_page.css

const CreateGroup = (props: any) => {
  // Since the user can only select 5 categores at max. If the user
  // selects more than 5 then a message will appear that they cannot
  // select more than 5
  const [restrictCategories, setRestrictCategories] = useState(0);
  const [descriptionTextArea, setDescriptionTextArea] = useState("");
  const { popUpState, setPopUpState } = useContext(PopUpContext);

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

  // submit button will trigger this function
  const createGroupSubmit = (e: any) => {
    setPopUpState(!popUpState);
  };

  console.log(restrictCategories);

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
      <form className="create_group_form" onSubmit={() => createGroupSubmit}>
        <label
          htmlFor="group_name_input"
          className="textFont2"
          id="label_create_group"
        >
          Group Name{" "}
        </label>
        <input type="text" id="group_name_input" required />
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
              addCategories={() =>
                setRestrictCategories(restrictCategories + 1)
              }
              subtractCategories={() =>
                setRestrictCategories(restrictCategories - 1)
              }
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
