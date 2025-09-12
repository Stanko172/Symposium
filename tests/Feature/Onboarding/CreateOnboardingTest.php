<?php

declare(strict_types=1);

use App\Models\Country;
use App\Models\University;
use App\Models\User;
use App\Models\UserType;

test('onboarding form can be accessed', function (): void {
    $user = User::factory()
        ->verified()
        ->notOnboarded()
        ->create();

    $response = $this->actingAs($user)->get(route('onboarding.create'));

    $response->assertStatus(200);
});

test('onboarding form cannot be accessed by onboarded users', function (): void {
    $user = User::factory()
        ->verified()
        ->onboarded()
        ->create();

    $response = $this->actingAs($user)->get(route('onboarding.create'));

    $response->assertRedirect(route('dashboard'));
});

test('list of universities can be retrieved', function (): void {
    $user = User::factory()
        ->verified()
        ->notOnboarded()
        ->create();

    $country = Country::factory()->create();
    University::factory(5)
        ->for($country)
        ->create();

    $response = $this->actingAs($user)->get(route('onboarding.create', [
        'countryId' => $country->id,
    ]));

    $response->assertInertia(fn ($page) => $page->has('universities'));
});

test('list of countries can be retrieved', function (): void {
    $user = User::factory()
        ->verified()
        ->notOnboarded()
        ->create();

    Country::factory(5)->create();

    $response = $this->actingAs($user)->get(route('onboarding.create'));

    $response->assertInertia(fn ($page) => $page->has('countries', 5));
});

test('list of user types can be retrieved', function (): void {
    $user = User::factory()
        ->verified()
        ->notOnboarded()
        ->create();

    UserType::factory(3)->create();

    $response = $this->actingAs($user)->get(route('onboarding.create'));

    $response->assertInertia(fn ($page) => $page->has('userTypes', 3));
});
