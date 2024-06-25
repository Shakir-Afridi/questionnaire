import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Step, { Answer } from "./index";
import Option from "../Option";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const mockTheme = createTheme();

jest.mock("../Option", () => jest.fn(() => <div>Option Component</div>));

const mockStep = {
    title: "Sample Question",
    options: [
        { label: "Option 1", icon: "icon1" },
        { label: "Option 2", icon: "icon2" },
    ],
};

const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
};

describe("Step Component", () => {
    const mockOnOptionSelect = jest.fn();

    it("should render the step title", () => {
        renderWithTheme(
            <Step
                step={mockStep}
                stepIndex={0}
                onOptionSelect={mockOnOptionSelect}
            />
        );

        expect(screen.getByTestId("step-title")).toBeInTheDocument();
    });

    it("should render the correct number of options", () => {
        renderWithTheme(
            <Step
                step={mockStep}
                stepIndex={0}
                onOptionSelect={mockOnOptionSelect}
            />
        );

        expect(screen.getAllByTestId("step-options").length).toBe(
            mockStep.options.length
        );
    });

    it("should highlight the selected option", () => {
        const mockAnswer: Answer = {
            answer: { label: "Option 1", icon: "icon1" },
        };

        renderWithTheme(
            <Step
                step={mockStep}
                stepIndex={0}
                onOptionSelect={mockOnOptionSelect}
                answer={mockAnswer}
            />
        );

        const selectedOption = screen.getAllByText("Option Component")[0];
        expect(selectedOption).toHaveClass("selected");
    });

    it("should handle option selection", () => {
        renderWithTheme(
            <Step
                step={mockStep}
                stepIndex={0}
                onOptionSelect={mockOnOptionSelect}
            />
        );

        const optionComponents = screen.getAllByTestId("step-options");
        fireEvent.click(optionComponents[0]);

        expect(mockOnOptionSelect).toHaveBeenCalledWith(0, mockStep.options[0]);
    });
});
