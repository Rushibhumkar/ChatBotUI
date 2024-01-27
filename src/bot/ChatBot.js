import styles from "./ChatBot.module.css";
import { BiBot } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import useBotHook from "../hooks/useBotHook";

const ChatBot = () => {
  const { chat, messageAreaRef, inputMessage, handleSubmit, botTyping } =
    useBotHook();

  return (
    <div className={styles.chatBody}>
      <header>
        <h1>Chat Assistant</h1>
        {botTyping ? <span>Bot Typing....</span> : null}
      </header>
      <div className={styles.MessageBody} ref={messageAreaRef}>
        <div className={styles.MessageArea}>
          <div className={styles.messageStart}>
            <BiBot className={styles.botIcon} />
            <h5 className={styles.BotMsg}>Hi How can I help you???</h5>
          </div>
          {chat.map((user, key) => (
            <div key={key}>
              {user.sender === "bot" ? (
                <div className={styles.messageStart}>
                  <BiBot className={styles.botIcon} />
                  <h5 className={styles.BotMsg}>{user.msg}</h5>
                </div>
              ) : (
                <div className={styles.messageEnd}>
                  <h5 className={styles.UserMsg}>{user.msg}</h5>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.InputFooter}>
        <textarea ref={inputMessage} placeholder="Type a message" />
        <button onClick={handleSubmit}>
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
