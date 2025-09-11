<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', static function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'onboarded'])
    ->group(function () {
        Route::get('dashboard', static function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
    });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/onboarding.php';
