<?php

declare(strict_types=1);

namespace App\Http\Controllers\Onboarding;

use App\Actions\OnboardUserAction;
use App\DataTransferObjects\CreateOnboardingData;
use App\DataTransferObjects\StoreOnboardingData;
use App\Http\Controllers\Controller;
use App\Models\Country;
use App\ViewModels\OnboardingViewModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

final class OnboardingController extends Controller
{
    public function create(CreateOnboardingData $request): Response
    {
        $country = optional($request->countryId, static fn ($countryId) => Country::query()->find($countryId));

        return Inertia::render('onboarding/Index', new OnboardingViewModel($country));
    }

    public function store(StoreOnboardingData $onboardingData, OnboardUserAction $action): RedirectResponse
    {
        $action->handle(Auth::user(), $onboardingData);

        return redirect()->route('dashboard')->with('success', 'Onboarding completed successfully!');
    }
}
