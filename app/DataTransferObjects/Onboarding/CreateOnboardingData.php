<?php

declare(strict_types=1);

namespace App\DataTransferObjects\Onboarding;

use Spatie\LaravelData\Data;

final class CreateOnboardingData extends Data
{
    public function __construct(
        public ?int $countryId,
    ) {}

    /**
     * @return array<string, array<int, string>>
     */
    public static function rules(): array
    {
        return [
            'countryId' => ['nullable', 'exists:countries,id'],
        ];
    }
}
