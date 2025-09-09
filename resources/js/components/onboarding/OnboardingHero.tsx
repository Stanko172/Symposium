import { CheckCircle2, GraduationCap } from 'lucide-react';

export default function OnboardingHero() {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 text-center lg:items-start lg:text-left">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Almost Ready</span>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-balance lg:text-5xl">
                        Welcome to <span className="text-primary">Khadim AI</span>
                    </h1>
                    <p className="text-lg text-pretty text-muted-foreground">Your intelligent research companion for academic excellence</p>
                </div>
            </div>

            <div className="relative flex justify-center lg:justify-start">
                <div className="flex h-64 w-64 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5">
                    <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-primary/10">
                        <GraduationCap className="h-16 w-16 text-primary" />
                    </div>
                </div>
                <div className="absolute -top-4 -right-4 h-8 w-8 animate-pulse rounded-full bg-primary" />
                <div className="absolute -bottom-2 -left-2 h-6 w-6 animate-pulse rounded-full bg-primary/60 delay-300" />
            </div>
        </div>
    );
}
