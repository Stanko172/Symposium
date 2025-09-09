<?php

declare(strict_types=1);

namespace App\Actions\Onboarding;

use App\DataTransferObjects\Onboarding\StoreOnboardingData;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final readonly class OnboardUserAction
{
    public function handle(User $user, StoreOnboardingData $data): void
    {
        DB::transaction(static function () use ($user, $data): void {
            $user->onboardingData()->create($data->toArray());
            $user->update(['is_onboarded' => true]);
        });
    }
}
