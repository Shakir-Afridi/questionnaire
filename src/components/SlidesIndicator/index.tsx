import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CheckListIcon from "../../assets/images/check-list.png";

interface SlideIndicatorProps {
    steps: number;
}

const SlideIndicator: React.FC<SlideIndicatorProps> = ({ steps }) => {
    const { currentStep } = useSelector(
        (store: RootState) => store.questionnaire
    );

    return (
        <>
            <Typography
                sx={{
                    "& img": {
                        width: { xs: "30px", sm: "40px" },
                    },
                }}
            >
                <img
                    data-testid="logo"
                    src={CheckListIcon}
                    className="logo"
                    alt="CheckListIcon"
                />
            </Typography>

            <Box
                sx={{
                    position: "fixed",
                    left: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {Array.from({ length: steps - 1 }).map((_, index) => (
                    <Typography
                        data-testid="indicator"
                        component="span"
                        key={index}
                        className={`dot ${
                            index === currentStep ? "active" : ""
                        }`}
                    ></Typography>
                ))}
            </Box>
        </>
    );
};

export default SlideIndicator;
