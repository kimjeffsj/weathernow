import { Skeleton } from "@/components/ui/skeleton";

const MainSkeleton = () => {
  return (
    <div className="space-y-4 w-full animate-pulse py-5">
      {/* City Name Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-8 w-3/4 bg-white/20" />
      </div>

      {/* Weather Icon and Temp */}
      <div className="flex flex-col items-center space-y-4 my-8">
        <Skeleton className="h-40 w-40 rounded-full bg-white/20" />
        <Skeleton className="h-16 w-32 bg-white/20" />
        <Skeleton className="h-6 w-40 bg-white/20" />
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {[1, 2].map((item) => (
          <div key={item} className="flex flex-col items-center space-y-2">
            <Skeleton className="h-4 w-16 bg-white/20" />
            <Skeleton className="h-6 w-20 bg-white/20" />
          </div>
        ))}
      </div>

      {/* View Details Button Skeleton */}
      <div className="mt-8">
        <Skeleton className="h-10 w-full bg-white/20" />
      </div>
    </div>
  );
};

export default MainSkeleton;
