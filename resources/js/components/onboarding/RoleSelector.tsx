import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { UserType } from '@/types';
import { GraduationCap } from 'lucide-react';

interface RoleSelectorProps {
    userTypes: UserType[];
    value: string;
    onValueChange: (value: string) => void;
}

export default function RoleSelector({ userTypes, value, onValueChange }: RoleSelectorProps) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
                <GraduationCap className="h-4 w-4" />I am a
            </label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                    {userTypes.map((userType) => (
                        <SelectItem key={userType.id} value={userType.id.toString()}>
                            {userType.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
