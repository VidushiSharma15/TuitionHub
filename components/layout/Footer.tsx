export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold">TuitionHub</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Connecting students with qualified tutors for a better learning
              experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Home</li>
              <li>Browse Tutors</li>
              <li>Dashboard</li>
              <li>Register</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold">Contact</h3>

            <p className="mt-3 text-sm text-muted-foreground">
              Email: support@tuitionhub.com
            </p>

            <p className="text-sm text-muted-foreground">
              Phone: +91 98765 43210
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TuitionHub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}