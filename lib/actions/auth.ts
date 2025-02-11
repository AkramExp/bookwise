"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "next-auth/react";

export const signInWithCredentials = async (
  params: Pick<AuthCrendentials, "email" | "password">
) => {
  const { email, password } = params;
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Singin error" };
  }
};

export const signUp = async (params: AuthCrendentials) => {
  const { fullName, email, universityCard, universityId, password } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0)
    return { success: false, error: "User already exists" };

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName: fullName,
      email: email,
      universityCard: universityCard,
      universityId: universityId,
      password: hashedPassword,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "SignUp Error" };
  }
};
