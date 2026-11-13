import { Link } from "react-router";

function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100svh-64px)] items-center justify-center overflow-hidden bg-white px-4 py-4 sm:px-6 sm:py-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-64 w-64 rounded-full bg-blue-100/70 blur-[90px]" />
        <div className="absolute -bottom-40 -right-40 h-72 w-72 rounded-full bg-indigo-100/70 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center">
        {/* Heading */}
        <h1 className="mb-2 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:mb-3 sm:text-5xl md:text-6xl">
          oops!
        </h1>

        <h2 className="mb-2 text-lg font-bold text-slate-900 sm:mb-3 sm:text-xl md:text-2xl">
          Looks like this page got lost!
        </h2>

        <p className="mx-auto mb-4 max-w-sm text-xs leading-5 text-slate-500 sm:mb-5 sm:text-sm sm:leading-6">
          We searched everywhere, but couldn't find the page you're looking for.
          Maybe it's time to head back home?
        </p>

        {/* Back home button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-7 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-300 active:translate-y-0"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M3 10.5L12 3l9 7.5V21h-6v-6H9v6H3V10.5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          BACK TO HOME
        </Link>

        {/* Illustration */}
        <div className="mx-auto mt-4 w-full max-w-47.5 sm:mt-5 sm:max-w-65 md:max-w-[320px]">
          <svg
            viewBox="0 0 500 330"
            className="h-auto w-full drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground shadow */}
            <ellipse cx="250" cy="291" rx="155" ry="13" fill="#dbeafe" />

            {/* Character body */}
            <path
              d="M104 220 C105 158 158 117 222 132 C258 105 329 117 366 157 C408 180 421 228 387 251 C357 270 295 269 249 258 C194 276 117 265 104 220Z"
              fill="#e0e7ff"
              stroke="#3b82f6"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Head */}
            <path
              d="M111 220 C93 181 110 123 153 105 C180 75 230 87 252 119 C275 153 258 214 227 245 C192 275 130 260 111 220Z"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="7"
              strokeLinejoin="round"
            />

            {/* Ears */}
            <path
              d="M133 117 C117 86 128 57 153 43 C151 73 168 65 183 61 C213 55 232 77 220 98 C246 102 252 124 240 140"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="7"
              strokeLinejoin="round"
            />

            <path
              d="M115 186 C83 175 61 191 60 219 C75 207 81 218 76 233 C73 253 94 260 115 246"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="7"
              strokeLinejoin="round"
            />

            {/* Sleeping face */}
            <path
              d="M176 154 C187 169 180 188 164 194"
              stroke="#1e40af"
              strokeWidth="7"
              strokeLinecap="round"
            />

            <ellipse
              cx="207"
              cy="202"
              rx="26"
              ry="19"
              transform="rotate(32 207 202)"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="7"
            />

            <circle
              cx="233"
              cy="239"
              r="7"
              fill="#6366f1"
              stroke="#3b82f6"
              strokeWidth="5"
            />

            {/* Front paw */}
            <path
              d="M128 258 C167 246 208 253 232 270 C248 283 231 295 198 292 C164 290 126 291 111 277"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="7"
              strokeLinejoin="round"
            />

            {/* Drink cup */}
            <path
              d="M280 151 L297 257 C301 279 350 283 356 258 L372 151Z"
              fill="#6366f1"
              stroke="#3b82f6"
              strokeWidth="7"
              strokeLinejoin="round"
            />

            <path
              d="M274 143 C274 127 379 127 379 143 L379 156 C379 177 274 177 274 156Z"
              fill="#ffffff"
              stroke="#3b82f6"
              strokeWidth="7"
            />

            {/* Straw */}
            <path
              d="M330 135 C322 101 334 63 355 37"
              stroke="#3b82f6"
              strokeWidth="11"
              strokeLinecap="round"
            />

            <path
              d="M330 135 C322 101 334 63 355 37"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Cookies */}
            <ellipse
              cx="268"
              cy="292"
              rx="30"
              ry="17"
              fill="#fbbf24"
              stroke="#3b82f6"
              strokeWidth="6"
            />

            <ellipse
              cx="344"
              cy="300"
              rx="27"
              ry="15"
              fill="#fbbf24"
              stroke="#3b82f6"
              strokeWidth="6"
            />

            <g fill="#1e40af">
              <circle cx="257" cy="287" r="3.5" />
              <circle cx="276" cy="294" r="3.5" />
              <circle cx="266" cy="300" r="3.5" />
              <circle cx="337" cy="296" r="3.5" />
              <circle cx="353" cy="303" r="3.5" />
              <circle cx="342" cy="308" r="3.5" />
            </g>
          </svg>
        </div>

        {/* Footer */}
        <p className="mt-3 text-[9px] font-semibold tracking-[0.15em] text-slate-400 sm:mt-4 sm:text-xs">
          TASKFLOW <span className="mx-2 text-blue-500">·</span>
          EVERY TASK HAS A HOME
        </p>
      </div>
    </main>
  );
}

export default NotFound;
