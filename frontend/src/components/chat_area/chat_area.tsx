import { useContext, useState } from "react";
import MessageBox from "./message_box";

const ChatArea = (props: any) => {
  type messageDataType = {
    message: string;
    metadata: {
      time: string;
      sender: string;
      sendTo: string;
    };
  };

  const [messageValue, setMessageValue] = useState("");
  const [messageArrayObject, setMessageArrayObject] = useState<
    messageDataType[]
  >([]);

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

  const sendText = (e?: any) => {
    e.preventDefault();

    if (messageValue !== "") {
      const message_data: messageDataType = {
        message: messageValue,
        metadata: {
          time: currentTime,
          sender: props.username,
          sendTo: "",
        },
      };
      setMessageArrayObject([...messageArrayObject, message_data]);
      setMessageValue("");
      console.log(messageArrayObject);
    }
  };

  return (
    <div className="chatArea" onSubmit={(e) => sendText(e)}>
      <ul className="message_ul">
        {messageArrayObject.map((value: messageDataType, index: number) => (
          <MessageBox key={index} value={value} />
        ))}
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
