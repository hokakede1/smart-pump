export default {
  login: async (email, password) => {
    const response = await fetch("/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    return response;
  },
  getUserData: async () => {
    const response = await fetch("/data", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  },
  getTransactions: async () => {
    const response = await fetch("/transactions", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  },
  logout: async () => {
    const response = await fetch("/logout", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await response;
  }
};
