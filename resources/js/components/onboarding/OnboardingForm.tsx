import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OnboardingProgress from "./OnboardingProgress";
import RoleSelector from "./RoleSelector";
import BusinessFields from "./BusinessFields";
import AcademicFields from "./AcademicFields";
import SubmitButton from "./SubmitButton";
import type { Country, University, UserType } from '@/types';
import { UserTypeCategory } from '@/types';

interface OnboardingFormProps {
    countries: Country[];
    universities: University[];
    userTypes: UserType[];
    data: {
        role: string;
        country: string;
        university: string;
        programOfStudy: string;
        organization: string;
    };
    setData: (data: any) => void;
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
    onSubmit
}: OnboardingFormProps) {
    const handleRoleChange = (value: string) => {
        setData({
            ...data,
            role: value,
            country: "",
            university: "",
            programOfStudy: "",
            organization: "",
        });
    };

    const handleCountryChange = (country: string) => {
        setData({ ...data, country: country, university: "" });
    };

    const handleUniversityChange = (university: string) => {
        setData({ ...data, university });
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
                <Card className="bg-card border shadow-xl">
                    <CardHeader className="space-y-4 pb-6">
                        <div className="space-y-2">
                            <CardTitle className="text-2xl text-balance">You're almost there...</CardTitle>
                            <CardDescription className="text-base">We need a bit more info to get you started</CardDescription>
                        </div>

                        <OnboardingProgress 
                            completedFields={completedFields}
                            totalFields={totalFields}
                            progressPercentage={progressPercentage}
                        />
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <RoleSelector 
                            userTypes={userTypes}
                            value={data.role}
                            onValueChange={handleRoleChange}
                        />

                        {data.role === UserTypeCategory.Business ? (
                            <BusinessFields 
                                organization={data.organization}
                                onOrganizationChange={handleOrganizationChange}
                                error={errors.organization}
                            />
                        ) : (
                            <AcademicFields 
                                countries={countries}
                                universities={universities}
                                country={data.country}
                                university={data.university}
                                programOfStudy={data.programOfStudy}
                                role={data.role}
                                onCountryChange={handleCountryChange}
                                onUniversityChange={handleUniversityChange}
                                onProgramOfStudyChange={handleProgramOfStudyChange}
                                programOfStudyError={errors.programOfStudy}
                            />
                        )}

                        <SubmitButton 
                            isComplete={isComplete}
                            processing={processing}
                            onClick={onSubmit}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}