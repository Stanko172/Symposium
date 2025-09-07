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
    ->match(['GET', 'POST'], '/onboarding', [OnboardingController::class, 'index'])
    ->name('onboarding.index');

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
