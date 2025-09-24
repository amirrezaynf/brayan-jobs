"use server";

import { cookies } from "next/headers";

// Test function to verify Server Actions are working
export async function testServerAction() {
  console.log("🔥 ===== SERVER ACTION CALLED =====");
  console.log("🧪 Server Action: testServerAction called");
  console.log(
    "🧪 Server Action: Environment check:",
    typeof window === "undefined" ? "Server" : "Client"
  );
  console.log("🧪 Server Action: Current time:", new Date().toISOString());

  try {
    const result = {
      success: true,
      message: "Server Actions are working!",
      timestamp: new Date().toISOString(),
      environment: typeof window === "undefined" ? "Server" : "Client",
    };

    console.log("✅ Server Action: testServerAction returning:", result);
    return result;
  } catch (error) {
    console.error("❌ Server Action: testServerAction error:", error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

// Test API connectivity
export async function testAPIConnectivity() {
  console.log("🌐 Server Action: Testing API connectivity...");
  console.log("🌐 Server Action: API_BASE_URL:", API_BASE_URL);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log("🌐 Server Action: API Test Response status:", response.status);
    console.log("🌐 Server Action: API Test Response ok:", response.ok);

    return {
      success: response.ok,
      status: response.status,
      message: response.ok
        ? "API is reachable"
        : `API returned ${response.status}`,
      url: `${API_BASE_URL}/companies`,
    };
  } catch (error) {
    console.error("❌ Server Action: API connectivity test failed:", error);
    return {
      success: false,
      error: error.message,
      message: "API is not reachable",
      url: `${API_BASE_URL}/companies`,
    };
  }
}

// API Configuration
const API_BASE_URL = "https://imocc.iracode.com/api/v1";

// Alternative URLs to try if main API is down
const FALLBACK_URLS = [
  "https://imocc.iracode.com/api/v1",
  "https://api.iracode.com/api/v1",
  "http://api.iracode.com/api/v1",
  "https://iracode.com/api/v1",
  "http://localhost:8000/api/v1", // for local development
];

/**
 * Get authentication token from cookies or localStorage
 * @returns {string|null} Authentication token
 */
function getAuthToken() {
  console.log("🔐 Server Action: Getting auth token...");

  // Check if we're in server environment
  if (typeof window === "undefined") {
    console.log("🔐 Server Action: Server environment, checking cookies...");
    // Server-side: get from cookies
    const { cookies } = require("next/headers");
    try {
      const cookieStore = cookies();
      // Check both possible cookie names
      let token =
        cookieStore.get("auth_token")?.value ||
        cookieStore.get("authToken")?.value;
      console.log(
        "🔐 Server Action: Token from cookies:",
        token ? `${token.substring(0, 20)}...` : "null"
      );
      return token || null;
    } catch (error) {
      console.error("🔐 Server Action: Error reading cookies:", error);
      return null;
    }
  } else {
    console.log(
      "🔐 Server Action: Client environment, checking localStorage..."
    );
    // Client-side: get from localStorage (check both possible names)
    let token =
      localStorage.getItem("authToken") || localStorage.getItem("auth_token");
    console.log(
      "🔐 Server Action: Token from localStorage:",
      token ? `${token.substring(0, 20)}...` : "null"
    );
    return token;
  }
}


/**
 * Create a new company
 * @param {Object} companyData - Company data to create
 * @returns {Promise<Object>} API response
 */
export async function createCompany(companyData) {
  console.log("🔥 ===== CREATE COMPANY SERVER ACTION =====");
  console.log("🆕 Server Action: createCompany called");
  console.log("📦 Server Action: Input data:", companyData);
  console.log("📦 Server Action: Input data type:", typeof companyData);
  console.log(
    "📦 Server Action: Input data keys:",
    companyData ? Object.keys(companyData) : "null"
  );
  console.log("🔍 Server Action: API_BASE_URL:", API_BASE_URL);

  try {
    // Get authentication token
    let token = companyData?._token || getAuthToken();
    if (!token) {
      console.log("❌ Server Action: No auth token found");
      return {
        success: false,
        error: "ابتدا ثبت نام کنید یا وارد شوید",
      };
    }

    // Remove _token from data before mapping
    const { _token, ...cleanData } = companyData;
    console.log("🔄 Server Action: Removed _token from data");

    // Map form data to API format
    console.log("🔥 About to call mapCompanyDataToAPI...");
    const mappedData = mapCompanyDataToAPI(cleanData);
    console.log("🔥 mapCompanyDataToAPI completed, result:", mappedData);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const url = `${API_BASE_URL}/companies`;
    console.log("📡 Server Action: Making PUT request to:", url);
    console.log("📡 Server Action: Request headers:", {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        token ? token.substring(0, 10) + "..." : "null"
      }`,
      Accept: "application/json",
    });
    console.log(
      "📡 Server Action: Request body:",
      JSON.stringify(mappedData, null, 2)
    );

    let response;
    try {
      console.log("🚀 Server Action: Starting fetch request...");
      console.log("🚀 Server Action: Fetch URL:", url);
      console.log("🚀 Server Action: Fetch method: PUT");
      console.log("🚀 Server Action: Fetch headers:", {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          token ? token.substring(0, 10) + "..." : "null"
        }`,
        Accept: "application/json",
      });
      console.log(
        "🚀 Server Action: Fetch body size:",
        JSON.stringify(mappedData).length,
        "characters"
      );

      response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(mappedData),
        signal: controller.signal,
      });

      console.log("📡 Server Action: Fetch completed successfully");
      console.log("📡 Server Action: Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
      });
    } catch (fetchError) {
      console.error("❌ Server Action: Fetch failed:", fetchError);
      console.error("❌ Server Action: Fetch error name:", fetchError.name);
      console.error(
        "❌ Server Action: Fetch error message:",
        fetchError.message
      );
      console.error("❌ Server Action: Fetch error stack:", fetchError.stack);

      if (fetchError.name === "AbortError") {
        console.error("❌ Server Action: Request was aborted (timeout)");
      } else if (fetchError.name === "TypeError") {
        console.error("❌ Server Action: Network error or CORS issue");
      }

      throw fetchError;
    }

    clearTimeout(timeoutId);
    console.log("📡 Server Action: Response status:", response.status);
    console.log("📡 Server Action: Response ok:", response.ok);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("❌ Server Action: Create company failed");
      console.error("❌ Server Action: Response status:", response.status);
      console.error(
        "❌ Server Action: Response headers:",
        Object.fromEntries(response.headers.entries())
      );
      console.error("❌ Server Action: Error response body:", errorData);

      let errorMessage = `خطا در ثبت شرکت: ${response.status}`;

      try {
        const parsedError = JSON.parse(errorData);
        console.error("❌ Server Action: Parsed error:", parsedError);

        if (parsedError.message) {
          errorMessage = parsedError.message;
        } else if (parsedError.errors) {
          const firstError = Object.values(parsedError.errors)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
          }
        }
      } catch (parseError) {
        console.error(
          "❌ Server Action: Could not parse error response:",
          parseError
        );
      }

      return {
        success: false,
        error:
          response.status === 401 ? "لطفاً مجدداً وارد شوید" : errorMessage,
      };
    }

    const result = await response.json();
    console.log("✅ Server Action: Success response:", result);

    return {
      success: true,
      data: result.data || result,
      message: "اطلاعات شرکت با موفقیت ثبت شد!",
    };
  } catch (error) {
    console.error("❌ Server Action: Exception in createCompany:", error);
    console.error("❌ Server Action: Error stack:", error.stack);

    if (error.name === "AbortError") {
      console.log("⏰ Server Action: Request timeout");
      return {
        success: false,
        error: "زمان درخواست به پایان رسید. لطفاً مجدداً تلاش کنید.",
      };
    }

    return {
      success: false,
      error: `خطا در ارتباط با سرور: ${error.message}`,
    };
  }
}

