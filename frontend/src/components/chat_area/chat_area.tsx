import { useContext, useEffect, useRef, useState } from "react";
import MessageBox from "./message_box";

import GroupContext from "../context_provider/group_context";

const ChatArea = (props: any) => {
  type messageDataType = {
    message: string;
    group_name: string;
    group_id: string;
    metadata: {
      time: string;
      sender: string;
      sender_id: string;
    };
  };

  const [messageValue, setMessageValue] = useState("");
  const [messageArrayObject, setMessageArrayObject] = useState<
    messageDataType[]
  >([]);
  const { groupSelected, setGroupSelected } = useContext(GroupContext);

  const socketState = useRef(true);
  const scrollToBottom = useRef<any>(null);

  useEffect(() => {
    if (socketState.current) {
      props.socket.on("received_message", (message_data: messageDataType) => {
        setMessageArrayObject((previousMessages) => [
          ...previousMessages,
          message_data,
        ]);
        console.log("message recieved: ");
        console.log(message_data);
      });
    }
    socketState.current = false;
  }, [props.socket]);

  useEffect(() => {
    //for auto-scrolling to the bottom
    scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
    socketState.current = true;
  }, [messageArrayObject]);

  function timeConverter(UNIX_timestamp: number) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    var time = date + " " + month + " " + hour + ":" + min;
    return time;
  }

  const unixTime = Math.round(+new Date() / 1000);
  const currentTime = timeConverter(unixTime);

  //NOTE:- Ignore comments below, for testing purposes only.
  //console.log(unixTime);
  //console.log(userMetadata);
  //console.log(typeof timeConverter(unixTime));

  const sendText = async (e?: any) => {
    e.preventDefault();

    if (messageValue !== "") {
      console.log("message not empty");
      const currentGroupInfo = props.groupsList.filter(
        (value: any) => value.name === groupSelected
      );
      //console.log(currentGroupInfo);
      const message_data: messageDataType = {
        message: messageValue,
        group_id: currentGroupInfo[0]._id,
        group_name: currentGroupInfo[0].name,
        metadata: {
          time: currentTime,
          sender: props.username,
          sender_id: props.userId,
        },
      };
      await props.socket.emit("send_message", message_data);
      //setMessageArrayObject([...messageArrayObject, message_data]);
      setMessageValue("");
      console.log(messageArrayObject);
    }
  };

  return (
    <div className="chatArea" onSubmit={(e) => sendText(e)}>
      <ul className="message_ul">
        {messageArrayObject.map((value: messageDataType, index: number) => (
          <MessageBox key={index} value={value} userIdSelf={props.userId} />
        ))}
        <div ref={scrollToBottom} />
      </ul>
      <form className="chatAreaForm">
        <textarea
          placeholder="type a message"
          className="inputMessage textFont2"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        />
        <input type="submit" value="send" className="sendBtn" />
      </form>
    </div>
  );
};

export default ChatArea;
