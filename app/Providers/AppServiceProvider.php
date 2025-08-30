<?php

declare(strict_types=1);

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Sleep;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict();
        Model::unguard();

        Date::use(CarbonImmutable::class);

        Vite::useAggressivePrefetching();

        URL::forceHttps(
            app()->isProduction()
        );

        DB::prohibitDestructiveCommands(
            app()->isProduction()
        );

        Http::preventStrayRequests(
            app()->runningUnitTests()
        );

        Sleep::fake(
            app()->runningUnitTests()
        );
    }
}
