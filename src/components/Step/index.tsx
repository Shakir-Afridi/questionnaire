import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import Option from "../Option";

export interface Answer {
    answer: {
        label: string;
        icon: string;
    };
    question?: string;
}

interface StepProps {
    step: { title: string; options?: Array<{ icon: string; label: string }> };
    stepIndex: number;
    onOptionSelect: (step: number, option: any) => void;
    answer?: Answer;
}

const Step: React.FC<StepProps> = ({
    step,
    stepIndex,
    onOptionSelect,
    answer,
}) => {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid
                item
                xs={12}
                sm={6}
                sx={{
                    height: { xs: "30vh", sm: "100vh" },
                    alignContent: "center",
                    background: theme.palette.primary.main,
                    color: "#fff",
                }}
            >
                <h1 data-testid="step-title">{step.title}</h1>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                sx={{
                    height: { xs: "30vh", sm: "100vh" },
                    alignContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        ml: 1,
                    }}
                >
                    {step?.options?.map((option) => (
                        <Option
                            data-testid="step-options"
                            key={option.label}
                            icon={option.icon}
                            label={option.label}
                            isSelected={answer?.answer?.label === option.label}
                            onSelect={() => onOptionSelect(stepIndex, option)}
                        />
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Step;
