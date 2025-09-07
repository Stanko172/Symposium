<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Spatie\LaravelData\Data;

final class StoreOnboardingData extends Data
{
    public function __construct(
        public string $role,
        public ?string $country = null,
        public ?string $university = null,
        public ?string $programOfStudy = null,
        public ?string $organization = null,
    ) {}
}
