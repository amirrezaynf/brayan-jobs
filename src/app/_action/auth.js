"use server";

import { getRoleNumber } from "@/utils/auth";

const BASE_URL = "https://imocc.iracode.com/api/v1/auth";

// Helper function to handle API responses
async function handleApiResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "خطا در ارتباط با سرور");
  }

  return data;
}

// Step 1: Send contact information and receive verification code
export async function registerStep1(contact) {
  try {
    const response = await fetch(`${BASE_URL}/register/step-1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ contact }),
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Step 2: Verify the sent code
export async function registerStep2(contact, code) {
  try {
    const response = await fetch(`${BASE_URL}/register/step-2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ contact, code }),
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Step 3: Register personal information and password
export async function registerStep3(formData) {
  try {
    const { contact, firstName, lastName, password, confirmPassword, role } =
      formData;

    const response = await fetch(`${BASE_URL}/register/step-3`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        contact,
        firstName,
        lastName,
        password,
        password_confirmation: confirmPassword,
        role: getRoleNumber(role), // 2 = کارفرما، 3 = کارجو
      }),
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message,
      token: result.data.token,
      user: result.data.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Step 4: Register additional information (requires authentication)
export async function registerStep4(formData, token) {
  try {
    const response = await fetch(`${BASE_URL}/register/step-4`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    // Get response text first to handle both JSON and non-JSON responses
    const responseText = await response.text();

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error("سرور پاسخ نامعتبری ارسال کرده است");
    }

    if (!response.ok) {
      const errorMessage =
        result.message || result.error || "خطا در ارتباط با سرور";
      throw new Error(errorMessage);
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Resend verification code
export async function resendVerificationCode(contact) {
  try {
    const response = await fetch(`${BASE_URL}/register/resend-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ contact }),
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Login function
export async function login(contact, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ contact, password }),
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message,
      token: result.data.token,
      user: result.data.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
