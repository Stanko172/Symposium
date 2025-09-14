import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-foreground text-sidebar-primary-foreground">
                <AppLogoIcon className="size-8 fill-current text-black bg-white dark:text-white dark:bg-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Symposium AI</span>
            </div>
        </>
    );
}
