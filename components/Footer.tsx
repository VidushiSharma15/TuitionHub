export default function Footer() {
    return (
      <footer className="border-t mt-20">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TuitionHub. All Rights Reserved.
        </div>
      </footer>
    );
  }