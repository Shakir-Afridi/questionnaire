import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Option from "./index";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Option Component", () => {
    const props = {
        icon: "🍎",
        label: "Apple",
        isSelected: false,
        onSelect: jest.fn(),
    };

    const renderWithProvider = (ui: React.ReactElement) => {
        return render(<Provider store={store}>{ui}</Provider>);
    };

    it("should render icon and label correctly", () => {
        renderWithProvider(<Option {...props} />);

        expect(screen.getByText("🍎")).toBeInTheDocument();
        expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    it("should apply the selected class when isSelected is true", () => {
        const selectedProps = { ...props, isSelected: true };
        renderWithProvider(<Option {...selectedProps} />);

        const optionElement = screen.getByText("🍎").closest(".option");
        expect(optionElement).toHaveClass("selected");
    });

    it("should not apply the selected class when isSelected is false", () => {
        renderWithProvider(<Option {...props} />);

        const optionElement = screen.getByText("🍎").closest(".option");
        expect(optionElement).not.toHaveClass("selected");
    });

    it("should call onSelect when clicked", () => {
        renderWithProvider(<Option {...props} />);

        const optionElement = screen.getByText("🍎").closest(".option");
        if (optionElement) fireEvent.click(optionElement);

        expect(props.onSelect).toHaveBeenCalledTimes(1);
    });

    it("should apply the correct styles for the icon and label", () => {
        renderWithProvider(<Option {...props} />);

        const iconElement = screen.getByText("🍎");
        const labelElement = screen.getByText("Apple");

        expect(iconElement).toHaveStyle("font-size: 1rem");
        expect(labelElement).toHaveStyle("font-size: 1rem");
    });

    it("should hide the label when not hovered over", () => {
        renderWithProvider(<Option {...props} />);

        const labelElement = screen.getByText("Apple");
        expect(labelElement).toHaveStyle("opacity: 0");
    });
});
