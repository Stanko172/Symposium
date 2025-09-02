<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnboarded
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()->isOnboarded()) {
            return to_route('onboarding.index');
        }

        return $next($request);
    }
}
