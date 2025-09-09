<?php

declare(strict_types=1);

namespace App\Http\Controllers\Onboarding;

use App\Actions\Onboarding\OnboardUserAction;
use App\DataTransferObjects\Onboarding\CreateOnboardingData;
use App\DataTransferObjects\Onboarding\StoreOnboardingData;
use App\Http\Controllers\Controller;
use App\Models\Country;
use App\ViewModels\Onboarding\OnboardingViewModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

final class OnboardingController extends Controller
{
    public function create(CreateOnboardingData $request): Response
    {
        $country = $request->countryId !== null && $request->countryId !== 0
            ? Country::query()->find($request->countryId)
            : null;

        return Inertia::render('onboarding/Index', new OnboardingViewModel($country));
    }

    public function store(StoreOnboardingData $onboardingData, OnboardUserAction $action): RedirectResponse
    {
        $user = Auth::user();
        if (! $user) {
            return redirect()->route('login');
        }

        $action->handle($user, $onboardingData);

        return redirect()->route('dashboard')->with('success', 'Onboarding completed successfully!');
    }
}
