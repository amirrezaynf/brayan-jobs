// Custom error class for fetcher
class FetcherError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "FetcherError";
    this.status = status;
    this.data = data;
  }
}

export const fetcher = async (
  url,
  options = {},
  token,
  language = "fa",
  cacheStatus = "no-store",
  nextRevalidate
) => {
  console.log("🚀 ~ url:", url, language);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    locale: language,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
    cache: cacheStatus,
  };

  if (nextRevalidate !== undefined) {
    config.next = { revalidate: nextRevalidate };
  }

  console.log("🚀 ~ config:", url, config);

  try {
    const res = await fetch(url, config);
    const contentType = res.headers.get("Content-Type") || "";

    console.log("📦 Raw response:", res);
    console.log("📦 Content-Type:", contentType);

    const isJson = contentType.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      throw new FetcherError(
        data?.message || `Request failed with status ${res.status}`,
        res.status,
        data
      );
    }

    return {
      data,
      status: res.status,
    };
  } catch (err) {
    if (err instanceof FetcherError) throw err;
    console.log("❌ Unexpected fetcher error:", {
      message: err?.message,
      stack: err?.stack,
    });

    throw new FetcherError("Unexpected fetch error occurred", 500, {
      message: "Unexpected fetch error occurred",
      errors: null,
      raw: null,
      data: {
        message: err?.message,
        stack: err?.stack,
      },
    });
  }
};
