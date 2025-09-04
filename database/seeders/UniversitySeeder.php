<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Country;
use App\Models\University;
use Illuminate\Database\Seeder;
use JsonException;

final class UniversitySeeder extends Seeder
{
    /**
     * @throws JsonException
     */
    public function run(): void
    {
        $jsonPath = database_path('seeders/data/world_universities_and_domains.json');
        $universities = json_decode(file_get_contents($jsonPath), true, 512, JSON_THROW_ON_ERROR);

        collect($universities)
            ->each(function (array $item) {
                $country = Country::query()
                    ->where('code', $item['alpha_two_code'])
                    ->firstOrFail();

                University::query()->firstOrCreate(
                    ['name' => $item['name']],
                    [
                        'country_id' => $country->id,
                        'domains' => $item['domains'] ?? null,
                        'web_pages' => $item['web_pages'] ?? null,
                    ]
                );
            });
    }
}
