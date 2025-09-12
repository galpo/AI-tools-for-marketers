"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const RegisterSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email(),
    password: z.string().min(6, "Min 6 characters"),
    confirm: z.string().min(6),
  })
  .refine((vals) => vals.password === vals.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

type RegisterValues = z.infer<typeof RegisterSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function RegisterForm({ onSuccess, onError }: RegisterFormProps = {}) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", confirm: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterValues) => {
    setServerError(null);
    
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (error) {
        const errorMessage = error.message;
        setServerError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      if (authData.user) {
        reset();
        // Check if email confirmation is required
        if (!authData.session) {
          setServerError("Please check your email to confirm your account before signing in.");
        }
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
        <label htmlFor="name" className="text-sm font-medium">
          Full name
        </label>
        <input
          type="text"
          id="name"
          autoComplete="name"
          placeholder="Jane Doe"
          {...register("name")}
          className="w-full rounded-md border px-3 py-2"
          aria-invalid={!!errors.name || undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

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
          autoComplete="new-password"
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

      <div className="space-y-1">
        <label htmlFor="confirm" className="text-sm font-medium">
          Confirm password
        </label>
        <input
          type="password"
          id="confirm"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register("confirm")}
          className="w-full rounded-md border px-3 py-2"
          aria-invalid={!!errors.confirm || undefined}
          aria-describedby={errors.confirm ? "confirm-error" : undefined}
        />
        {errors.confirm && (
          <p id="confirm-error" className="text-xs text-red-600">
            {errors.confirm.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-black text-white py-2 disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
