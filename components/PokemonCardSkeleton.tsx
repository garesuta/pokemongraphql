'use client'

function PokemonCardSkeleton() {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg mb-4"></div>
            <div className="flex justify-center items-center overflow-hidden rounded-lg w-full h-[220px] relative z-0 mt-4 bg-gray-200"></div>
            <div className="h-12 bg-gray-200 rounded-2xl mt-4"></div>
            <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 rounded-lg p-2 space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-2 space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCardSkeleton;