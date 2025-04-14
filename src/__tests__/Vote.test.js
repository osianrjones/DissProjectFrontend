import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Vote from "../Voting/Vote";
import DisplayCandidates from "../Voting/DisplayCandidates";

// Mock dependencies
jest.mock("../HomePage/NavBar", () => () => <div data-testid="navbar">NavBar</div>);
jest.mock("../Voting/DisplayCandidates", () => () => <div data-testid="display-candidates">DisplayCandidates</div>);
jest.mock("../HomePage/Footer", () => () => <div data-testid="footer">Footer</div>);

// Test suite
describe("Vote Component", () => {
    it("renders Vote component with NavBar, DisplayCandidates, and Footer", () => {
        const mockAccountNumber = "0x1234567890abcdef";

        // Render the component with mock location state
        render(
            <MemoryRouter initialEntries={[{ pathname: "/vote", state: { accountNumber: mockAccountNumber } }]}>
                <Vote />
            </MemoryRouter>
        );

        // Check if NavBar is rendered
        expect(screen.getByTestId("navbar")).toBeInTheDocument();

        // Check if DisplayCandidates is rendered
        expect(screen.getByTestId("display-candidates")).toBeInTheDocument();

        // Check if Footer is rendered
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});
