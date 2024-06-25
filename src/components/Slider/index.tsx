import React, { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Slides from "../Slides";
import Summary from "../Summary";
import { RootState } from "../../store";
import questions from "../../data/questions.json";
import { handleChangeAnswer } from "../../store/questionnaire";
import { Answer } from "../Step";

const Slider: React.FC = () => {
    const { currentStep } = useSelector(
        (store: RootState) => store.questionnaire
    );
    const dispatch = useDispatch();

    const handleOptionSelect = (step: number, option: Answer) => {
        dispatch(handleChangeAnswer({ step, option }));
    };

    return (
        <Box display="flex" justifyContent="center" sx={{ height: "100%" }}>
            {currentStep === questions.length - 1 ? (
                <Summary data-testid="summary" />
            ) : (
                <Slides
                    data-testid="slides"
                    onOptionSelect={handleOptionSelect}
                />
            )}
        </Box>
    );
};

export default Slider;
