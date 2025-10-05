"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth";

export function useMe() {
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    setMounted(true);
  }, []);

  return useQuery({
    queryKey: ["me", token],
    queryFn: getMe,
    enabled: mounted && !!token,
    staleTime: 5 * 60 * 1000,
  });
}
