import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";
import type { UserType } from '@/types';

interface RoleSelectorProps {
    userTypes: UserType[];
    value: string;
    onValueChange: (value: string) => void;
}

export default function RoleSelector({ userTypes, value, onValueChange }: RoleSelectorProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />I am a
            </label>
            <Select value={value} onValueChange={onValueChange}>
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
    );
}