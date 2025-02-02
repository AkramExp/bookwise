"use client";

import { getSession, SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const Providers = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
