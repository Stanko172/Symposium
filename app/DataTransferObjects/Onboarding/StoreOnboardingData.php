<?php

declare(strict_types=1);

namespace App\DataTransferObjects\Onboarding;

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

    public function rules(): array
    {
        return [
            'userTypeId' => ['required', 'exists:user_types,id'],
            'countryId' => ['nullable', 'exists:countries,id'],
            'universityId' => ['nullable', 'exists:universities,id'],
            'programOfStudy' => ['nullable', 'string'],
            'organization' => ['nullable', 'string'],
        ];
    }
}
