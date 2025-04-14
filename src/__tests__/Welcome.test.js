import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Welcome from "../HomePage/Welcome";
import Web3 from "web3";

// Mock dependencies
jest.mock("react-router-dom", () => ({
    useLocation: jest.fn(() => ({ state: { accountNumber: "0x1234567890abcdef" } })),
    useNavigate: jest.fn(),
}));

jest.mock("web3", () => {
    return jest.fn().mockImplementation(() => ({
        utils: {
            toChecksumAddress: jest.fn((addr) => addr), // Mock checksum conversion
        },
    }));
});

// Mock child components to prevent rendering issues
jest.mock("../Results/Results", () => () => <div data-testid="results-component">Results Component</div>);
jest.mock("../HomePage/NavBar", () => () => <div data-testid="navbar-component">NavBar</div>);
jest.mock("../HomePage/Countdown", () => () => <div data-testid="countdown-component">Countdown</div>);
jest.mock("../HomePage/ShowCandidates", () => () => <div data-testid="show-candidates">Show Candidates</div>);
jest.mock("../HomePage/Candidates", () => () => <div data-testid="candidates-component">Candidates</div>);
jest.mock("../HomePage/Title", () => () => <div data-testid="title-component">Title</div>);
jest.mock("../HomePage/Footer", () => () => <div data-testid="footer-component">Footer</div>);

describe("Welcome Component", () => {
    test("renders correctly before the election ends", async () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        );

        expect(screen.getByTestId("navbar-component")).toBeInTheDocument();
        expect(screen.getByTestId("title-component")).toBeInTheDocument();
        expect(screen.getByTestId("countdown-component")).toBeInTheDocument();
        expect(screen.getByTestId("show-candidates")).toBeInTheDocument();
        expect(screen.getByTestId("candidates-component")).toBeInTheDocument();
        expect(screen.getByTestId("footer-component")).toBeInTheDocument();
    });
});