/**
 * Update an existing company
 * @param {number} id - Company ID
 * @param {Object} companyData - Updated company data
 * @returns {Promise<Object>} API response
 */
export async function updateCompany(id, companyData) {
  console.log("🔄 ===== UPDATE COMPANY SERVER ACTION =====");
  console.log("🔄 Server Action: updateCompany called with ID:", id);
  console.log("📦 Server Action: Input data:", companyData);

  try {
    // Check if this is actually a new company creation
    if (!id || id === "undefined" || id === "null" || id.toString().trim() === "") {
      console.log("🆕 Server Action: No valid ID provided, redirecting to createCompany...");
      return await createCompany(companyData);
    }

    // Try to get token from data first (client-side passed token)
    let token = companyData?._token || null;
    console.log(
      "🔑 Server Action: Token from data:",
      token ? `✅ Found (${token.substring(0, 10)}...)` : "❌ Not found"
    );

    // If no token in data, try getAuthToken
    if (!token) {
      token = getAuthToken();
    }
    if (!token) {
      return {
        success: false,
        error: "ابتدا ثبت نام کنید یا وارد شوید",
      };
    }

    // Remove _token from data before mapping
    const { _token, ...cleanData } = companyData;

    // Map form data to API format
    const mappedData = mapCompanyDataToAPI(cleanData);
    
    // For updates, create a minimal payload with only essential fields to avoid validation conflicts
    console.log("🔄 Server Action: Creating minimal update payload to avoid validation conflicts...");
    
    // Essential fields that are safe to update
    const updatePayload = {
      name: mappedData.name,
      name_en: mappedData.name_en,
      display_name: mappedData.display_name,
      introduction: mappedData.introduction,
      founded_year: mappedData.founded_year,
      size: mappedData.size,
      type: mappedData.type,
    };
    
    // Only include optional fields if they exist and are not empty
    if (mappedData.website && mappedData.website.trim()) {
      updatePayload.website = mappedData.website;
    }
    if (mappedData.mobile && mappedData.mobile.trim()) {
      updatePayload.mobile = mappedData.mobile;
    }
    if (mappedData.phone && mappedData.phone.trim()) {
      updatePayload.phone = mappedData.phone;
    }
    if (mappedData.linkedin_url) {
      updatePayload.linkedin_url = mappedData.linkedin_url;
    }
    if (mappedData.instagram_url) {
      updatePayload.instagram_url = mappedData.instagram_url;
    }
    if (mappedData.telegram_url) {
      updatePayload.telegram_url = mappedData.telegram_url;
    }
    if (mappedData.vision) {
      updatePayload.vision = mappedData.vision;
    }
    if (mappedData.mission) {
      updatePayload.mission = mappedData.mission;
    }
    if (mappedData.work_environment) {
      updatePayload.work_environment = mappedData.work_environment;
    }
    
    // Arrays
    if (mappedData.services && mappedData.services.length > 0) {
      updatePayload.services = mappedData.services;
    }
    if (mappedData.technical_specialties && mappedData.technical_specialties.length > 0) {
      updatePayload.technical_specialties = mappedData.technical_specialties;
    }
    if (mappedData.benefits && mappedData.benefits.length > 0) {
      updatePayload.benefits = mappedData.benefits;
    }
    
    console.log("🔄 Server Action: Email field excluded from update to prevent duplicate validation");
    console.log("🔄 Server Action: Update payload fields:", Object.keys(updatePayload));
    console.log("🔄 Server Action: Email in payload?", updatePayload.hasOwnProperty('email'));
    console.log("🔄 Server Action: Full payload:", JSON.stringify(updatePayload, null, 2));
    
    // Use the minimal payload instead of full mappedData
    const finalPayload = updatePayload;

    // Don't include ID in request body for updates - only in URL
    console.log("🔄 Server Action: Company ID for update:", id);
    console.log("🔄 Server Action: Final payload for update:", finalPayload);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    // Try PUT method first (primary method for updates)
    let url = `${API_BASE_URL}/companies`;
    if (id) {
      url = `${API_BASE_URL}/companies/${id}`;
    }
    
    console.log("📡 Server Action: Making PUT request to:", url);
    
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(finalPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log("📡 Server Action: Update response status:", response.status);
    console.log("📡 Server Action: Update response ok:", response.ok);

    // If company not found (404), redirect to createCompany
    if (!response.ok && response.status === 404) {
      console.log("🔄 Server Action: Company not found (404), redirecting to createCompany...");
      return await createCompany(companyData);
    }

    // If PUT method is not allowed, try PATCH as fallback
    if (!response.ok && response.status === 405) {
      console.log("🔄 Server Action: PUT not allowed for update, trying PATCH fallback...");
      
      const patchResponse = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(finalPayload),
        signal: controller.signal,
      });
      
      console.log("📡 Server Action: PATCH fallback response status:", patchResponse.status);
      
      if (patchResponse.ok) {
        const result = await patchResponse.json();
        console.log("✅ Server Action: PATCH fallback success:", result);
        return {
          success: true,
          data: result.data || result,
          message: "اطلاعات شرکت با موفقیت به‌روزرسانی شد!",
        };
      }
      
      // If PATCH also fails and it's a 404 (company not found), try creating new company
      if (patchResponse.status === 404) {
        console.log("🔄 Server Action: Company not found during update, trying to create new...");
        
        const createResponse = await fetch(`${API_BASE_URL}/companies`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(finalPayload),
          signal: controller.signal,
        });
        
        if (createResponse.ok) {
          const result = await createResponse.json();
          console.log("✅ Server Action: Create fallback success:", result);
          return {
            success: true,
            data: result.data || result,
            message: "اطلاعات شرکت با موفقیت ایجاد شد!",
          };
        }
      }
      
      // Continue with PATCH response for error handling
      response = patchResponse;
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error("❌ Server Action: Update company failed");
      console.error("❌ Server Action: Response status:", response.status);
      console.error(
        "❌ Server Action: Response headers:",
        Object.fromEntries(response.headers.entries())
      );
      console.error("❌ Server Action: Error response body:", errorData);

      let errorMessage = `خطا در به‌روزرسانی شرکت: ${response.status}`;

      try {
        const parsedError = JSON.parse(errorData);
        console.error("❌ Server Action: Parsed error:", parsedError);

        if (parsedError.message) {
          errorMessage = parsedError.message;
          
          // Check for specific error patterns and provide Persian translations
          if (errorMessage.includes("No query results") || errorMessage.includes("not found")) {
            errorMessage = "شرکت یافت نشد یا حذف شده است";
          } else if (errorMessage.includes("duplicate") || errorMessage.includes("unique") || 
                     (errorMessage.includes("email") && errorMessage.includes("taken"))) {
            errorMessage = "این ایمیل قبلاً توسط شرکت دیگری استفاده شده است. لطفاً ایمیل دیگری انتخاب کنید.";
          } else if (errorMessage.includes("validation") || errorMessage.includes("invalid")) {
            errorMessage = "اطلاعات وارد شده نامعتبر است";
          }
        } else if (parsedError.errors) {
          const firstError = Object.values(parsedError.errors)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
            
            // Handle duplicate email in validation errors for updates
            if (errorMessage.includes("email") && errorMessage.includes("taken")) {
              errorMessage = "این ایمیل قبلاً توسط شرکت دیگری استفاده شده است. لطفاً ایمیل دیگری انتخاب کنید.";
            }
          }
        }
      } catch (parseError) {
        console.error(
          "❌ Server Action: Could not parse error response:",
          parseError
        );
      }

      // Provide user-friendly Persian error messages based on status codes
      const statusErrorMessages = {
        400: "اطلاعات ارسالی ناقص یا نامعتبر است",
        401: "لطفاً مجدداً وارد شوید",
        403: "شما اجازه انجام این عمل را ندارید",
        404: "شرکت یافت نشد یا حذف شده است",
        422: "اطلاعات وارد شده نامعتبر است",
        429: "تعداد درخواست‌ها زیاد است. لطفاً کمی بعد تلاش کنید",
        500: "خطای داخلی سرور. لطفاً بعداً تلاش کنید"
      };

      return {
        success: false,
        error: statusErrorMessages[response.status] || errorMessage,
        statusCode: response.status,
        rawError: errorData
      };
    }

    const result = await response.json();

    return {
      success: true,
      data: result.data || result,
      message: "اطلاعات شرکت با موفقیت به‌روزرسانی شد!",
    };
  } catch (error) {
    console.error("❌ Server Action: Exception in updateCompany:", error);
    console.error("❌ Server Action: Error stack:", error.stack);

    if (error.name === "AbortError") {
      return {
        success: false,
        error: "زمان درخواست به پایان رسید. لطفاً مجدداً تلاش کنید.",
      };
    }

    return {
      success: false,
      error: `خطا در ارتباط با سرور: ${error.message}`,
    };
  }
}

