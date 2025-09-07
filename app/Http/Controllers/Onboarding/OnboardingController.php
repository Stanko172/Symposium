<?php

declare(strict_types=1);

namespace App\Http\Controllers\Onboarding;

use App\DataTransferObjects\StoreOnboardingData;
use App\Http\Controllers\Controller;
use App\Http\Requests\OnboardingRequest;
use App\Models\Country;
use App\ViewModels\OnboardingViewModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class OnboardingController extends Controller
{
    public function index(Request $request): Response
    {
        $country = optional($request->input('country'), static fn($country) => Country::query()->where('code', $country)->first());

        return Inertia::render('onboarding/Index', new OnboardingViewModel($country));
    }

    public function store(StoreOnboardingData $request): RedirectResponse
    {
        // TODO: Store onboarding data
        ray($request->toArray())->blue();

        return redirect()->route('dashboard')->with('success', 'Onboarding completed successfully!');
    }
}
