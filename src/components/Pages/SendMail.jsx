import axios from "axios";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const SendMail = () => {
  const [editorState, setEditorState] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [subject, setSubject] = useState("");
  const handleSubmit = async () => {
    console.log(editorState, userEmail, subject);
    const senderMail =
      localStorage.getItem("userEmail") || "jaimins365635@gmail.com";
    const res = await axios.post(
      `https://react-http-8f419-default-rtdb.firebaseio.com/inbox/${
        userEmail.split("@")[0]
      }.json`,
      { mail: editorState, subject: subject, senderMail: senderMail }
    );
    console.log(res);
  };
  return (
    <div>
      <input
        onChange={(e) => setUserEmail(e.target.value)}
        className=" form-control mt-1"
        placeholder="Enter the mail Id"
        type="email"
      />
      <input
        onChange={(e) => setSubject(e.target.value)}
        className=" form-control mt-1"
        placeholder="Subject"
      />
      <Editor
        editorStyle={{ border: "1px solid", padding: "15px" }}
        wrapperStyle={{ padding: "20px" }}
        onEditorStateChange={(e) => console.log(e)}
        onChange={(e) => setEditorState(e.blocks[0].text)}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        SEND MAIL
      </button>
    </div>
  );
};

export default SendMail;
