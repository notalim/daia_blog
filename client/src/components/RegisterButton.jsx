import { Button } from "@src/@/components/ui/button";
function RegisterButton({ children, onClick, disabled }) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className="bg-full-purple text-white font-medium text-base py-2 rounded-md w-full hover:bg-hover-full-purple transition duration-300 ease-in-out"
            variant="daia"
        >
            {children}
        </Button>
    );
}

export default RegisterButton;
