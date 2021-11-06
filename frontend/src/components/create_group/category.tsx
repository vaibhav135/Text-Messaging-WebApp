import React, { useState } from "react";

const Category = (props: any) => {
  const [selected, setSelected] = useState(false);

  const processEachCategory = () => {
    setSelected(!selected);
    if (!selected) {
      props.addCategories();
    } else {
      props.subtractCategories();
    }
  };

  return (
    <>
      <li
        style={
          selected
            ? {
                backgroundColor: "#90E0EF",
                border: "1px solid #023E8A",
                color: "#023E8A",
              }
            : {}
        }
        className="textFont2 category_li"
        onClick={processEachCategory}
      >
        {" "}
        {props.value}{" "}
      </li>
    </>
  );
};

export default Category;
