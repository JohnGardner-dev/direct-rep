import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let internalToken = null;

export function getToken() {
  return internalToken;
}

// changed from api/accounts/me/token
export async function getTokenInternal() {
  const url = `${process.env.REACT_APP_USERS_API_HOST}/token/`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log("token data test", data);
      internalToken = data.access_token;
      return internalToken;
    }
  } catch (e) {}
  return false;
}

function handleErrorMessage(error) {
  if ("error" in error) {
    error = error.error;
    try {
      error = JSON.parse(error);
      if ("__all__" in error) {
        error = error.__all__;
      }
    } catch {}
  }
  if (Array.isArray(error)) {
    error = error.join("<br>");
  } else if (typeof error === "object") {
    error = Object.entries(error).reduce(
      (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
      ""
    );
  }
  return error;
}

export const AuthContext = createContext({
  token: null,
  setToken: () => null,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export function useToken() {
  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      console.log("fetch token test", token);
      setToken(token);
    }
    if (!token) {
      fetchToken();
    }
  }, [setToken, token]);

  async function logout() {
    if (token) {
      const url = `${process.env.REACT_APP_USERS_API_HOST}/token/`;
      await fetch(url, { method: "delete", credentials: "include" });
      internalToken = null;
      setToken(null);
      navigate("/");
    }
  }

  // changed endpoint from login to token
  async function login(username, password) {
    console.log("LOGIN TOKEN TEST");
    const url = `${process.env.REACT_APP_USERS_API_HOST}/token/`;
    const form = new FormData();
    form.append("username", username);
    console.log("token test", username);
    form.append("password", password);
    console.log("token test", password);
    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    });
    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      return;
    }
    let error = await response.json();
    return handleErrorMessage(error);
  }

  async function signup(username, password, email, firstName, lastName) {
    const url = `${process.env.REACT_APP_USERS_API_HOST}/api/accounts/`;
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await login(username, password);
    }
    return false;
  }

  async function update(username, password, email, firstName, lastName) {
    const url = `${process.env.REACT_APP_USERS_API_HOST}/api/accounts/`;
    const response = await fetch(url, {
      method: "patch",
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await login(username, password);
    }
    return false;
  }

  return [token, login, logout, signup, update];
}