<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Spatie\LaravelData\Data;

final class UniversityData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        /** @var array<int, string> */
        public array $domains,
        /** @var array<int, string> */
        public array $webPages,
    ) {}
}
