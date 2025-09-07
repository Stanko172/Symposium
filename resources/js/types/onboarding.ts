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
    Business = 'business'
}

export interface UserType {
    id: number;
    name: string;
    category: UserTypeCategory;
}
