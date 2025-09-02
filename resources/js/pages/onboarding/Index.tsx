import { AppContent } from '@/components/app-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';

export default function OnboardingIndex() {
    return (
        <>
            <Head title="Onboarding" />
            <AppContent>
                <div className="flex min-h-screen items-center justify-center p-6">
                    <Card className="w-full max-w-md">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Welcome to Onboarding</CardTitle>
                            <CardDescription>
                                Let's get you started with setting up your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    This is a simple starting page for the onboarding process.
                                </p>
                                <div className="rounded-lg border p-4">
                                    <h3 className="font-medium">Next Steps:</h3>
                                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                        <li>" Complete your profile</li>
                                        <li>" Set up your preferences</li>
                                        <li>" Verify your account</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppContent>
        </>
    );
}