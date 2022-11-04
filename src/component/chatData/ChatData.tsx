const ChatData = (step: number, userResponse: string) => {
    return (
        step === 1 ?
        {
            purpose: "specify question",
            message: `문제가 닥쳤을 때 나는`,
            options: ["생각이 많아진다", "말이 많아진다"]
        } : step === 2 ?
                {
                purpose: "specify question2",
                message: `나는 요리할 때`,
                options: ["레시피 대로 정량 딱딱!", "계랑이 뭐야? 요리는 감!"]
                } : step === 3 ?
                    {
                        purpose: "specify question3",
                        message: `친구가 시험에 떨어졌다. 이때 나는?`,
                        options: ["다음엔 꼭 붙을거야", "무슨 시험인데? 몇점이야?"]
                    } : {
                        purpose: "specify question4",
                        message: `과제를 받았을 때 나는`,
                        options: ["일단 계획을 세우고..", "자료조사부터!"]
                    }
    )
};
export default ChatData;
