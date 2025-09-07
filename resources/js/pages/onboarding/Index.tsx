import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CheckCircle2, GraduationCap, Globe, University as UniversityIcon, Building2, BookOpen } from "lucide-react";
import { Head, router, useForm } from '@inertiajs/react';
import OnboardingLayout from '@/layouts/onboarding/layout';
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
        console.log(data);
        post('/onboarding');
    };

    const getRequiredFields = () => {
        if (!data.role) return [];

        if (data.role === UserTypeCategory.Business) {
            return ["role", "organization"];
        } else if (data.role === UserTypeCategory.Student) {
            return ["role", "country", "university", "programOfStudy"];
        } else {
            return ["role", "country", "university"];
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

    const isFormComplete = () => {
        if (!data.role) return false;

        if (data.role === UserTypeCategory.Student) {
            return data.country && data.university && data.programOfStudy;
        } else if (data.role === UserTypeCategory.Business) {
            return data.organization;
        } else {
            return data.country && data.university;
        }
    };

    const formComplete = isFormComplete();

    return (
        <OnboardingLayout>
            <Head title="Onboarding" />
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-center max-w-5xl mx-auto">
                        {/* Left Side - Branding & Illustration */}
                        <div className="flex flex-col items-center lg:items-start justify-center space-y-8 text-center lg:text-left">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-medium text-primary">Almost Ready</span>
                                    </div>

                                    <div className="space-y-2">
                                        <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                                            Welcome to <span className="text-primary">Khadim AI</span>
                                        </h1>
                                        <p className="text-lg text-muted-foreground text-pretty">
                                            Your intelligent research companion for academic excellence
                                        </p>
                                    </div>
                                </div>

                                {/* Illustration */}
                                <div className="relative flex justify-center lg:justify-start">
                                    <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center">
                                        <div className="w-32 h-32 bg-primary/10 rounded-2xl flex items-center justify-center">
                                            <GraduationCap className="w-16 h-16 text-primary" />
                                        </div>
                                    </div>
                                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse" />
                                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/60 rounded-full animate-pulse delay-300" />
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="w-full max-w-md">
                                    <Card className="bg-card border shadow-xl">
                                        <CardHeader className="space-y-4 pb-6">
                                            <div className="space-y-2">
                                                <CardTitle className="text-2xl text-balance">You're almost there...</CardTitle>
                                                <CardDescription className="text-base">We need a bit more info to get you started</CardDescription>
                                            </div>

                                            {/* Progress Indicator */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-muted-foreground">Progress</span>
                                                    <span className="font-medium">
                                                        {getCompletedFields().length} of {getRequiredFields().length} completed
                                                    </span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                                                        style={{ width: `${getProgressPercentage()}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium flex items-center gap-2">
                                                    <GraduationCap className="w-4 h-4" />I am a
                                                </label>
                                                <Select
                                                    value={data.role}
                                                    onValueChange={(value) =>
                                                        setData({
                                                            ...data,
                                                            role: value,
                                                            country: "",
                                                            university: "",
                                                            programOfStudy: "",
                                                            organization: "",
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue placeholder="Select your role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {userTypes.map((userType) => (
                                                            <SelectItem key={userType.id} value={userType.category}>
                                                                {userType.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {data.role === UserTypeCategory.Business ? (
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium flex items-center gap-2">
                                                        <Building2 className="w-4 h-4" />
                                                        Your organization
                                                    </label>
                                                    <Input
                                                        placeholder="Enter your organization name"
                                                        value={data.organization}
                                                        onChange={(e) => setData({ ...data, organization: e.target.value })}
                                                        className="h-12"
                                                    />
                                                    {errors.organization && <p className="text-sm text-red-500">{errors.organization}</p>}
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium flex items-center gap-2">
                                                            <Globe className="w-4 h-4" />
                                                            My country
                                                        </label>
                                                        <Select
                                                            value={data.country}
                                                            onValueChange={(value) => {
                                                                setData({ ...data, country: value, university: "" });
                                                                router.post('/onboarding', {
                                                                    country: value
                                                                }, {
                                                                    preserveState: true,
                                                                    preserveScroll: true,
                                                                });
                                                            }}
                                                        >
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
                                                            value={data.university}
                                                            onValueChange={(value) => setData({ ...data, university: value })}
                                                            disabled={!data.country}
                                                        >
                                                            <SelectTrigger className="h-12">
                                                                <SelectValue
                                                                    placeholder={!data.country ? "Select country first" : "Select your university"}
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

                                                    {data.role === UserTypeCategory.Student && (
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium flex items-center gap-2">
                                                                <BookOpen className="w-4 h-4" />
                                                                Program of Study
                                                            </label>
                                                            <Input
                                                                placeholder="e.g., Computer Science, Biology, etc."
                                                                value={data.programOfStudy}
                                                                onChange={(e) => setData({ ...data, programOfStudy: e.target.value })}
                                                                className="h-12"
                                                            />
                                                            {errors.programOfStudy && <p className="text-sm text-red-500">{errors.programOfStudy}</p>}
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            <Button onClick={handleSave} className="w-full h-12 text-base font-medium" disabled={!formComplete || processing}>
                                                {processing ? (
                                                    "Submitting..."
                                                ) : formComplete ? (
                                                    <>
                                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                                        Complete Setup
                                                    </>
                                                ) : (
                                                    "Complete all fields"
                                                )}
                                            </Button>

                                            {formComplete && (
                                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    Ready to get started!
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
}
