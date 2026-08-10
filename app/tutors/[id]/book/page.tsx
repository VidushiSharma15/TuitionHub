import BookingForm from "@/components/BookingForm";

type BookTutorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookTutorPage({
  params,
}: BookTutorPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        Book a Session
      </h1>

      <BookingForm tutorId={id} />
    </div>
  );
}