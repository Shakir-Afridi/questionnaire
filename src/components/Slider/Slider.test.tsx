import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { useDispatch } from "react-redux";
import Slider from "./index";
import Slides from "../Slides";
import Summary from "../Summary";
import { handleChangeAnswer } from "../../store/questionnaire";
import questions from "../../data/questions.json";

jest.mock("../Slides", () => jest.fn(() => <div>Slides Component</div>));
jest.mock("../Summary", () => jest.fn(() => <div>Summary Component</div>));

const mockStore = configureMockStore();
const initialState = {
    questionnaire: {
        currentStep: 0,
        answers: {},
    },
};

describe("Slider Component", () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    const renderWithProvider = (ui: React.ReactElement) => {
        return render(<Provider store={store}>{ui}</Provider>);
    };

    it("should render Slides component when not on the summary step", () => {
        renderWithProvider(<Slider />);

        expect(screen.getByTestId("slides")).toBeInTheDocument();
        expect(screen.getByTestId("summary")).not.toBeInTheDocument();
    });

    it("should render Summary component when on the summary step", () => {
        store = mockStore({
            questionnaire: {
                currentStep: questions.length - 1,
                answers: {},
            },
        });
        renderWithProvider(<Slider />);

        expect(screen.getByTestId("slides")).not.toBeInTheDocument();
        expect(screen.getByTestId("summary")).toBeInTheDocument();
    });

    it("should dispatch handleChangeAnswer action when an option is selected", () => {
        renderWithProvider(<Slider />);

        const slidesProps = (Slides as jest.Mock).mock.calls[0][0];
        slidesProps.onOptionSelect(0, "Option 1");

        expect(store.dispatch).toHaveBeenCalledWith(
            handleChangeAnswer({ step: 0, option: "Option 1" })
        );
    });
});
