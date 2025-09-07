<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Spatie\LaravelData\Data;

final class UniversityData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public array $domains,
        public array $webPages,
    ) {}
}
