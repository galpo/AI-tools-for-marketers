"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Min 6 characters"),
});

type LoginValues = z.infer<typeof LoginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function LoginForm({ onSuccess, onError }: LoginFormProps = {}) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginValues) => {
    setServerError(null);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        const errorMessage = error.message;
        setServerError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      if (authData.user) {
        reset();
        onSuccess?.();
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred. Please try again.";
      setServerError(errorMessage);
      onError?.(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-600">{serverError}</p>
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
          className="w-full rounded-md border px-3 py-2"
          aria-invalid={!!errors.email || undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register("password")}
          className="w-full rounded-md border px-3 py-2"
          aria-invalid={!!errors.password || undefined}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p id="password-error" className="text-xs text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-black text-white py-2 disabled:opacity-50"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
