import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md xl:text-title-2xl">
            ERROR
          </h1>

          <img src="/images/Coffee 1.jpg" alt="404" className="h-full w-full" />

          <p className="mt-10 mb-6 text-base text-gray-700 sm:text-lg">
            We can’t seem to find the page you are looking for!
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-subtitle-xs hover:bg-gray-50 hover:text-gray-800"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </>
  );
}
