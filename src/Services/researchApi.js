
const API_BASE_URL = (
  process.env.REACT_APP_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

async function parseResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
}

// Create an account when a guest submits a research enquiry.
export async function registerResearchUser(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/register-basic`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response, "Unable to create your account.");
}

// Sign in existing users.
export async function loginResearchUser(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response, "Unable to log in.");
}

// Submit enquiry, associating it with the logged-in user.
export async function submitResearchEnquiry(payload, token) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/research/enquiries`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return parseResponse(response, "Unable to submit your enquiry.");
}

// Existing admin functions
export async function fetchResearchEnquiries(token, status = "all") {
  const query = new URLSearchParams();

  if (status && status !== "all") {
    query.set("status", status);
  }

  const suffix = query.toString() ? `?${query.toString()}` : "";

  const response = await fetch(
    `${API_BASE_URL}/admin/research-enquiries${suffix}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await parseResponse(
    response,
    "Unable to load research enquiries."
  );

  return data.enquiries || [];
}

export async function updateResearchEnquiry(token, id, updates) {
  const response = await fetch(
    `${API_BASE_URL}/admin/research-enquiries/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    }
  );

  const data = await parseResponse(
    response,
    "Unable to update enquiry."
  );

  return data.enquiry;
}
