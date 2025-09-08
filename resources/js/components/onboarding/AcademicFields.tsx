import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Globe, University as UniversityIcon, BookOpen } from "lucide-react";
import { router } from '@inertiajs/react';
import type { Country, University } from '@/types';
import { UserTypeCategory } from '@/types';

interface AcademicFieldsProps {
    countries: Country[];
    universities: University[];
    countryId: number | null;
    universityId: number | null;
    programOfStudy: string;
    roleCategory: string | null;
    onCountryChange: (countryId: string) => void;
    onUniversityChange: (universityId: string) => void;
    onProgramOfStudyChange: (program: string) => void;
    programOfStudyError?: string;
}

export default function AcademicFields({
    countries,
    universities,
    countryId,
    universityId,
    programOfStudy,
    roleCategory,
    onCountryChange,
    onUniversityChange,
    onProgramOfStudyChange,
    programOfStudyError
}: AcademicFieldsProps) {
    const handleCountryChange = (value: string) => {
        onCountryChange(value);
        router.get('/onboarding', {
            countryId: parseInt(value)
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    console.log('countries 123: ', countries)
    console.log('universities 123: ', universities)

    return (
        <>
            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    My country
                </label>
                <Select value={countryId?.toString() || ""} onValueChange={handleCountryChange}>
                    <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                        {countries.filter(country => country.id != null).map((country) => (
                            <SelectItem key={`country-${country.id}`} value={country.id.toString()}>
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
                    value={universityId?.toString() || ""}
                    onValueChange={onUniversityChange}
                    disabled={!countryId}
                >
                    <SelectTrigger className="h-12">
                        <SelectValue
                            placeholder={!countryId ? "Select country first" : "Select your university"}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {universities.filter(university => university.id != null).map((university) => (
                            <SelectItem key={`university-${university.id}`} value={university.id.toString()}>
                                {university.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {roleCategory === UserTypeCategory.Student && (
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
