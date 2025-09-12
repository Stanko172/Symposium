<?php

declare(strict_types=1);

use App\Models\University;
use App\Models\User;
use App\Models\UserType;

test('userTypeId is required for storing the onboarding data', function (): void {
    $user = User::factory()
        ->verified()
        ->notOnboarded()
        ->create();

    $response = $this->actingAs($user)->post(route('onboarding.store'));

    $response->assertSessionHasErrors('userTypeId');
});

test('user can store onboarding data', function (): void {
    $user = User::factory()
        ->verified()
        ->notOnboarded()
        ->create();

    $userType = UserType::factory()->create();
    $university = University::factory()->create();

    $response = $this->actingAs($user)->post(route('onboarding.store'), [
        'userTypeId' => $userType->id,
        'universityId' => $university->id,
        'programOfStudy' => 'Test Program of Study',
        'organization' => 'Test Organization',
    ]);

    $response->assertRedirect(route('dashboard'));
});
