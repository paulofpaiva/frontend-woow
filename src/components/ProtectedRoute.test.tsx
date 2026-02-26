import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

vi.mock("@/stores/auth.store", () => ({
  useAuthStore: vi.fn(),
}));

const { useAuthStore } = await import("@/stores/auth.store");

function TestRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div>Protected content</div>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<div>Login page</div>} />
    </Routes>
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.mocked(useAuthStore).mockReturnValue({
      token: null,
      isHydrated: true,
    } as ReturnType<typeof useAuthStore>);
  });

  it("redirects to login when there is no token", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <TestRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Login page")).toBeInTheDocument();
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("renders children when token is present", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      token: "fake-token",
      isHydrated: true,
    } as ReturnType<typeof useAuthStore>);
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <TestRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });

  it("shows loading state when not hydrated", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      token: null,
      isHydrated: false,
    } as ReturnType<typeof useAuthStore>);
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <TestRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole("status", { name: /cargando/i })).toBeInTheDocument();
  });
});
