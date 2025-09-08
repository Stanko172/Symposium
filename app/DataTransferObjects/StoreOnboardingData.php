<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapOutputName(SnakeCaseMapper::class)]
final class StoreOnboardingData extends Data
{
    public function __construct(
        public int $userTypeId,
        public ?int $countryId = null,
        public ?int $universityId = null,
        public ?string $programOfStudy = null,
        public ?string $organization = null,
    ) {}
}
