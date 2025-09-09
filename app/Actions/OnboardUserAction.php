<?php

declare(strict_types=1);

namespace App\Actions;

use App\DataTransferObjects\StoreOnboardingData;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Throwable;

final readonly class OnboardUserAction
{
    public function handle(User $user, StoreOnboardingData $data): void
    {
        DB::transaction(static function () use ($user, $data) {
            $user->onboardingData()->create($data->toArray());
            $user->update(['is_onboarded' => true]);
        });
    }
}
