"use server";

import { getRoleNumber } from "@/utils/auth";
import { fetcher } from "@/utils/fetcher";
import { cookies } from "next/headers";

// Centralized cookie setter to ensure consistent, secure attributes
function setAuthCookies(token, user) {
  if (!token) return;
  const cookieStore = cookies();
  const secure = process.env.NODE_ENV === "production";

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Store user only for UI hydration; avoid if unavailable
  if (user) {
    try {
      const serialized = encodeURIComponent(JSON.stringify(user));
      cookieStore.set("auth_user", serialized, {
        httpOnly: false,
        sameSite: "lax",
        secure,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    } catch (_) {
      // If user object cannot be serialized, skip setting auth_user
    }
  }
}

// Logout: clear authentication cookies
export async function logout() {
  try {
    const cookieStore = cookies();
    const secure = process.env.NODE_ENV === "production";

    cookieStore.set("auth_token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: 0,
    });
    cookieStore.set("auth_user", "", {
      httpOnly: false,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: 0,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error?.message || "Logout failed" };
  }
}

// Step 1: Send contact information and receive verification code
export async function registerStep1(contact) {
  try {
    const { data: response } = await fetcher(
      `${process.env.BASE_URL}/auth/register/step-1`,
      {
        method: "POST",
        body: JSON.stringify({ contact }),
      }
    );

    return {
      success: true,
      data: response?.data,
      message: response?.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || error?.data?.message,
    };
  }
}

// Step 2: Verify the sent code
export async function registerStep2(contact, code) {
  try {
    const { data: response } = await fetcher(
      `${process.env.BASE_URL}/auth/register/step-2`,
      {
        method: "POST",
        body: JSON.stringify({ contact, code }),
      }
    );

    return {
      success: true,
      data: response?.data,
      message: response?.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || error?.data?.message,
    };
  }
}

// Step 3: Register personal information and password
export async function registerStep3(formData) {
  try {
    const { contact, firstName, lastName, password, confirmPassword, role } =
      formData;

    const { data: response } = await fetcher(
      `${process.env.BASE_URL}/auth/register/step-3`,
      {
        method: "POST",
        body: JSON.stringify({
          contact,
          firstName,
          lastName,
          password,
          password_confirmation: confirmPassword,
          role,
        }),
      }
    );

    return {
      success: true,
      data: response?.data,
      message: response?.message,
      token: response?.data?.token,
      user: response?.data?.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || error?.data?.message,
    };
  }
}

// Step 4: Register additional information (requires authentication)
export async function registerStep4(formData, token) {
  try {
    const { data: response } = await fetcher(
      `${process.env.BASE_URL}/auth/register/step-4`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      },
      token
    );

    // Prefer backend-issued token if provided; fallback to step-3 token
    const effectiveToken = response?.data?.token || token;
    if (!effectiveToken) {
      return {
        success: false,
        error: "توکن احراز هویت موجود نیست. لطفاً دوباره تلاش کنید.",
      };
    }
    setAuthCookies(effectiveToken, response?.data?.user);

    return {
      success: true,
      data: response?.data,
      message: response?.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || error?.data?.message,
    };
  }
}

// Resend verification code
export async function resendVerificationCode(contact) {
  try {
    const { data: response } = await fetcher(
      `${process.env.BASE_URL}/auth/register/resend-code`,
      {
        method: "POST",
        body: JSON.stringify({ contact }),
      }
    );

    return {
      success: true,
      data: response?.data,
      message: response?.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || error?.data?.message,
    };
  }
}

// Login function
export async function login(contact, password) {
  try {
    const { data: response } = await fetcher(
      `${process.env.BASE_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ contact, password }),
      }
    );

    // Persist cookies on successful login
    const token = response?.data?.token;
    const user = response?.data?.user;
    setAuthCookies(token, user);

    return {
      success: true,
      data: response?.data,
      message: response?.message,
      token,
      user,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || error?.data?.message,
    };
  }
}
