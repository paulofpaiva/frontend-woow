import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema, updateProfileSchema } from "./auth";

describe("loginSchema", () => {
  it("accepts valid email and password (min 8 chars)", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "12345678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "12345678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password shorter than 8 characters", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "1234567",
    });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("accepts valid name, email, password and confirmPassword", () => {
    const result = registerSchema.safeParse({
      name: "Juan Pérez",
      email: "juan@example.com",
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(result.success).toBe(true);
  });

  it("rejects when password and confirmPassword do not match", () => {
    const result = registerSchema.safeParse({
      name: "Juan",
      email: "juan@example.com",
      password: "12345678",
      confirmPassword: "87654321",
    });
    expect(result.success).toBe(false);
  });
});

describe("updateProfileSchema", () => {
  it("accepts non-empty name", () => {
    const result = updateProfileSchema.safeParse({ name: "Juan Carlos" });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = updateProfileSchema.safeParse({ name: "" });
    expect(result.success).toBe(false);
  });
});
