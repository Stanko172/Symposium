<?php

declare(strict_types=1);

namespace App\ViewModels;

use App\DataTransferObjects\CountryData;
use App\DataTransferObjects\UniversityData;
use App\DataTransferObjects\UserTypeData;
use App\Models\Country;
use App\Models\UserType;
use Illuminate\Support\Collection;

final class OnboardingViewModel extends ViewModel
{
    public function __construct(
        public ?Country $country,
    ) {}

    /**
     * @return Collection<int, CountryData>
     */
    public function countries(): Collection
    {
        return CountryData::collect(Country::query()->get());
    }

    /**
     * @return Collection<int, UniversityData>
     */
    public function universities(): Collection
    {
        return $this->country instanceof Country
            ? UniversityData::collect($this->country->universities)
            : collect();
    }

    public function userTypes(): Collection
    {
        return UserTypeData::collect(UserType::query()->get());
    }
}
