export async function verifyToken(token) {
  try {
    // Make a request to the backend for token verification
    const response = await fetch("http://127.0.0.1:8000/users/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is successful
    if (response.ok) {
      // Token is valid
      return response.json();
    } else {
      // Token is invalid
      console.error("Token verification failed:", response.status);
      return false;
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error verifying token:", error);
    return false;
  }
}
