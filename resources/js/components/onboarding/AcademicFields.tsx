import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Globe, University as UniversityIcon, BookOpen } from "lucide-react";
import { router } from '@inertiajs/react';
import type { Country, University } from '@/types';
import { UserTypeCategory } from '@/types';

interface AcademicFieldsProps {
    countries: Country[];
    universities: University[];
    country: string;
    university: string;
    programOfStudy: string;
    role: string;
    onCountryChange: (country: string) => void;
    onUniversityChange: (university: string) => void;
    onProgramOfStudyChange: (program: string) => void;
    programOfStudyError?: string;
}

export default function AcademicFields({
    countries,
    universities,
    country,
    university,
    programOfStudy,
    role,
    onCountryChange,
    onUniversityChange,
    onProgramOfStudyChange,
    programOfStudyError
}: AcademicFieldsProps) {
    const handleCountryChange = (value: string) => {
        onCountryChange(value);
        router.post('/onboarding', {
            country: value
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    My country
                </label>
                <Select value={country} onValueChange={handleCountryChange}>
                    <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                        {countries.map((country) => (
                            <SelectItem key={country.id} value={country.code}>
                                {country.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                    <UniversityIcon className="w-4 h-4" />
                    University
                </label>
                <Select
                    value={university}
                    onValueChange={onUniversityChange}
                    disabled={!country}
                >
                    <SelectTrigger className="h-12">
                        <SelectValue
                            placeholder={!country ? "Select country first" : "Select your university"}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {universities.map((university) => (
                            <SelectItem key={university.id} value={university.id.toString()}>
                                {university.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {role === UserTypeCategory.Student && (
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Program of Study
                    </label>
                    <Input
                        placeholder="e.g., Computer Science, Biology, etc."
                        value={programOfStudy}
                        onChange={(e) => onProgramOfStudyChange(e.target.value)}
                        className="h-12"
                    />
                    {programOfStudyError && <p className="text-sm text-red-500">{programOfStudyError}</p>}
                </div>
            )}
        </>
    );
}