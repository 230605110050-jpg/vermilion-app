"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Generate an ID if it doesn't exist in sessionStorage
    let storedId = sessionStorage.getItem("vermilion_guest_id");
    if (!storedId) {
      const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
      storedId = `GUEST-${randomString}`;
      sessionStorage.setItem("vermilion_guest_id", storedId);
    }
    setUserId(storedId);
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
