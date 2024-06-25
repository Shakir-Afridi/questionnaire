import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Step, { Answer } from "../Step";
import SlideIndicator from "../SlidesIndicator";
import { RootState } from "../../store";
import { handleChangeIndex } from "../../store/questionnaire";
import questions from "../../data/questions.json";

interface SlidesProps {
    onOptionSelect: (step: number, label: Answer) => void;
}

const Slides: React.FC<SlidesProps> = ({ onOptionSelect }) => {
    const slidesRef = useRef<HTMLDivElement>(null);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const { currentStep, answers } = useSelector(
        (store: RootState) => store.questionnaire
    );
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        if (slidesRef.current) {
            slidesRef.current?.scrollTo({
                top: slidesRef.current.clientHeight * currentStep,
                behavior: "smooth",
            });
        }
    }, [currentStep]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight } = e.currentTarget;
        const newStep = Math.round(scrollTop / clientHeight);
        if (scrollTop > lastScrollTop) {
            if (newStep > currentStep && newStep < questions.length) {
                dispatch(handleChangeIndex(currentStep + 1));
            }
        } else {
            if (newStep < currentStep && newStep >= 0) {
                dispatch(handleChangeIndex(currentStep - 1));
            }
        }
        setLastScrollTop(scrollTop);
    };

    const handleSelectOption = (s: any, option: any) => {
        dispatch(handleChangeIndex(currentStep + 1));
        onOptionSelect(s, option);
    };

    return (
        <Grid container>
            <Grid
                item
                xs={2}
                sm={1}
                sx={{ background: theme.palette.primary.main }}
            >
                <SlideIndicator
                    data-testid="slides-indicators"
                    steps={questions.length}
                />
            </Grid>
            <Grid item xs={10} sm={11}>
                <Box
                    sx={{
                        height: "100vh",
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        scrollSnapType: "y mandatory",
                    }}
                    ref={slidesRef}
                    onScroll={handleScroll}
                >
                    {questions.map((step, index) => (
                        <Box
                            sx={{
                                height: "100vh",
                                scrollSnapAlign: "start",
                            }}
                            key={index}
                            data-testid="step"
                        >
                            <Step
                                step={step}
                                stepIndex={index}
                                onOptionSelect={(s, option) =>
                                    handleSelectOption(s, {
                                        answer: option,
                                        question: step.title,
                                    })
                                }
                                answer={answers[index]}
                            />
                        </Box>
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Slides;
