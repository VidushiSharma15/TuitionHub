"use client";

import { createClient } from "@/lib/supabase/client";

type Props = {
  bookingId: string;
};

export default function CancelBookingButton({ bookingId }: Props) {
  const handleCancel = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
  .from("bookings")
  .delete()
  .eq("id", bookingId)
  .select();

console.log("Deleted rows:", data);
console.log("Delete error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Booking cancelled successfully!");

    window.location.reload();
  };

  return (
    <button
      onClick={handleCancel}
      className="mt-3 rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50"
    >
      Cancel Booking
    </button>
  );
}