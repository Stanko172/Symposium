<?php

declare(strict_types=1);

use App\Http\Controllers\Onboarding\OnboardingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'notOnboarded'])
    ->prefix('onboarding')
    ->group(function () {
        Route::get('/', [OnboardingController::class, 'create'])
            ->name('onboarding.create');
        Route::post('/', [OnboardingController::class, 'store'])
            ->name('onboarding.store');
    });
