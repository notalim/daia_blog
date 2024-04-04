import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@src/@/components/ui/avatar";

function AvatarDemo({ firstName, lastName, size }) {
    const sizeClass =
        {
            small: "w-8 h-8", // adjust the sizes as needed
            medium: "w-12 h-12",
            large: "w-16 h-16",
        }[size] || "w-10 h-10"; // default size if not specified

    return (
        <Avatar
            className={`inline-block ${sizeClass} rounded-full overflow-hidden`}
        >
            <AvatarFallback className="flex items-center justify-center text-subtle-purple">
                {firstName?.charAt(0) || ""}
                {lastName?.charAt(0) || ""}
            </AvatarFallback>
        </Avatar>
    );
}

export default AvatarDemo;
