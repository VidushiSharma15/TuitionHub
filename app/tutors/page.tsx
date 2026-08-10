import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type TutorsPageProps = {
  searchParams: Promise<{
    search?: string;
    maxPrice?: string;
  }>;
};

export default async function TutorsPage({
  searchParams,
}: TutorsPageProps) {
  const supabase = await createClient();

  const { search = "", maxPrice = "" } = await searchParams;

  let query = supabase
    .from("tutors")
    .select("*")
    .order("rating", { ascending: false });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,subject.ilike.%${search}%`
    );
  }

  if (maxPrice) {
    query = query.lte("hourly_rate", Number(maxPrice));
  }

  const { data: tutors, error } = await query;

  if (error) {
    return (
      <div className="p-10">
        <h1>Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Browse Tutors</h1>

      <p className="mt-2 text-muted-foreground">
        Find a tutor that matches your subject and budget.
      </p>

      <form className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by tutor name or subject..."
          className="flex-1 rounded-lg border px-4 py-3"
        />

        <input
          type="number"
          name="maxPrice"
          defaultValue={maxPrice}
          placeholder="Max Price"
          className="w-40 rounded-lg border px-4 py-3"
        />

        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
        >
          Search
        </button>
      </form>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tutors?.map((tutor) => (
          <Link
            key={tutor.id}
            href={`/tutors/${tutor.id}`}
            className="rounded-xl border border-border p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold">{tutor.name}</h2>

                <p className="text-sm text-primary">
                  {tutor.subject}
                </p>
              </div>

              <span className="text-sm font-medium">
                ★ {tutor.rating}
              </span>
            </div>

            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {tutor.bio}
            </p>

            <p className="mt-4 text-sm font-semibold">
              ₹{tutor.hourly_rate}/hour
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}