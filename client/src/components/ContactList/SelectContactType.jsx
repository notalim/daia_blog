import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@src/@/components/ui/select";

const SelectContactType = ({ value, onChange }) => {
    return (
        <Select value={value} onValueChange={onChange} className="w-full">
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Relationship" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Family">Family</SelectItem>
                <SelectItem value="Friends">Friends</SelectItem>
                <SelectItem value="Doctor">Doctor</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default SelectContactType;