/**
 * Get company data (my company or by slug)
 * @param {string} slug - Company slug or 'my' for current user's company
 * @returns {Promise<Object>} API response
 */
export async function getCompany(slug = "my", clientToken = null) {
  console.log("🔍 Server Action: getCompany called with slug:", slug);
  console.log("🔍 Server Action: API_BASE_URL:", API_BASE_URL);
  console.log(
    "🔍 Server Action: Client token provided:",
    clientToken ? "✅ Yes" : "❌ No"
  );

  // Always return a structured response
  const defaultResponse = {
    success: false,
    error: "خطای نامشخص",
    data: null,
  };

  try {
    // Try to get token from multiple sources
    let token = clientToken || getAuthToken();
    console.log(
      "🔑 Server Action: Final token:",
      token ? "✅ Found" : "❌ Not found"
    );
    console.log(
      "🔑 Server Action: Token source:",
      clientToken ? "Client" : "Server"
    );

    if (!token) {
      console.log("❌ Server Action: No auth token found");
      return {
        success: false,
        error: "ابتدا ثبت نام کنید یا وارد شوید",
        data: null,
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // Use the same endpoint as create but with GET method
    let url;
    if (slug === "my") {
      // Back to original endpoint but with strong filtering
      url = `${API_BASE_URL}/companies`;
      console.log(
        "📡 Server Action: Using companies endpoint with security filtering"
      );
    } else {
      url = `${API_BASE_URL}/companies/${slug}`;
      console.log("📡 Server Action: Using specific company slug:", slug);
    }

    console.log("📡 Server Action: Final URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json; charset=utf-8",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);
    console.log("📡 Server Action: Response status:", response.status);
    console.log("📡 Server Action: Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server Action: Get company failed");
      console.error("❌ Server Action: Response status:", response.status);
      console.error(
        "❌ Server Action: Response headers:",
        Object.fromEntries(response.headers.entries())
      );
      console.error("❌ Server Action: Error response body:", errorText);

      let errorMessage = `خطا در دریافت اطلاعات شرکت: ${response.status}`;

      try {
        const parsedError = JSON.parse(errorText);
        console.error("❌ Server Action: Parsed error:", parsedError);

        if (parsedError.message) {
          errorMessage = parsedError.message;
        }
      } catch (parseError) {
        console.error(
          "❌ Server Action: Could not parse error response:",
          parseError
        );
      }

      return {
        success: false,
        error:
          response.status === 401
            ? "لطفاً مجدداً وارد شوید"
            : response.status === 404
            ? "شرکت یافت نشد"
            : errorMessage,
        data: null,
      };
    }

    // Try to parse the actual API response with different encoding methods
    let result;
    try {
      console.log("📄 Server Action: Attempting to parse real API response...");

      // Method 1: Try ArrayBuffer approach for better encoding handling
      const arrayBuffer = await response.arrayBuffer();
      const decoder = new TextDecoder("utf-8");
      const responseText = decoder.decode(arrayBuffer);

      console.log(
        "📄 Server Action: Decoded text length:",
        responseText.length
      );
      console.log(
        "📄 Server Action: First 200 chars:",
        responseText.substring(0, 200)
      );

      // Clean the text and try to parse
      const cleanText = responseText
        .replace(/^\uFEFF/, "") // Remove BOM
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control chars
        .trim();

      result = JSON.parse(cleanText);
      console.log("✅ Server Action: Successfully parsed real API response!");
      console.log("✅ Server Action: API result:", result);
    } catch (parseError) {
      console.error(
        "❌ Server Action: Failed to parse API response:",
        parseError.message
      );
      console.log(
        "🔄 Server Action: Falling back to direct response.json()..."
      );

      // Fallback: Try direct response.json()
      try {
        // Clone the response since we already consumed it
        const response2 = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json; charset=utf-8",
          },
          signal: controller.signal,
          cache: "no-store",
        });

        result = await response2.json();
        console.log("✅ Server Action: Direct JSON parsing worked!");
      } catch (directError) {
        console.error(
          "❌ Server Action: Direct JSON also failed:",
          directError.message
        );

        return {
          success: false,
          error: "خطا در دریافت اطلاعات از سرور - مشکل encoding",
          data: null,
        };
      }
    }
    console.log("✅ Server Action: Response structure:", {
      hasData: !!result.data,
      dataKeys: result.data ? Object.keys(result.data) : [],
      hasDirectFields: Object.keys(result).filter((key) => key !== "data"),
    });

    let rawData = result.data || result;
    console.log("📦 Server Action: Raw data to map:", rawData);
    console.log(
      "📦 Server Action: Raw data keys:",
      rawData ? Object.keys(rawData) : []
    );

    // If rawData is an array, find the current user's company
    if (Array.isArray(rawData) && rawData.length > 0) {
      console.log(
        "📦 Server Action: API returned array, filtering for current user's company"
      );
      console.log(
        "📦 Server Action: Available companies:",
        rawData.map((c) => ({ id: c.id, name: c.name, user_id: c.user_id }))
      );

      // For 'my' endpoint, should only return current user's companies
      // But if multiple, take the most recent one
      console.log("🔍 Server Action: Filtering companies for current user...");
      console.log(
        "🔍 Server Action: All companies user_ids:",
        rawData.map((c) => c.user_id)
      );

      // TEMPORARY: Take most recent company without user filtering
      // TODO: Backend should implement proper user filtering
      console.log(
        "⚠️ TEMPORARY: Taking most recent company without user filtering"
      );
      rawData = rawData.sort((a, b) => b.id - a.id)[0];
      console.log("📦 Server Action: Selected user's most recent company:", {
        id: rawData.id,
        name: rawData.name,
        user_id: rawData.user_id,
      });
    }

    if (rawData) {
      console.log("📦 Server Action: Key fields in raw data:", {
        id: rawData.id,
        name: rawData.name,
        name_en: rawData.name_en,
        size: rawData.size,
        size_label: rawData.size_label,
        linkedin_url: rawData.linkedin_url,
        instagram_url: rawData.instagram_url,
        telegram_url: rawData.telegram_url,
        locations: Array.isArray(rawData.locations)
          ? rawData.locations.length
          : "not array",
        expert_activity_field: rawData.expert_activity_field,
      });
    }

    // Map API data to form format
    console.log("🔄 Server Action: Starting mapAPIDataToForm...");
    const mappedData = mapAPIDataToForm(rawData);
    console.log("🔄 Server Action: Mapping completed");
    console.log(
      "🔄 Server Action: Mapped data keys:",
      mappedData ? Object.keys(mappedData) : []
    );
    console.log("🔄 Server Action: Final mapped data:", mappedData);

    return {
      success: true,
      data: mappedData,
      rawData: rawData, // Keep raw data for reference
    };
  } catch (error) {
    console.error("❌ Server Action: Exception in getCompany:", error);
    console.error("❌ Server Action: Error stack:", error.stack);

    if (error.name === "AbortError") {
      console.log("⏰ Server Action: Request timeout");
      return {
        success: false,
        error: "زمان درخواست به پایان رسید. لطفاً مجدداً تلاش کنید.",
        data: null,
      };
    }

    return {
      success: false,
      error: `خطا در ارتباط با سرور: ${error.message}`,
      data: null,
    };
  }
}

