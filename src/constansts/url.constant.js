export const PRODUCT_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "api/product"
    : "//localhost:3000/api/product";

export const AUTH_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "api/auth"
    : "//localhost:3000/api/auth";

export const USER_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "api/user"
    : "//localhost:3000/api/user";
