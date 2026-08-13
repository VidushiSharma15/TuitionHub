import CancelBookingButton from "@/components/CancelBookingButton";
import LogoutButton from "@/components/LogoutButton";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(`
      *,
      tutors (
        name,
        subject
      )
    `)
    .eq("student_id", user.id);

  if (error) {
    console.error(error);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      <p className="mt-2 text-muted-foreground">
        Welcome, {user.email}
      </p>

      <div className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">My Bookings</h2>

        {!bookings || bookings.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No bookings yet.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-lg border p-4"
              >
                <p>
                  <strong>Tutor:</strong>{" "}
                  {booking.tutors?.name || "Unknown Tutor"}
                </p>

                <p>
                  <strong>Subject:</strong>{" "}
                  {booking.tutors?.subject || "N/A"}
                </p>

                <p>
                  <strong>Status:</strong> {booking.status}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    booking.scheduled_at
                  ).toLocaleString()}
                </p>
               <p>
  <strong>Booking ID:</strong> {booking.id}
</p>

<CancelBookingButton bookingId={booking.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}