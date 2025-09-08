import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";

interface BusinessFieldsProps {
    organization: string;
    onOrganizationChange: (value: string) => void;
    error?: string;
}

export default function BusinessFields({ 
    organization, 
    onOrganizationChange, 
    error 
}: BusinessFieldsProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Your organization
            </label>
            <Input
                placeholder="Enter your organization name"
                value={organization}
                onChange={(e) => onOrganizationChange(e.target.value)}
                className="h-12"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}