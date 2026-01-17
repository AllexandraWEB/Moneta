"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { signup } from "@/src/app/actions/auth";
import Link from "next/link";
import { useActionState } from "react";
import { Field, FieldSeparator } from "@/src/components/ui/field";
import { createClient } from "@/src/lib/supabase/client";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: { error: string } | undefined, formData: FormData) => {
      return await signup(formData);
    },
    undefined
  );

  const supabase = createClient();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-bottom px-4">
      <div className="w-full max-w-md">
        <div className="p-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Create account</h1>
            <p className="text-muted-foreground">Sign up to get started</p>
          </div>

          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-base font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                disabled={isPending}
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-base font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                disabled={isPending}
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-base font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                disabled={isPending}
                className="mt-1"
              />
            </div>

            {state?.error && (
              <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
                {state.error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              variant="dark"
              size="lg"
            >
              {isPending ? "Creating account..." : "Create account"}
            </Button>

            <FieldSeparator>OR CONTINUE WITH</FieldSeparator>
            <Field className="mt-5">
              {/* oAuth - Google */}
              <Button variant="outline" size="lg" type="button" onClick={signInWithGoogle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Google
              </Button>
              {/* oAuth - Apple */}
              <Button variant="outline" size="lg" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Apple
              </Button>
            </Field>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-dark-background dark:text-white font-medium hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
