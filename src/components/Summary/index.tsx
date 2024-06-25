import {
    Box,
    Button,
    Typography,
    useTheme,
    CircularProgress,
    SvgIcon,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Summary: React.FC = () => {
    const { answers } = useSelector((store: RootState) => store.questionnaire);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const theme = useTheme();

    const submitAnswers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3001/submissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(answers),
            });
            const data = await response.json();
            alert("Submission successful");
            setIsLoading(false);
        } catch (error: any) {
            alert(`Error submitting answers: ${error?.message}`);
            setIsLoading(false);
        }
    };

    const answersArray = Object.entries(answers);

    return (
        <Box
            sx={{
                textAlign: "center",
                width: "100%",
                animation: "revealLeft 0.9s ease-out",
            }}
        >
            <Box
                sx={{
                    padding: "20px",
                    width: "100%",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                }}
            >
                Summary
            </Box>
            {answersArray.map(([stepIndex, step]) => (
                <Box
                    key={stepIndex}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #eee",
                        alignItems: "center",
                        padding: {
                            xs: "0 10px",
                            sm: "0 100px",
                        },
                    }}
                >
                    <Typography
                        component="div"
                        sx={{ fontSize: { xs: "12px", md: "32px" } }}
                    >
                        {step.question}
                        <Typography
                            color="textSecondary"
                            variant="subtitle1"
                            sx={{
                                textAlign: "left",
                                fontSize: { xs: "10px", md: "18px" },
                            }}
                        >
                            {step?.answer?.label}
                        </Typography>
                    </Typography>

                    <Box sx={{ fontSize: "2rem" }}>{step?.answer?.icon}</Box>
                </Box>
            ))}
            {answersArray?.length == 0 && (
                <Typography variant="h6" color="textSecondary">
                    No option selected for any question
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                sx={{ width: "200px", mr: 2, mt: 1 }}
                onClick={submitAnswers}
                disabled={isLoading || answersArray.length === 0}
            >
                Submit
                <SvgIcon sx={{ ml: 1 }}>
                    {isLoading ? (
                        <CircularProgress color="secondary" size={25} />
                    ) : (
                        <SendIcon />
                    )}
                </SvgIcon>
            </Button>
        </Box>
    );
};

export default Summary;