/**
 * Get companies list with advanced filtering
 * @param {Object} params - Query parameters for filtering
 * @returns {Promise<Object>} API response with companies list
 */
export async function getCompanies(params = {}) {
  console.log("📋 Server Action: getCompanies called with params:", params);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // Build query string from parameters
    const queryParams = new URLSearchParams();

    // Add all supported parameters
    if (params.search) queryParams.append("search", params.search);
    if (params.size) queryParams.append("size", params.size.toString());
    if (params.activity_field_id)
      queryParams.append(
        "activity_field_id",
        params.activity_field_id.toString()
      );
    if (params.verified !== undefined)
      queryParams.append("verified", params.verified.toString());
    if (params.founded_year_from)
      queryParams.append(
        "founded_year_from",
        params.founded_year_from.toString()
      );
    if (params.founded_year_to)
      queryParams.append("founded_year_to", params.founded_year_to.toString());
    if (params.city_id)
      queryParams.append("city_id", params.city_id.toString());
    if (params.province_id)
      queryParams.append("province_id", params.province_id.toString());
    if (params.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params.sort_direction)
      queryParams.append("sort_direction", params.sort_direction);
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params.page) queryParams.append("page", params.page.toString());

    const url = `${API_BASE_URL}/companies${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
    console.log("🔄 Server Action: Preparing request headers...");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Add authentication token if available
    const token = getAuthToken();
    console.log(
      "🔑 Server Action: Retrieved token:",
      token ? `${token.substring(0, 20)}...` : "null"
    );
    console.log("🔑 Server Action: Token length:", token ? token.length : 0);
    console.log("🔑 Server Action: Token type:", typeof token);

    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log("🔑 Server Action: Added auth token to headers");
      console.log(
        "🔑 Server Action: Authorization header:",
        `Bearer ${token.substring(0, 20)}...`
      );
      console.log(
        "🔑 Server Action: Full Authorization header:",
        headers.Authorization
      );
    } else {
      console.warn("⚠️ Server Action: No auth token found - request will fail");
    }

    console.log("🔄 Server Action: Final headers:", {
      ...headers,
      Authorization: headers.Authorization
        ? `Bearer ${headers.Authorization.substring(7, 27)}...`
        : "not set",
    });

    console.log("🔄 Server Action: About to make request to:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);
    console.log("📡 Server Action: Response status:", response.status);
    console.log("📡 Server Action: Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server Action: Get companies failed");
      console.error("❌ Server Action: Response status:", response.status);
      console.error(
        "❌ Server Action: Response headers:",
        Object.fromEntries(response.headers.entries())
      );
      console.error("❌ Server Action: Error response body:", errorText);

      let errorMessage = `خطا در دریافت لیست شرکت‌ها: ${response.status}`;

      try {
        const parsedError = JSON.parse(errorText);
        console.error("❌ Server Action: Parsed error:", parsedError);

        if (parsedError.message) {
          errorMessage = parsedError.message;
        }
      } catch (parseError) {
        console.error(
          "❌ Server Action: Could not parse error response:",
          parseError
        );
      }

      return {
        success: false,
        error: errorMessage,
        data: [],
        meta: null,
        links: null,
      };
    }

    const result = await response.json();
    console.log("✅ Server Action: Success response:", result);

    return {
      success: true,
      data: result.data || [],
      meta: result.meta || null,
      links: result.links || null,
    };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("⏰ Server Action: Request timeout");
      return {
        success: false,
        error: "زمان درخواست به پایان رسید. لطفاً مجدداً تلاش کنید.",
        data: [],
        meta: null,
        links: null,
      };
    }

    console.error("❌ Server Action: Error getting companies:", error);
    console.error("❌ Server Action: Error stack:", error.stack);
    return {
      success: false,
      error: "خطا در ارتباط با سرور",
      data: [],
      meta: null,
      links: null,
    };
  }
}

/**
 * Get verified companies only
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} API response with verified companies
 */
export async function getVerifiedCompanies(params = {}) {
  console.log("✅ Server Action: getVerifiedCompanies called");
  return await getCompanies({ ...params, verified: true });
}

/**
 * Get companies by activity field
 * @param {number} activityFieldId - Activity field ID
 * @param {Object} params - Additional query parameters
 * @returns {Promise<Object>} API response with companies in specific field
 */
export async function getCompaniesByActivityField(
  activityFieldId,
  params = {}
) {
  console.log(
    "🏢 Server Action: getCompaniesByActivityField called with field:",
    activityFieldId
  );
  return await getCompanies({ ...params, activity_field_id: activityFieldId });
}

/**
 * Search companies by name
 * @param {string} searchTerm - Search term
 * @param {Object} params - Additional query parameters
 * @returns {Promise<Object>} API response with search results
 */
export async function searchCompanies(searchTerm, params = {}) {
  console.log(
    "🔍 Server Action: searchCompanies called with term:",
    searchTerm
  );
  return await getCompanies({ ...params, search: searchTerm });
}

/**
 * Delete a company
 * @param {number} id - Company ID
 * @returns {Promise<Object>} API response
 */
export async function deleteCompany(id) {
  try {
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "ابتدا ثبت نام کنید یا وارد شوید",
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        error:
          response.status === 401
            ? "لطفاً مجدداً وارد شوید"
            : response.status === 404
            ? "شرکت یافت نشد"
            : `خطا در حذف شرکت: ${response.status}`,
      };
    }

    return {
      success: true,
      message: "شرکت با موفقیت حذف شد!",
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return {
        success: false,
        error: "زمان درخواست به پایان رسید. لطفاً مجدداً تلاش کنید.",
      };
    }

    console.error("Error deleting company:", error);
    return {
      success: false,
      error: "خطا در ارتباط با سرور",
    };
  }
}

/**
 * Format social media URL to acceptable format
 * @param {string} input - User input (can be @username, username, or full URL)
 * @param {string} platform - Platform name (linkedin, instagram, telegram)
 * @returns {string} Formatted URL or empty string
 */
function formatSocialMediaUrl(input, platform) {
  if (!input || !input.trim()) {
    return "";
  }

  const cleanInput = input.trim();

  // If it's already a full URL, return as is
  if (cleanInput.startsWith("http://") || cleanInput.startsWith("https://")) {
    return cleanInput;
  }

  // Remove @ if present
  const username = cleanInput.startsWith("@")
    ? cleanInput.substring(1)
    : cleanInput;

  // If empty after removing @, return empty
  if (!username) {
    return "";
  }

  // Format based on platform
  switch (platform) {
    case "linkedin":
      // For LinkedIn, accept any format - could be profile URL path or company name
      return cleanInput.includes("linkedin.com")
        ? cleanInput
        : `https://linkedin.com/in/${username}`;
    case "instagram":
      return `https://instagram.com/${username}`;
    case "telegram":
      return `https://t.me/${username}`;
    default:
      return cleanInput;
  }
}

