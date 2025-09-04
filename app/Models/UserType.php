<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\UserCategory;
use Database\Factories\UserTypeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read string $name
 * @property-read UserCategory $type
 */
final class UserType extends Model
{
    /** @use HasFactory<UserTypeFactory> */
    use HasFactory;
}
