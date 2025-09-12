<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Country;
use App\Models\University;
use App\Models\User;
use App\Models\UserType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OnboardingData>
 */
final class OnboardingDataFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'user_type_id' => UserType::factory(),
            'country_id' => Country::factory(),
            'university_id' => University::factory(),
            'program_of_study' => $this->faker->words(3, true),
            'organization' => $this->faker->company(),
        ];
    }
}
