<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\UserCategory;
use App\Models\UserType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserType>
 */
final class UserTypeFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'category' => $this->faker->unique()->randomElement(UserCategory::cases())->value,
        ];
    }
}
