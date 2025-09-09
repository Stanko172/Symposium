interface OnboardingProgressProps {
    completedFields: number;
    totalFields: number;
    progressPercentage: number;
}

export default function OnboardingProgress({ completedFields, totalFields, progressPercentage }: OnboardingProgressProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                    {completedFields} of {totalFields} completed
                </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progressPercentage}%` }} />
            </div>
        </div>
    );
}
