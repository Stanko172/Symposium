import { Head, useForm } from '@inertiajs/react';
import OnboardingLayout from '@/layouts/onboarding/layout';
import OnboardingHero from '@/components/onboarding/OnboardingHero';
import OnboardingForm from '@/components/onboarding/OnboardingForm';
import type { Country, University, UserType} from '@/types';
import { UserTypeCategory } from '@/types';

interface OnboardingIndexProps {
    countries: Country[];
    universities: University[];
    userTypes: UserType[];
}

export default function OnboardingIndex({ countries, universities, userTypes }: OnboardingIndexProps) {
    const { data, setData, post, processing, errors } = useForm({
        role: "",
        country: "",
        university: "",
        programOfStudy: "",
        organization: "",
    });

    const handleSave = () => {
        post('/onboarding/store');
    };

    const getRequiredFields = () => {
        if (!data.role) return [];

        switch (data.role) {
            case UserTypeCategory.Student:
                return ["role", "country", "university", "programOfStudy"];
            case UserTypeCategory.Business:
                return ["role", "organization"];
            case UserTypeCategory.AcademicStaff:
                return ["role", "country", "university"];
            default:
                throw new Error("Invalid role");
        }
    };

    const getCompletedFields = () => {
        const requiredFields = getRequiredFields();
        return requiredFields.filter((field) => {
            const value = data[field as keyof typeof data];
            return value && value.trim() !== "";
        });
    };

    const getProgressPercentage = () => {
        const required = getRequiredFields();
        const completed = getCompletedFields();
        return required.length > 0 ? (completed.length / required.length) * 100 : 0;
    };

    const isFormComplete = (): boolean => {
        if (!data.role) return false;

        if (data.role === UserTypeCategory.Student) {
            return !!(data.country && data.university && data.programOfStudy);
        } else if (data.role === UserTypeCategory.Business) {
            return !!data.organization;
        } else {
            return !!(data.country && data.university);
        }
    };

    const formComplete = isFormComplete();

    return (
        <OnboardingLayout>
            <Head title="Onboarding" />
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-center max-w-5xl mx-auto">
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
