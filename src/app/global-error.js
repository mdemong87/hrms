'use client'

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body className="flex h-screen w-screen items-center justify-center bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
                <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                        Something went wrong!
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                        {error?.message || "An unexpected error occurred. Please try again."}
                    </p>
                    <button
                        onClick={() => reset()}
                        className="mt-6 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        Try Again
                    </button>
                </div>
            </body>
        </html>
    )
}
