const { render, screen, fireEvent, waitFor } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");
const Register = require("../Registration/Register");

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));

// Mock MetaMask Ethereum
const mockRequest = jest.fn();
global.window.ethereum = {
    request: mockRequest
};

test("renders Register component with wallet selection", async () => {
    mockRequest.mockResolvedValue(["0x123456789abcdef"]);

    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    await screen.findByText(/Registration/i);
    expect(screen.getByText(/Wallet address to register:/i)).toBeInTheDocument();
    expect(screen.getByText(/Not currently registered/i)).toBeInTheDocument();
});

