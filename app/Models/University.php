<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\CarbonImmutable;
use Database\Factories\UniversityFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read array<int, string>|null $domains
 * @property-read array<int, string>|null $web_pages
 * @property-read int $country_id
 * @property-read Country $country
 * @property-read CarbonImmutable $created_at
 * @property-read CarbonImmutable|null $updated_at
 */
final class University extends Model
{
    /** @use HasFactory<UniversityFactory> */
    use HasFactory;

    protected $casts = [
        'domains' => 'array',
        'web_pages' => 'array',
    ];

    /**
     * @return BelongsTo<Country, $this>
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }
}
