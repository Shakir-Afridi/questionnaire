import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import QUESTIONS from "../data/questions.json";
import { Answer } from "../components/Step";

interface QuestionaireState {
    currentStep: number;
    answers: { [key: string]: Answer };
    questions: typeof QUESTIONS;
}

const initialState: QuestionaireState = {
    currentStep: 0,
    answers: {},
    questions: QUESTIONS,
};

const QuestionaireSlice = createSlice({
    name: "questionaire",
    initialState,
    reducers: {
        handleChangeIndex: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                currentStep: action.payload,
            };
        },
        handleChangeAnswer: (
            state,
            action: PayloadAction<{ step: number; option: any }>
        ) => {
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.payload.step]: action.payload.option,
                },
            };
        },
    },
});

export const { handleChangeIndex, handleChangeAnswer } =
    QuestionaireSlice.actions;
export default QuestionaireSlice.reducer;