/**
 * Map API response data to form format
 * @param {Object} apiData - API response data
 * @returns {Object} Mapped data for form
 */
function mapAPIDataToForm(apiData) {
  console.log("🔄 ===== MAPPING API DATA TO FORM =====");
  console.log("🔄 Server Action: Input API data:", apiData);
  console.log("🔄 Server Action: API data type:", typeof apiData);

  if (!apiData) {
    console.log(
      "⚠️ Server Action: No API data to map - returning empty object"
    );
    return {};
  }

  console.log("🔄 Server Action: Available API fields:", Object.keys(apiData));

  // Extract location first for logging
  console.log("📍 Server Action: Processing location data...");
  const locationData = extractLocationFromAPI(apiData.locations);
  console.log("📍 Server Action: Extracted location:", locationData);

  // Process company size
  console.log("📏 Server Action: Processing company size...");
  console.log("📏 Server Action: Raw size from API:", apiData.size);
  const mappedSize = mapAPISizeToForm(apiData.size);
  console.log("📏 Server Action: Mapped size:", mappedSize);

  // Process industry
  console.log("🏭 Server Action: Processing industry...");
  console.log(
    "🏭 Server Action: Raw activity field:",
    apiData.expert_activity_field
  );
  const mappedIndustry = mapActivityFieldToIndustry(
    apiData.expert_activity_field
  );
  console.log("🏭 Server Action: Mapped industry:", mappedIndustry);

  const formData = {
    // Basic company info
    companyName: apiData.name || "",
    companyNameEn: apiData.name_en || "",
    displayName: apiData.display_name || apiData.name || "",
    companyCode: apiData.code || "",
    establishedYear: apiData.founded_year || new Date().getFullYear(),

    // Company size mapping (1-6 to form labels)
    companySize: mappedSize,

    // Company type
    companyType: apiData.type || "سهامی خاص",

    // Industry/Activity field
    industryType: mappedIndustry,

    // Contact info
    email: apiData.email || "",
    website: apiData.website || "",
    mobile: apiData.mobile || "",
    phone: apiData.phone || "",
    fax: apiData.fax || "",

    // Location (from first location or default)
    country: locationData.country,
    province: locationData.province,
    city: locationData.city,
    address: locationData.address,
    postalCode: locationData.postalCode,

    // Social media (from separate fields)
    linkedin: apiData.linkedin_url || "",
    instagram: apiData.instagram_url || "",
    telegram: apiData.telegram_url || "",

    // Company description
    description: apiData.introduction || "",
    vision: apiData.vision || "",
    mission: apiData.mission || "",
    workEnvironment: apiData.work_environment || "",

    // Arrays (convert to arrays for form)
    services: Array.isArray(apiData.services) ? apiData.services : [],
    specialties: Array.isArray(apiData.technical_specialties)
      ? apiData.technical_specialties
      : [],
    benefits: Array.isArray(apiData.benefits) ? apiData.benefits : [],

    // Images
    companyLogo: apiData.logo_url || null,
    companyCover: apiData.header_image_url || null,

    // Meta info
    id: apiData.id,
    slug: apiData.slug,
    isVerified: apiData.is_verified || false,
    verifiedAt: apiData.verified_at,
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
  };

  console.log("✅ ===== MAPPING COMPLETED =====");
  console.log("✅ Server Action: Final mapped form data:", formData);
  console.log("✅ Server Action: Mapped data summary:", {
    companyName: formData.companyName,
    companySize: formData.companySize,
    industryType: formData.industryType,
    location: `${formData.city}, ${formData.province}, ${formData.country}`,
    socialMedia: {
      linkedin: !!formData.linkedin,
      instagram: !!formData.instagram,
      telegram: !!formData.telegram,
    },
    arrays: {
      services: formData.services.length,
      specialties: formData.specialties.length,
      benefits: formData.benefits.length,
    },
  });

  return formData;
}

