<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Spatie\LaravelData\Data;

final class CreateOnboardingData extends Data
{
    public function __construct(
        public ?int $countryId,
    ) {}
}
