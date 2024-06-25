import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Summary from "./index";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const mockStore = configureMockStore();
const initialState = {
    questionnaire: {
        answers: {
            0: {
                question: "Question 1",
                answer: { label: "Answer 1", icon: "🔍" },
            },
            1: {
                question: "Question 2",
                answer: { label: "Answer 2", icon: "📚" },
            },
        },
    },
};

const emptyState = {
    questionnaire: {
        answers: {},
    },
};

const mockTheme = createTheme();

const renderWithProviderAndTheme = (ui: React.ReactElement, store: any) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>
        </Provider>
    );
};

describe("Summary Component", () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
        // Mock window.alert
        window.alert = jest.fn();
    });

    it("should render the summary title", () => {
        renderWithProviderAndTheme(<Summary />, store);
        expect(screen.getByText("Summary")).toBeInTheDocument();
    });

    it("should render the answers correctly", () => {
        renderWithProviderAndTheme(<Summary />, store);
        expect(screen.getByText("Question 1")).toBeInTheDocument();
        expect(screen.getByText("Answer 1")).toBeInTheDocument();
        expect(screen.getByText("Question 2")).toBeInTheDocument();
        expect(screen.getByText("Answer 2")).toBeInTheDocument();
    });

    it("should handle no options selected case", () => {
        store = mockStore(emptyState);
        renderWithProviderAndTheme(<Summary />, store);
        expect(
            screen.getByText("No option selected for any question")
        ).toBeInTheDocument();
    });

    it("should enable the submit button when answers are available", () => {
        renderWithProviderAndTheme(<Summary />, store);
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        expect(submitButton).toBeEnabled();
    });

    it("should disable the submit button when no answers are available", () => {
        store = mockStore(emptyState);
        renderWithProviderAndTheme(<Summary />, store);
        const submitButton = screen.getByRole("button", { name: /Submit/i });
        expect(submitButton).toBeDisabled();
    });
});