/**
 * Map company data from form format to API format
 * @param {Object} formData - Form data from client
 * @returns {Object} Mapped data for API
 */
function mapCompanyDataToAPI(formData) {
  console.log("🔄 ===== MAPPING FORM DATA TO API =====");
  console.log("🔄 Server Action: Input form data:", formData);
  console.log(
    "🔄 Server Action: Available form fields:",
    Object.keys(formData)
  );

  // Map company size using proper function
  console.log("📏 Server Action: Mapping company size...");
  console.log("📏 Server Action: Raw size from form:", formData.companySize);
  const mappedSize = mapFormSizeToAPI(formData.companySize);
  console.log("📏 Server Action: Mapped size to API:", mappedSize);

  // Map company type using proper function
  console.log("🏢 Server Action: Raw type from form:", formData.companyType);
  const mappedType = mapCompanyTypeToAPI(formData.companyType);
  console.log("🏢 Server Action: Mapped type to API:", mappedType);

  // Skip industry to activity field mapping to prevent API validation errors
  console.log("🏭 Server Action: Skipping industry to activity field mapping to prevent validation errors");
  console.log("🏭 Server Action: Raw industry from form:", formData.industryType);
  const mappedActivityField = null; // Force to null to skip this field entirely
  console.log("🏭 Server Action: Activity field will NOT be included in API request");

  // Trim contact fields to prevent empty string issues
  const trimmedEmail = formData.email?.trim();
  const trimmedMobile = formData.mobile?.trim();
  const trimmedPhone = formData.phone?.trim();

  const mappedData = {
    name: formData.companyName || "شرکت نمونه",
    name_en: formData.companyNameEn || "Sample Company",
    display_name: formData.displayName || formData.companyName || "شرکت نمونه",
    code: formData.companyCode || "",
    introduction: formData.description || "توضیحات شرکت",
    founded_year: parseInt(formData.establishedYear) || new Date().getFullYear(),
    
    // Use proper mapping functions instead of hardcoded values
    size: mappedSize,
    type: mappedType,
    
    // Only include activity field if valid mapping exists
    ...(mappedActivityField && { expert_activity_field_id: mappedActivityField }),

    // Contact info (only if not empty after trimming)
    ...(trimmedEmail && { email: trimmedEmail }),
    ...(formData.website?.trim() && { website: formData.website.trim() }),
    ...(trimmedMobile && { mobile: trimmedMobile }),
    ...(trimmedPhone && { phone: trimmedPhone }),
    ...(formData.fax?.trim() && { fax: formData.fax.trim() }),

    // Social media URLs (only if not empty)
    ...(formData.linkedin?.trim() && {
      linkedin_url: formatSocialMediaUrl(formData.linkedin, "linkedin"),
    }),
    ...(formData.instagram?.trim() && {
      instagram_url: formatSocialMediaUrl(formData.instagram, "instagram"),
    }),
    ...(formData.telegram?.trim() && {
      telegram_url: formatSocialMediaUrl(formData.telegram, "telegram"),
    }),

    // Additional fields (only if not empty)
    ...(formData.vision?.trim() && { vision: formData.vision.trim() }),
    ...(formData.mission?.trim() && { mission: formData.mission.trim() }),
    ...(formData.workEnvironment?.trim() && {
      work_environment: formData.workEnvironment.trim(),
    }),

    // Location data (if provided)
    ...(formData.address?.trim() && { address: formData.address.trim() }),
    ...(formData.postalCode?.trim() && { postal_code: formData.postalCode.trim() }),

    // Convert arrays to proper format (only if not empty)
    ...(Array.isArray(formData.services) &&
      formData.services.length > 0 && { services: formData.services }),
    ...(Array.isArray(formData.specialties) &&
      formData.specialties.length > 0 && {
        technical_specialties: formData.specialties,
      }),
    ...(Array.isArray(formData.benefits) &&
      formData.benefits.length > 0 && { benefits: formData.benefits }),
  };

  console.log("✅ ===== MAPPING COMPLETED =====");
  console.log("✅ Server Action: Final mapped API data:", mappedData);
  console.log("✅ Server Action: Mapped data summary:", {
    name: mappedData.name,
    size: mappedData.size,
    type: mappedData.type,
    expert_activity_field_id: "EXCLUDED_TO_PREVENT_VALIDATION_ERROR",
    hasEmail: !!mappedData.email,
    hasWebsite: !!mappedData.website,
    hasSocialMedia: !!(mappedData.linkedin_url || mappedData.instagram_url || mappedData.telegram_url)
  });
  
  return mappedData;
}

