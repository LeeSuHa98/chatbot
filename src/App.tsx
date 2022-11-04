import { Container, styled } from "@mui/material";
import ChatBot from "./component/chatbot/ChatBot";

const BodyCss = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff;
`
function App() {
  return (
    <>
        <Container>
            <BodyCss>
                <ChatBot/>
            </BodyCss>
        </Container>
    </>
  );
}

export default App;
