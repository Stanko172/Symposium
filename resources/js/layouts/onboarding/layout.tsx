import { AppShell } from '@/components/app-shell';
import { type PropsWithChildren } from 'react';

export default function OnboardingLayout({ children }: PropsWithChildren) {
    return (
        <AppShell variant="header">
            <main className="flex h-full min-h-screen w-full flex-1 items-center justify-center">
                {children}
            </main>
        </AppShell>
    );
}
