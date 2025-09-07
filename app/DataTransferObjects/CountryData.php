<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use Spatie\LaravelData\Data;

final class CountryData extends Data
{
    public function __construct(
        public string $name,
        public string $code,
    ) {}
}