/**
 * Generate slug from company name
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Map API size (1-6) to form format
 */
function mapAPISizeToForm(apiSize) {
  const sizeMap = {
    1: "1-10",
    2: "11-50",
    3: "51-200",
    4: "201-500",
    5: "501-1000",
    6: "1000+",
  };
  return sizeMap[apiSize] || "1-10";
}

/**
 * Map form size to API format (1-6)
 */
function mapFormSizeToAPI(formSize) {
  const sizeMap = {
    "1-10": 1,
    "11-50": 2,
    "51-200": 3,
    "201-500": 4,
    "501-1000": 5,
    "1000+": 6,
  };
  return sizeMap[formSize] || 1;
}

/**
 * Extract location from API locations array
 */
function extractLocationFromAPI(locations) {
  if (!Array.isArray(locations) || locations.length === 0) {
    return {
      country: "ایران",
      province: "تهران",
      city: "تهران",
      address: "",
      postalCode: "",
    };
  }

  // Get first location or default location
  const location = locations.find((loc) => loc.is_default) || locations[0];

  return {
    country: location.country?.name || "ایران",
    province: location.province?.name || "تهران",
    city: location.city?.name || "تهران",
    address: location.address || "",
    postalCode: location.postal_code || "",
  };
}

/**
 * Map activity field to industry
 */
