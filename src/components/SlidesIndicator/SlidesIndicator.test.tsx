import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import SlideIndicator from "./index";

const mockStore = configureMockStore();
const initialState = {
    questionnaire: {
        currentStep: 0,
    },
};

describe("SlideIndicator Component", () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    const renderWithProvider = (ui: React.ReactElement) => {
        return render(<Provider store={store}>{ui}</Provider>);
    };

    it("should render the correct number of dots based on steps prop", () => {
        renderWithProvider(<SlideIndicator steps={5} />);

        const dots = screen.getAllByTestId("indicator");
        expect(dots.length).toBe(4);
    });

    it("should highlight the current step", () => {
        renderWithProvider(<SlideIndicator steps={5} />);

        const activeDot = screen.getByText((content, element) => {
            return element?.className?.includes("dot active") || false;
        });
        expect(activeDot).toBeInTheDocument();
    });

    it("should display the checklist icon", () => {
        renderWithProvider(<SlideIndicator steps={5} />);

        const logo = screen.getByTestId("logo");
        expect(logo).toBeInTheDocument();
    });

    it("should update the highlighted step when currentStep changes", () => {
        store = mockStore({
            questionnaire: {
                currentStep: 2,
            },
        });

        renderWithProvider(<SlideIndicator steps={5} />);

        const activeDot = screen.getByText((content, element) => {
            return element?.className?.includes("dot active") || false;
        });
        expect(activeDot).toBeInTheDocument();
    });
});
