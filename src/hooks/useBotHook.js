import {useEffect, useRef, useState} from "react";
import axios from "axios";

const useBotHook = () => {
    const messageAreaRef = useRef();
    const inputMessage = useRef('');

    const [chat, setChat] = useState([]);
    const [botTyping, setbotTyping] = useState(false);
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const name = "shreyas";
        const request_temp = {sender: "user", sender_id: name, msg: inputMessage.current.value.trim()};

        if (request_temp.msg !== "") {
            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            inputMessage.current.value = "";
            await rasaAPI(name, request_temp.msg);
        } else {
            window.alert("Please enter valid message");
        }
    }

    const rasaAPI = async (name, msg) => {
        const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
            sender: name, msg
        });
        if (response.data) {
            console.log(response.data)
            const temp = response.data[0];
            const recipient_id = temp["recipient_id"];
            const recipient_msg = temp["text"];

            const response_temp = {sender: "bot", recipient_id: recipient_id, msg: recipient_msg};
            setbotTyping(false);
            setChat(chat => [...chat, response_temp]);
        }
    }

    useEffect(() => {
        const objDiv = messageAreaRef.current;
        objDiv.scrollTop = objDiv.scrollHeight;

    }, [chat])
    return {chat, messageAreaRef, inputMessage, handleSubmit, botTyping}

}

export default useBotHook;