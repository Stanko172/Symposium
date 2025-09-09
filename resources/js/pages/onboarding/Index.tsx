import OnboardingForm from '@/components/onboarding/OnboardingForm';
import OnboardingHero from '@/components/onboarding/OnboardingHero';
import OnboardingLayout from '@/layouts/onboarding/layout';
import type { OnboardingIndexProps } from '@/types';
import { UserTypeCategory } from '@/types';
import { Head, useForm } from '@inertiajs/react';

export default function OnboardingIndex({ countries, universities, userTypes }: OnboardingIndexProps) {
    const { data, setData, post, processing, errors } = useForm({
        userTypeId: null as number | null,
        countryId: null as number | null,
        universityId: null as number | null,
        programOfStudy: '',
        organization: '',
    });

    const handleSave = () => {
        post('/onboarding');
    };

    const getRequiredFields = () => {
        if (!data.userTypeId) return [];

        const userType = userTypes.find((type) => type.id === data.userTypeId);
        if (!userType) return [];

        switch (userType.category) {
            case UserTypeCategory.Student:
                return ['userTypeId', 'countryId', 'universityId', 'programOfStudy'];
            case UserTypeCategory.Business:
                return ['userTypeId', 'organization'];
            case UserTypeCategory.AcademicStaff:
                return ['userTypeId', 'countryId', 'universityId'];
            default:
                return ['userTypeId'];
        }
    };

    const getCompletedFields = () => {
        const requiredFields = getRequiredFields();
        return requiredFields.filter((field) => {
            const value = data[field as keyof typeof data];
            if (field === 'programOfStudy' || field === 'organization') {
                return value && typeof value === 'string' && value.trim() !== '';
            }
            return value !== null && value !== undefined;
        });
    };

    const getProgressPercentage = () => {
        const required = getRequiredFields();
        const completed = getCompletedFields();
        return required.length > 0 ? (completed.length / required.length) * 100 : 0;
    };

    const isFormComplete = (): boolean => {
        if (!data.userTypeId) return false;

        const userType = userTypes.find((type) => type.id === data.userTypeId);
        if (!userType) return false;

        if (userType.category === UserTypeCategory.Student) {
            return !!(data.countryId && data.universityId && data.programOfStudy && data.programOfStudy.trim());
        } else if (userType.category === UserTypeCategory.Business) {
            return !!(data.organization && data.organization.trim());
        } else {
            return !!(data.countryId && data.universityId);
        }
    };

    const formComplete = isFormComplete();

    return (
        <OnboardingLayout>
            <Head title="Onboarding" />
            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto grid max-w-5xl items-center justify-center gap-8 lg:grid-cols-2 lg:gap-16">
                    <OnboardingHero />
                    <OnboardingForm
                        countries={countries}
                        universities={universities}
                        userTypes={userTypes}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        completedFields={getCompletedFields().length}
                        totalFields={getRequiredFields().length}
                        progressPercentage={getProgressPercentage()}
                        isComplete={formComplete}
                        onSubmit={handleSave}
                    />
                </div>
            </div>
        </OnboardingLayout>
    );
}
