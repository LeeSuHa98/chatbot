import {Grid, Paper, styled} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import avatar from '../../images/avatar.png';
import {theme} from "../../muiTheme";

const ChatBotMessage = styled('div')`
  overflow-y: scroll;
  margin-bottom: 2rem;
`

const ChatCss = styled('div')`
  max-width: 50vw;
  padding: 0.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`

const BotCss = styled('div')`
  padding: 0.5rem;
  align-self: flex-start;
  background-color: #f1f1f1;
  border-radius: 16px;
  margin-left: 0.5em;
`

const UserCss = styled('div')`
  padding: 0.5rem;
  align-self: flex-end;
  border-radius: 16px;
  background-color: ${theme.palette.primary.main};
  color: white;
`

const OptionCss = styled('div')`
  display: flex;
  margin-left: 3em;
`

const OptionListCss = styled('p')`
  padding: 0.5em;
  align-self: flex-start;
  border: 1px solid ${theme.palette.primary.main};
  border-radius: 16px;
  margin-right: 0.5em;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
    background-color: ${theme.palette.primary.main};
    color: white;
  }
`

const ImageCss = styled('img')`
  border-radius: 50%;
 
`
interface MessagesInfo {
    purpose?: string;
    message: string;
    options?: string[];
    sender: string;
}

interface ResponseProps {
    userResponse: string;
    botResponse: {
        purpose: string;
        message: string;
        options?: string[];
        sender: string;
    };
    sendUserResponse: string;
    optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

const Chat = ({userResponse, botResponse, sendUserResponse, optionClick }: ResponseProps) => {
    const [messages, setMessages] = useState<MessagesInfo[]>([]);
    const bodyRef = useRef<HTMLDivElement>(null);
    const dummyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
            bodyRef.current.scrollTo({
                top: dummyRef.current.offsetTop,
                behavior: "smooth"
            });
        }
    }, [messages]);

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    purpose: "first question",
                    message: "반갑습니다 👋 MBTI Lab 입니다 !",
                    options: ["간단 명료한 MBTI 검사 시작하기", "아니 나는 이미 알고있어 !"],
                    sender: "bot",
                }
            ]);
        } else {
            let tempArray = [...messages];
            tempArray.push({ message: sendUserResponse, sender: "user" });
            setMessages(tempArray);

            setTimeout(() => {
                let temp2 = [...tempArray];
                temp2.push(botResponse);
                setMessages(temp2);
            }, 1000);
        }
    }, [sendUserResponse, botResponse]);

    return (
        <>
            <ChatBotMessage ref={bodyRef}>
                {messages.map((chat, index) => (
                    <ChatCss key={index}>
                        {chat.sender === 'bot'
                            ?
                            <Grid display={'flex'}>
                                {/** FIXME: change image style component*/}
                                <img src={avatar} alt="Avatar" width={'40px'} height={'40px'} style={{borderRadius: '50%'}}/>
                                <BotCss>{chat.message}</BotCss>
                            </Grid>
                            :
                            <UserCss>{chat.message}</UserCss>
                        }
                        {chat.options ? (
                            <OptionCss>
                                {chat.options.map(option => (
                                    <OptionListCss
                                        onClick={e => optionClick(e)}
                                        data-id={option}
                                        key={option}
                                    >
                                        {option}
                                    </OptionListCss>
                                ))}
                            </OptionCss>
                        ) : null}
                    </ChatCss>
                ))}
                <Grid ref={dummyRef} />
            </ChatBotMessage>
        </>
    )
}

export default Chat;