<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\UserCategory;
use App\Models\UserType;
use Illuminate\Database\Seeder;

final class UserTypeSeeder extends Seeder
{
    public function run(): void
    {
        UserType::query()->insert([
            ['name' => 'Researcher / Professor / PhD candidate', 'category' => UserCategory::AcademicStaff],
            ['name' => 'Student (bachelor / master)', 'category' => UserCategory::Student],
            ['name' => 'Business or other', 'category' => UserCategory::Business],
        ]);
    }
}