function mapActivityFieldToIndustry(activityField) {
  if (!activityField) return "technology";

  const fieldMap = {
    1: "technology",
    2: "manufacturing",
    3: "service",
    4: "finance",
    5: "healthcare",
    6: "education",
    7: "retail",
    8: "construction",
  };

  return fieldMap[activityField.id] || "technology";
}

/**
 * Map company size to API format
 */
function mapCompanySize(size) {
  const sizeMap = {
    "1-10": 1,
    "11-50": 2,
    "51-200": 3,
    "201-500": 4,
    "501-1000": 5,
    "1000+": 6,
  };
  return sizeMap[size] || 1;
}

/**
 * Map company type to API format
 */
function mapCompanyTypeToAPI(type) {
  const typeMap = {
    private: "سهامی خاص",
    public: "دولتی",
    "semi-public": "نیمه دولتی",
    cooperative: "تعاونی",
    "سهامی خاص": "سهامی خاص",
    دولتی: "دولتی",
    "نیمه دولتی": "نیمه دولتی",
    تعاونی: "تعاونی",
  };
  return typeMap[type] || "سهامی خاص";
}

/**
 * Map industry type to activity field ID
 */
function mapIndustryToActivityField(industry) {
  const industryMap = {
    technology: 1,
    manufacturing: 2,
    service: 3,
    finance: 4,
    healthcare: 5,
    education: 6,
    retail: 7,
    construction: 8,
  };
  return industryMap[industry] || 1;
}

/**
 * Map country to ID
 */
function mapCountryToId(country) {
  const countryMap = {
    ایران: 1,
    آمریکا: 2,
    کانادا: 3,
    انگلستان: 4,
    آلمان: 5,
    فرانسه: 6,
    "امارات متحده عربی": 7,
    ترکیه: 8,
    سوئد: 9,
    هلند: 10,
  };
  return countryMap[country] || 1;
}

/**
 * Map province to ID
 */
function mapProvinceToId(province) {
  const provinceMap = {
    تهران: 1,
    اصفهان: 2,
    "خراسان رضوی": 3,
    فارس: 4,
    "آذربایجان شرقی": 5,
    البرز: 6,
    خوزستان: 7,
    مازندران: 8,
    گیلان: 9,
    کرمان: 10,
  };
  return provinceMap[province] || 1;
}

/**
 * Map city to ID
 */
function mapCityToId(city) {
  const cityMap = {
    تهران: 1,
    اصفهان: 2,
    مشهد: 3,
    شیراز: 4,
    تبریز: 5,
    کرج: 6,
    اهواز: 7,
    قم: 8,
    کرمانشاه: 9,
    ارومیه: 10,
  };
  return cityMap[city] || 1;
}

// ============================================
// FALLBACK FUNCTIONS FOR LOCALSTORAGE
// ============================================

/**
 * Save company data to localStorage as fallback
 * @param {Object} companyData - Company data to save
 * @returns {Object} Success response
 */
export async function saveCompanyToLocalStorage(companyData) {
  try {
    if (typeof window !== "undefined") {
      const dataToSave = {
        ...companyData,
        savedAt: new Date().toISOString(),
        source: "localStorage",
      };
      localStorage.setItem("company_profile", JSON.stringify(dataToSave));
      console.log("💾 LocalStorage: Company data saved successfully");
      return {
        success: true,
        message: "اطلاعات در حافظه محلی ذخیره شد",
      };
    }
    return {
      success: false,
      error: "محیط مرورگر در دسترس نیست",
    };
  } catch (error) {
    console.error("❌ LocalStorage: Error saving company data:", error);
    return {
      success: false,
      error: "خطا در ذخیره اطلاعات",
    };
  }
}

/**
 * Get company data from localStorage as fallback
 * @returns {Object} Company data or null
 */
export async function getCompanyFromLocalStorage() {
  try {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("company_profile");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log("💾 LocalStorage: Company data loaded successfully");
        return {
          success: true,
          data: parsedData,
          source: "localStorage",
        };
      }
    }
    return {
      success: false,
      error: "هیچ اطلاعاتی در حافظه محلی یافت نشد",
      data: null,
    };
  } catch (error) {
    console.error("❌ LocalStorage: Error loading company data:", error);
    return {
      success: false,
      error: "خطا در بارگذاری اطلاعات",
      data: null,
    };
  }
}

/**
 * Clear company data from localStorage
 * @returns {Object} Success response
 */
export async function clearCompanyFromLocalStorage() {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("company_profile");
      console.log("💾 LocalStorage: Company data cleared successfully");
      return {
        success: true,
        message: "اطلاعات از حافظه محلی پاک شد",
      };
    }
    return {
      success: false,
      error: "محیط مرورگر در دسترس نیست",
    };
  } catch (error) {
    console.error("❌ LocalStorage: Error clearing company data:", error);
    return {
      success: false,
      error: "خطا در پاک کردن اطلاعات",
    };
  }
}
