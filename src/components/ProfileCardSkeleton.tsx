import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileCardSkeleton() {
  return (
    <div className="w-full max-w-lg">
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="h-24 bg-muted" />
        <CardContent className="relative px-6 pb-6 pt-0">
          <div className="-mt-12 flex flex-col items-center gap-3 pb-4">
            <Skeleton className="size-24 rounded-full border-4 border-background" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <div className="space-y-3 rounded-lg bg-muted/40 p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-md" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-md" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
          <Skeleton className="mt-6 h-10 w-full rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
