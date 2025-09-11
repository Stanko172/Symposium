<?php

use App\Models\User;

test('onboarding form can be accessed', function () {
    $user = User::factory()
        ->verified()
        ->notOnboarded()
        ->create();

    $response = $this->actingAs($user)->get(route('onboarding.create'));

    $response->assertStatus(200);
});

test('onboarding form cannot be accessed by onboarded users', function () {
   $user = User::factory()
       ->verified()
       ->onboarded()
       ->create();

   $response = $this->actingAs($user)->get(route('onboarding.create'));

   $response->assertRedirect(route('dashboard'));
});
