import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find the Perfect Tutor for Every Subject
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Browse qualified tutors, compare rates, book sessions, and start
            learning with confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/tutors">Browse Tutors</Button>

            <Button variant="outline" href="/register">
              Become a Tutor
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <h2 className="text-3xl font-bold text-primary">500+</h2>
              <p className="text-sm text-muted-foreground">
                Students
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">100+</h2>
              <p className="text-sm text-muted-foreground">
                Tutors
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">25+</h2>
              <p className="text-sm text-muted-foreground">
                Subjects
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">4.9★</h2>
              <p className="text-sm text-muted-foreground">
                Average Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-semibold">
          How It Works
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Search",
              description:
                "Search tutors by subject, price, and experience.",
            },
            {
              step: "2",
              title: "Book",
              description:
                "Choose a suitable date and book your session.",
            },
            {
              step: "3",
              title: "Learn",
              description:
                "Attend the session and improve your skills.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-border bg-background p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {item.step}
              </div>

              <h3 className="mt-4 font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}