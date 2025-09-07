<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Enums\UserTypeCategory;
use Spatie\LaravelData\Data;

final class UserTypeData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public UserTypeCategory $category,
    ) {}
}
