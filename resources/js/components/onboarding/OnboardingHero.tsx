import { CheckCircle2, GraduationCap } from "lucide-react";

export default function OnboardingHero() {
    return (
        <div className="flex flex-col items-center lg:items-start justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Almost Ready</span>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                        Welcome to <span className="text-primary">Khadim AI</span>
                    </h1>
                    <p className="text-lg text-muted-foreground text-pretty">
                        Your intelligent research companion for academic excellence
                    </p>
                </div>
            </div>

            <div className="relative flex justify-center lg:justify-start">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <GraduationCap className="w-16 h-16 text-primary" />
                    </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/60 rounded-full animate-pulse delay-300" />
            </div>
        </div>
    );
}