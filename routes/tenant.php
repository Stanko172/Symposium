<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

Route::middleware('web')
    ->middleware(InitializeTenancyByDomain::class)
    ->middleware(PreventAccessFromCentralDomains::class)
    ->group(function () {
        // ...
    });
