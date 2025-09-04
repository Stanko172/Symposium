<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;
use JsonException;

final class CountrySeeder extends Seeder
{
    /**
     * @throws JsonException
     */
    public function run(): void
    {
        $jsonPath = database_path('seeders/data/world_universities_and_domains.json');
        $countries = json_decode(file_get_contents($jsonPath), true, 512, JSON_THROW_ON_ERROR);

        collect($countries)
            ->unique('alpha_two_code')
            ->each(fn (array $item) => Country::query()->firstOrCreate(
                ['name' => $item['country']],
                ['code' => $item['alpha_two_code']],
            ));
    }
}
