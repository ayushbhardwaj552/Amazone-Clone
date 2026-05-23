"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { supabase } from "../../lib/supabase/products";
import logo from "../../public/logo.png";

type AuthView = "login" | "signup" | "forgot";
type AuthFormProps = { defaultView?: AuthView };

function AuthFormContent({ defaultView = "login" }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [view, setView] = useState<AuthView>(defaultView);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resetMessages = () => { setError(""); setMessage(""); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (signInError) { setError(signInError.message); return; }
    router.push(redirectTo);
    router.refresh();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(), password,
      options: { data: { full_name: fullName.trim() }, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (signUpError) { setError(signUpError.message); return; }
    if (data.session) { router.push(redirectTo); router.refresh(); return; }
    setMessage("Account created! Check your email to confirm your account, then sign in.");
    setView("login");
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    if (!email.trim()) { setError("Enter your email address."); return; }
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(), { redirectTo: `${window.location.origin}/auth/callback?type=recovery` },
    );
    setLoading(false);
    if (resetError) { setError(resetError.message); return; }
    setMessage("Password reset link sent. Check your email.");
  };

  const inputClass =
    "w-full rounded-sm border border-[#888C8C] px-3 py-2 text-[13px] text-[#0F1111] bg-white shadow-inner outline-none focus:border-[#e77600] focus:ring-2 focus:ring-[#e7770040] transition";

  return (
    <div className="min-h-[calc(100vh-60px)] bg-white py-8">
      <div className="mx-auto w-full max-w-[350px] px-4">
        {/* Logo */}
        <div className="mb-5 flex justify-center">
          <Link href="/">
            <Image src={logo} alt="Amazon" width={100} height={30} />
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-sm border border-gray-300 bg-white p-6 shadow-sm">
          <h1 className="text-[28px] font-normal text-[#0F1111] mb-4">
            {view === "login" && "Sign in"}
            {view === "signup" && "Create account"}
            {view === "forgot" && "Password assistance"}
          </h1>

          {error && (
            <div className="mb-4 rounded-sm border border-[#E77600] bg-[#FFF8F0] px-3 py-2.5 text-[13px] text-[#B12704] flex gap-x-2 items-start">
              <span className="text-[#B12704] font-bold mt-0.5">!</span>
              <span>{error}</span>
            </div>
          )}
          {message && (
            <div className="mb-4 rounded-sm border border-green-300 bg-green-50 px-3 py-2.5 text-[13px] text-green-800">
              {message}
            </div>
          )}

          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">Email or mobile phone number</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[13px] font-bold text-[#0F1111]">Password</label>
                </div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} autoComplete="current-password" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-sm bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] text-[13px] text-[#111] py-2 shadow-sm hover:from-[#f5d78e] hover:to-[#eeb933] disabled:opacity-60 transition"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <p className="text-[11px] text-[#565959] leading-relaxed mt-2">
                By continuing, you agree to Amazon&apos;s{" "}
                <Link href="/" className="text-[#007185] hover:text-[#c45500] hover:underline">Conditions of Use</Link>
                {" "}and{" "}
                <Link href="/" className="text-[#007185] hover:text-[#c45500] hover:underline">Privacy Notice</Link>.
              </p>

              <button
                type="button"
                onClick={() => { resetMessages(); setView("forgot"); }}
                className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline block"
              >
                Forgot your password?
              </button>
            </form>
          )}

          {view === "signup" && (
            <form onSubmit={handleSignup} className="space-y-3">
              {[
                { label: "Your name", type: "text", value: fullName, setter: setFullName, autoComplete: "name" },
                { label: "Mobile number or email", type: "email", value: email, setter: setEmail, autoComplete: "email" },
                { label: "Password (at least 6 characters)", type: "password", value: password, setter: setPassword, autoComplete: "new-password" },
                { label: "Re-enter password", type: "password", value: confirmPassword, setter: setConfirmPassword, autoComplete: "new-password" },
              ].map(({ label, type, value, setter, autoComplete }) => (
                <div key={label}>
                  <label className="block text-[13px] font-bold text-[#0F1111] mb-1">{label}</label>
                  <input
                    type={type}
                    required
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className={inputClass}
                    autoComplete={autoComplete}
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-sm bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] text-[13px] text-[#111] py-2 shadow-sm hover:from-[#f5d78e] hover:to-[#eeb933] disabled:opacity-60 transition mt-2"
              >
                {loading ? "Creating account..." : "Continue"}
              </button>
              <p className="text-[11px] text-[#565959] leading-relaxed">
                By creating an account, you agree to Amazon&apos;s{" "}
                <Link href="/" className="text-[#007185] hover:underline">Conditions of Use</Link>
                {" "}and{" "}
                <Link href="/" className="text-[#007185] hover:underline">Privacy Notice</Link>.
              </p>
            </form>
          )}

          {view === "forgot" && (
            <form onSubmit={handleForgotPassword} className="space-y-3">
              <p className="text-[13px] text-[#565959]">
                Enter the email address or mobile phone number associated with your Amazon account.
              </p>
              <div>
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">Email or mobile phone number</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-sm bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] text-[13px] text-[#111] py-2 shadow-sm hover:from-[#f5d78e] hover:to-[#eeb933] disabled:opacity-60 transition"
              >
                {loading ? "Sending..." : "Continue"}
              </button>
              <button type="button" onClick={() => { resetMessages(); setView("login"); }} className="text-[13px] text-[#007185] hover:underline block">
                ← Back to Sign in
              </button>
            </form>
          )}
        </div>

        {/* Divider */}
        <div className="relative flex items-center my-5">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-[12px] text-[#767676] flex-shrink-0">New to Amazon?</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {view === "login" ? (
          <button
            type="button"
            onClick={() => { resetMessages(); setView("signup"); }}
            className="w-full rounded-sm bg-white border border-gray-400 hover:bg-[#f7f8f8] text-[13px] text-[#0F1111] py-2 shadow-sm transition"
          >
            Create your Amazon account
          </button>
        ) : (
          <button
            type="button"
            onClick={() => { resetMessages(); setView("login"); }}
            className="w-full rounded-sm bg-white border border-gray-400 hover:bg-[#f7f8f8] text-[13px] text-[#0F1111] py-2 shadow-sm transition"
          >
            Sign in to your account
          </button>
        )}
      </div>

      {/* Footer links */}
      <div className="mt-8 border-t border-gray-200 pt-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[#007185]">
          <Link href="/" className="hover:text-[#c45500] hover:underline">Conditions of Use</Link>
          <Link href="/" className="hover:text-[#c45500] hover:underline">Privacy Notice</Link>
          <Link href="/" className="hover:text-[#c45500] hover:underline">Help</Link>
        </div>
        <p className="mt-2 text-[11px] text-[#767676]">© 1996-2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}

export default function AuthForm(props: AuthFormProps) {
  return (
    <Suspense fallback={null}>
      <AuthFormContent {...props} />
    </Suspense>
  );
}
