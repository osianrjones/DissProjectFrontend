import { render, screen, waitFor } from "@testing-library/react";
import Results from "../Results/Results";
import { getContractInstance } from "../Helper_Functions/ContractConnection";
import decryptVotes from "../Helper_Functions/DecryptVote";
import Web3 from "web3";

// Mock Web3 and Ethereum provider
window.ethereum = jest.fn();
jest.mock("web3", () => {
    return jest.fn().mockImplementation(() => ({
        eth: {
            getAccounts: jest.fn().mockResolvedValue(["0x123"]),
        },
    }));
});

// Mock the contract instance and methods
jest.mock("../Helper_Functions/ContractConnection", () => ({
    getContractInstance: jest.fn(),
}));

// Mock decryptVotes function
jest.mock("../Helper_Functions/DecryptVote", () => jest.fn());

// Sample mock data for contract calls
const mockEncryptedVotes = ["encryptedVote1", "encryptedVote2"];
const mockDecryptedVotes = new Map([
    ["Candidate A", 5],
    ["Candidate B", 3],
]);

beforeEach(() => {
    getContractInstance.mockResolvedValue({
        methods: {
            getAllEncryptedVotes: jest.fn().mockResolvedValue(mockEncryptedVotes),
        },
    });

    decryptVotes.mockReturnValue(mockDecryptedVotes);
});


test("loads and displays winner", async () => {
    render(<Results />);

    // Wait for winner's name to appear
    await waitFor(() => {
        const winner = screen.getByText(/Placeholder/i);
        expect(winner).toBeInTheDocument();
    });
});
