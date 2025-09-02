import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CheckCircle2, GraduationCap, Globe, University, Building2, BookOpen } from "lucide-react";
import { Head } from '@inertiajs/react';
import OnboardingLayout from '@/layouts/onboarding/layout';

export default function OnboardingIndex() {
    const [formData, setFormData] = useState({
        role: "",
        country: "",
        university: "",
        programOfStudy: "",
        organization: "",
    });

    const handleSave = () => {
        console.log("Form data:", formData);
        // Handle form submission here
    };

    const getRequiredFields = () => {
        if (!formData.role) return [];

        if (formData.role === "business") {
            return ["role", "organization"];
        } else if (formData.role === "student") {
            return ["role", "country", "university", "programOfStudy"];
        } else {
            return ["role", "country", "university"];
        }
    };

    const getCompletedFields = () => {
        const requiredFields = getRequiredFields();
        return requiredFields.filter((field) => {
            const value = formData[field as keyof typeof formData];
            return value && value.trim() !== "";
        });
    };

    const getProgressPercentage = () => {
        const required = getRequiredFields();
        const completed = getCompletedFields();
        return required.length > 0 ? (completed.length / required.length) * 100 : 0;
    };

    const isFormComplete = () => {
        if (!formData.role) return false;

        if (formData.role === "student") {
            return formData.country && formData.university && formData.programOfStudy;
        } else if (formData.role === "business") {
            return formData.organization;
        } else {
            return formData.country && formData.university;
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
                                                    value={formData.role}
                                                    onValueChange={(value) =>
                                                        setFormData({
                                                            ...formData,
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
                                                        <SelectItem value="researcher">Researcher / Professor / PhD candidate</SelectItem>
                                                        <SelectItem value="student">Student (bachelor / master)</SelectItem>
                                                        <SelectItem value="business">Business or other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {formData.role === "business" ? (
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium flex items-center gap-2">
                                                        <Building2 className="w-4 h-4" />
                                                        Your organization
                                                    </label>
                                                    <Input
                                                        placeholder="Enter your organization name"
                                                        value={formData.organization}
                                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                                        className="h-12"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium flex items-center gap-2">
                                                            <Globe className="w-4 h-4" />
                                                            My country
                                                        </label>
                                                        <Select
                                                            value={formData.country}
                                                            onValueChange={(value) => setFormData({ ...formData, country: value, university: "" })}
                                                        >
                                                            <SelectTrigger className="h-12">
                                                                <SelectValue
                                                                    placeholder={!formData.country ? "Select country first" : "Select your country"}
                                                                />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="us">United States</SelectItem>
                                                                <SelectItem value="uk">United Kingdom</SelectItem>
                                                                <SelectItem value="ca">Canada</SelectItem>
                                                                <SelectItem value="au">Australia</SelectItem>
                                                                <SelectItem value="de">Germany</SelectItem>
                                                                <SelectItem value="fr">France</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium flex items-center gap-2">
                                                            <University className="w-4 h-4" />
                                                            University
                                                        </label>
                                                        <Select
                                                            value={formData.university}
                                                            onValueChange={(value) => setFormData({ ...formData, university: value })}
                                                            disabled={!formData.country}
                                                        >
                                                            <SelectTrigger className="h-12">
                                                                <SelectValue
                                                                    placeholder={!formData.country ? "Select country first" : "Select your university"}
                                                                />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="harvard">Harvard University</SelectItem>
                                                                <SelectItem value="mit">MIT</SelectItem>
                                                                <SelectItem value="stanford">Stanford University</SelectItem>
                                                                <SelectItem value="oxford">Oxford University</SelectItem>
                                                                <SelectItem value="cambridge">Cambridge University</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    {formData.role === "student" && (
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium flex items-center gap-2">
                                                                <BookOpen className="w-4 h-4" />
                                                                Program of Study
                                                            </label>
                                                            <Input
                                                                placeholder="e.g., Computer Science, Biology, etc."
                                                                value={formData.programOfStudy}
                                                                onChange={(e) => setFormData({ ...formData, programOfStudy: e.target.value })}
                                                                className="h-12"
                                                            />
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            <Button onClick={handleSave} className="w-full h-12 text-base font-medium" disabled={!formComplete}>
                                                {formComplete ? (
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
