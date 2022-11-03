import {Box, Button, Grid, InputBase, styled, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

const ChatbotCss = styled('div')`
  height: 60vh;
  width: 60vw;
  justify-content: center;
  border: 1px solid darkgray;
  border-radius: 16px;
`

const IconCss = styled('button')`
  width: 50px;
  background: #e5dfdf;
  color: #393e46;
  border-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-left: 4px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

const FormContainer = styled('div')`
  display: flex;
  margin: 20px
`
const ChatBot = () => {
    const [chat, setChat] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(chat);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChat(e.target.value)
    }

    return (
        <ChatbotCss>
            <form onSubmit={handleSubmit}>
                <FormContainer>
                    <TextField
                        label="궁금한 점을 입력해보세요 !"
                        fullWidth
                        maxRows={1}
                        size={'small'}
                        value={chat}
                        onChange={handleChange}
                    />
                    <IconCss type={'submit'}>
                        <SendIcon sx={{fontSize: 20}} />
                    </IconCss>
                </FormContainer>
            </form>
        </ChatbotCss>
    )
}

export default ChatBot;