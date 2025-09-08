interface OnboardingProgressProps {
    completedFields: number;
    totalFields: number;
    progressPercentage: number;
}

export default function OnboardingProgress({ 
    completedFields, 
    totalFields, 
    progressPercentage 
}: OnboardingProgressProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                    {completedFields} of {totalFields} completed
                </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    );
}