import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface SubmitButtonProps {
    isComplete: boolean;
    processing: boolean;
    onClick?: () => void;
}

export default function SubmitButton({ isComplete, processing }: SubmitButtonProps) {
    return (
        <>
            <Button type="submit" className="h-12 w-full text-base font-medium" disabled={!isComplete || processing}>
                {processing ? (
                    'Submitting...'
                ) : isComplete ? (
                    <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Complete Setup
                    </>
                ) : (
                    'Complete all fields'
                )}
            </Button>

            {isComplete && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Ready to get started!
                </div>
            )}
        </>
    );
}
