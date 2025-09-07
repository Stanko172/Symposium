<?php

namespace App\Http\Requests;

use App\DataTransferObjects\StoreOnboardingData;
use Illuminate\Foundation\Http\FormRequest;

class OnboardingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'role' => 'required|string',
            'country' => 'nullable|string|exists:countries,code',
            'university' => 'nullable|string|exists:universities,id',
            'programOfStudy' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'role.required' => 'Please select your role.',
            'country.exists' => 'The selected country is invalid.',
            'university.exists' => 'The selected university is invalid.',
            'programOfStudy.max' => 'The program of study must not exceed 255 characters.',
            'organization.max' => 'The organization name must not exceed 255 characters.',
        ];
    }

    /**
     * Get the DTO instance for the validated data.
     */
    public function toDto(): StoreOnboardingData
    {
        return StoreOnboardingData::from($this->validated());
    }
}
