import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface SubmitButtonProps {
    isComplete: boolean;
    processing: boolean;
    onClick?: () => void;
}

export default function SubmitButton({ isComplete, processing, onClick }: SubmitButtonProps) {
    return (
        <>
            <Button 
                type="submit"
                className="w-full h-12 text-base font-medium" 
                disabled={!isComplete || processing}
            >
                {processing ? (
                    "Submitting..."
                ) : isComplete ? (
                    <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Complete Setup
                    </>
                ) : (
                    "Complete all fields"
                )}
            </Button>

            {isComplete && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Ready to get started!
                </div>
            )}
        </>
    );
}