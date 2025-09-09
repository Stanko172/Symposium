import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Country, OnboardingFormData, University, UserType } from '@/types';
import { UserTypeCategory } from '@/types';
import type { InertiaFormProps } from '@inertiajs/react';
import AcademicFields from './AcademicFields';
import BusinessFields from './BusinessFields';
import OnboardingProgress from './OnboardingProgress';
import RoleSelector from './RoleSelector';
import SubmitButton from './SubmitButton';

interface OnboardingFormProps {
    countries: Country[];
    universities: University[];
    userTypes: UserType[];
    data: OnboardingFormData;
    setData: InertiaFormProps<OnboardingFormData>['setData'];
    errors: Record<string, string>;
    processing: boolean;
    completedFields: number;
    totalFields: number;
    progressPercentage: number;
    isComplete: boolean;
    onSubmit: () => void;
}

export default function OnboardingForm({
    countries,
    universities,
    userTypes,
    data,
    setData,
    errors,
    processing,
    completedFields,
    totalFields,
    progressPercentage,
    isComplete,
    onSubmit,
}: OnboardingFormProps) {
    const handleRoleChange = (value: string) => {
        setData({
            ...data,
            userTypeId: parseInt(value),
            countryId: null,
            universityId: null,
            programOfStudy: '',
            organization: '',
        });
    };

    const handleCountryChange = (countryId: string) => {
        setData({ ...data, countryId: parseInt(countryId), universityId: null });
    };

    const handleUniversityChange = (universityId: string) => {
        setData({ ...data, universityId: parseInt(universityId) });
    };

    const handleProgramOfStudyChange = (programOfStudy: string) => {
        setData({ ...data, programOfStudy });
    };

    const handleOrganizationChange = (organization: string) => {
        setData({ ...data, organization });
    };

    return (
        <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
                <Card className="border bg-card shadow-xl">
                    <CardHeader className="space-y-4 pb-6">
                        <div className="space-y-2">
                            <CardTitle className="text-2xl text-balance">You're almost there...</CardTitle>
                            <CardDescription className="text-base">We need a bit more info to get you started</CardDescription>
                        </div>

                        <OnboardingProgress completedFields={completedFields} totalFields={totalFields} progressPercentage={progressPercentage} />
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit();
                            }}
                        >
                            <div className="space-y-6">
                                <RoleSelector userTypes={userTypes} value={data.userTypeId?.toString() || ''} onValueChange={handleRoleChange} />

                                {(() => {
                                    const userType = userTypes.find((type) => type.id === data.userTypeId);
                                    return userType?.category === UserTypeCategory.Business;
                                })() ? (
                                    <BusinessFields
                                        organization={data.organization}
                                        onOrganizationChange={handleOrganizationChange}
                                        error={errors.organization}
                                    />
                                ) : (
                                    <AcademicFields
                                        countries={countries}
                                        universities={universities}
                                        countryId={data.countryId}
                                        universityId={data.universityId}
                                        programOfStudy={data.programOfStudy}
                                        roleCategory={userTypes.find((type) => type.id === data.userTypeId)?.category || null}
                                        onCountryChange={handleCountryChange}
                                        onUniversityChange={handleUniversityChange}
                                        onProgramOfStudyChange={handleProgramOfStudyChange}
                                        programOfStudyError={errors.programOfStudy}
                                    />
                                )}

                                <SubmitButton isComplete={isComplete} processing={processing} onClick={onSubmit} />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
