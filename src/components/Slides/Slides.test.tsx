import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Slides from "./index";
import Step from "../Step";
import { handleChangeIndex } from "../../store/questionnaire";
import questions from "../../data/questions.json";

jest.mock("../Step", () => jest.fn(() => <div>Step Component</div>));
jest.mock("../SlidesIndicator", () =>
    jest.fn(() => <div>Slide Indicator</div>)
);

const mockStore = configureMockStore();
const initialState = {
    questionnaire: {
        currentStep: 0,
        answers: {},
    },
};

describe("Slides Component", () => {
    let store: any;
    const mockOnOptionSelect = jest.fn();

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    const renderWithProvider = (ui: React.ReactElement) => {
        return render(<Provider store={store}>{ui}</Provider>);
    };

    it("should render the correct number of steps", () => {
        renderWithProvider(<Slides onOptionSelect={mockOnOptionSelect} />);

        expect(screen.getAllByTestId("step").length).toBe(questions.length);
    });

    it("should render the slide indicator", () => {
        renderWithProvider(<Slides onOptionSelect={mockOnOptionSelect} />);

        expect(screen.getByTestId("slides-indicators")).toBeInTheDocument();
    });

    it("should dispatch handleChangeIndex when scrolling down", () => {
        renderWithProvider(<Slides onOptionSelect={mockOnOptionSelect} />);

        const scrollContainer = screen.getByRole("presentation");
        fireEvent.scroll(scrollContainer, { target: { scrollTop: 100 } });

        expect(store.dispatch).toHaveBeenCalledWith(handleChangeIndex(1));
    });

    it("should dispatch handleChangeIndex when scrolling up", () => {
        store = mockStore({
            questionnaire: {
                currentStep: 1,
                answers: {},
            },
        });
        renderWithProvider(<Slides onOptionSelect={mockOnOptionSelect} />);

        const scrollContainer = screen.getByRole("presentation");
        fireEvent.scroll(scrollContainer, { target: { scrollTop: 0 } });

        expect(store.dispatch).toHaveBeenCalledWith(handleChangeIndex(0));
    });

    it("should dispatch handleChangeIndex and onOptionSelect when an option is selected", () => {
        renderWithProvider(<Slides onOptionSelect={mockOnOptionSelect} />);

        const stepProps = (Step as jest.Mock).mock.calls[0][0];
        stepProps.onOptionSelect(0, "Option 1");

        expect(store.dispatch).toHaveBeenCalledWith(handleChangeIndex(1));
        expect(mockOnOptionSelect).toHaveBeenCalledWith(0, "Option 1");
    });
});
