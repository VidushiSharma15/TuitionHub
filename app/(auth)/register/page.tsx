"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
const [bio, setBio] = useState("");
const [hourlyRate, setHourlyRate] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log(data.session);
console.log(data.user);

    if (error) {
      alert(error.message);
      return;
    }

    if (!data.user) {
      alert("User not created");
      return;
    }
    const { error: profileError } = await supabase
  .from("profiles")
  .insert({
    id: data.user.id,
    full_name: fullName,
    role: "student",
  });

if (profileError) {
  console.error(profileError);
  alert(profileError.message);
  return;
}
    
    const { error: tutorError } = await supabase
      .from("tutors")
      .insert({
        id: data.user.id,
        name: fullName,
        subject: subject,
        bio: bio,
        hourly_rate: Number(hourlyRate),
        rating: 5,
      });
    
      if (tutorError) {
        console.error("Tutor Insert Error:", tutorError);
        alert(JSON.stringify(tutorError, null, 2));
        return;
      }
    
    alert("Account created successfully!");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold">Create Account</h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Create your account to start booking tutors.
      </p>

      <form onSubmit={handleRegister} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
  <label className="block text-sm font-medium">
    Subject
  </label>

  <input
    type="text"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
    placeholder="e.g. Mathematics"
    required
  />
</div>
<div>
  <label className="block text-sm font-medium">
    Bio
  </label>

  <textarea
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
    rows={3}
    required
  />
</div>
<div>
  <label className="block text-sm font-medium">
    Hourly Rate
  </label>

  <input
    type="number"
    value={hourlyRate}
    onChange={(e) => setHourlyRate(e.target.value)}
    className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
    placeholder="e.g. 500"
    required
  />
</div>

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}