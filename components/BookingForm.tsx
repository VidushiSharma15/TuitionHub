"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type BookingFormProps = {
  tutorId: string;
};

export default function BookingForm({
  tutorId,
}: BookingFormProps) {
  const [scheduledAt, setScheduledAt] = useState("");

  async function handleBooking() {
    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      const { error } = await supabase
        .from("bookings")
        .insert({
          student_id: user.id,
          tutor_id: tutorId,
          scheduled_at: scheduledAt,
          status: "pending",
        });

      if (error) {
        alert(error.message);
        console.error(error);
        return;
      }

      alert("Booking created successfully!");
      setScheduledAt("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <div className="mt-6 rounded-xl border p-6">
      <p>Select a date and time for your session.</p>

      <input
        type="datetime-local"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
        className="mt-4 w-full rounded-md border p-2"
      />

      <button
        onClick={handleBooking}
        className="mt-4 rounded-md bg-purple-600 px-4 py-2 text-white"
      >
        Confirm Booking
      </button>
    </div>
  );
}