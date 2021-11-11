import React from "react";

const MessageBox = (props: any) => {
  const metaData = props.value.metadata;
  const metaDataArray = [metaData.sender, metaData.time];
  const message = props.value.message;

  return (
    <div className="message_box">
      <ul className="message_metadata_ul textFont2">
        {" "}
        {metaDataArray.map((value: string, metadata_index: number) => (
          <li key={metadata_index}> {value} </li>
        ))}{" "}
      </ul>{" "}
      <li className="message_li">{message} </li>{" "}
    </div>
  );
};

export default MessageBox;
