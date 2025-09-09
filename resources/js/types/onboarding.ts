export interface Country {
    id: number;
    name: string;
    code: string;
}

export interface University {
    id: number;
    name: string;
    domains: string[];
    web_pages: string[];
}

export enum UserTypeCategory {
    AcademicStaff = 'academic_staff',
    Student = 'student',
    Business = 'business',
}

export interface UserType {
    id: number;
    name: string;
    category: UserTypeCategory;
}

export interface OnboardingFormData {
    userTypeId: number | null;
    countryId: number | null;
    universityId: number | null;
    programOfStudy: string;
    organization: string;
}

export interface OnboardingIndexProps {
    countries: Country[];
    universities: University[];
    userTypes: UserType[];
}
