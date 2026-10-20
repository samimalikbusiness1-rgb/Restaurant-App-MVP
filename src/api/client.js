import AsyncStorage from "@react-native-async-storage/async-storage";

// Apne computer ka current local IP yahan rakho.
// Phone par app chalate waqt localhost use nahi karna.
export const BASE_URL = "http://192.168.100.84:5000";

export async function apiRequest(endpoint, options = {}) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
