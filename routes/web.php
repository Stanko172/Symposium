<?php

declare(strict_types=1);

use App\Http\Controllers\Onboarding\OnboardingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', static function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware('auth')
    ->middleware('verified')
    ->prefix('onboarding')
    ->group(function () {
        Route::match(['GET', 'POST'], '/', [OnboardingController::class, 'create'])
            ->name('onboarding');
        Route::post( '/store', [OnboardingController::class, 'store'])
            ->name('onboarding.store');
    });

Route::middleware('auth')
    ->middleware('verified')
    ->match(['GET', 'POST'], '/onboarding', [OnboardingController::class, 'create'])
    ->name('onboarding.create');

Route::middleware('auth')
    ->middleware('verified')
    ->middleware('onboarded')
    ->group(function () {
        Route::get('dashboard', static function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
    });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
