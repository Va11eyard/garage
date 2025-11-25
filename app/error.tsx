'use client'

export default function Error({error, reset}: {
    error: Error & { digest?: string }
    reset: () => void;
}) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Произошла ошибка
                </h2>
                <p className="text-gov-text-secondary mb-4">
                    {error.message}
                </p>
                <button
                onClick={reset}
                className="px-4 py-2 bg-gov-primary text- rounded hover:bg-gov-primary-hover"
                >
                    Попробовать снова
                </button>
            </div>
        </div>
    )
}