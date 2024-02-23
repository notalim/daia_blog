function RegisterButton({ children, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            // add gradient bg to 5A399A
            className="bg-full-purple text-white font-medium text-base py-2 rounded-md w-full hover:bg-hover-full-purple transition duration-300 ease-in-out"
        >
            {children}
        </button>
    );
}

export default RegisterButton;
