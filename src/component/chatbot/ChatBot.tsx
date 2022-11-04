import {styled, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from "react";
import Chat from "../chat/Chat";
import ChatData from "../chatData/ChatData";
import {theme} from "../../muiTheme";

const ChatBotCss = styled('div')`
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-style: none;
  padding: 2em;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.08);
`

const IconCss = styled('button')`
  width: 43px;
  background: ${theme.palette.primary.main};
  border-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 0.5em;
  padding: 0;
  
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

const FormContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`

interface ResponseBotObject {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
}

const ChatBot = () => {
    const [userResponse, setUserResponse] = useState('');
    const [step, setStep] = useState<number>(0);
    const [botResponse, setBotResponse] = useState<ResponseBotObject>({
        purpose: "",
        message: "",
        sender: "bot"
    });
    const [sendUserResponse, setSendUserResponse] = useState<string>("");

    const setNextStep = (userResponse: string) => {
        setStep(prevState => prevState + 1);
        setSendUserResponse(userResponse);
        let res = ChatData(step, userResponse);
        setBotResponse({ ...res, sender: "bot" });
        setUserResponse("");
    };

    const optionClick = (e: React.MouseEvent<HTMLElement>) => {
        let option = e.currentTarget.dataset.id;
        if (option) {
            setNextStep(option);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNextStep(userResponse);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserResponse(e.target.value)
    }

    return (
        <ChatBotCss>
            <Chat
                userResponse={userResponse}
                botResponse={botResponse}
                sendUserResponse={sendUserResponse}
                optionClick={optionClick}
            />
            <form onSubmit={handleSubmit}>
                <FormContainer>
                    <TextField
                        fullWidth
                        maxRows={1}
                        size={'small'}
                        value={userResponse}
                        onChange={handleChange}
                        InputProps={{sx: {borderRadius: '20px', borderColor: `${theme.palette.primary.main}`}}}
                    />
                    <IconCss type={'submit'}>
                        <SendIcon sx={{fontSize: 20, color: '#fff'}} />
                    </IconCss>
                </FormContainer>
            </form>
        </ChatBotCss>
    )
}

export default ChatBot;