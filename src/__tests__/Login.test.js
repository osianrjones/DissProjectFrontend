import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../LandingPage/Login";
import Web3 from "web3";

test("renders login component with Metamask button", () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to Election Chain/i)).toBeInTheDocument();
    expect(screen.getByText(/Please continue with MetaMask to log in/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Continue with MetaMask/i })).toBeInTheDocument();
});