import { Skeleton } from "@/components/ui/skeleton";

const DetailedWeatherSkeleton = () => {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {/* Back Button */}
      <Skeleton className="h-8 w-24 bg-white/20" />

      {/* City Name */}
      <Skeleton className="h-10 w-3/4 bg-white/20" />

      {/* Hourly Forecast */}
      <div className="mt-8">
        <Skeleton className="h-6 w-40 mb-4 bg-white/20" />
        <div className="flex gap-4 overflow-x-auto py-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="flex flex-col items-center space-y-2 min-w-[100px]"
            >
              <Skeleton className="h-4 w-16 bg-white/20" />
              <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
              <Skeleton className="h-6 w-12 bg-white/20" />
            </div>
          ))}
        </div>
      </div>

      {/* 5 Day Forecast Skeleton */}
      <div className="mt-8">
        <Skeleton className="h-6 w-48 mb-4 bg-white/20" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex justify-between items-center">
              <Skeleton className="h-6 w-24 bg-white/20" />
              <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
              <Skeleton className="h-6 w-24 bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedWeatherSkeleton;
