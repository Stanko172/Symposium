<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Country;
use App\Models\University;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<University>
 */
final class UniversityFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'domains' => [$this->faker->domainName()],
            'web_pages' => [$this->faker->url()],
            'country_id' => Country::factory(),
        ];
    }
}
