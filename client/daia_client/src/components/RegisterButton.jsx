function RegisterButton({ children, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="bg-purple-600 text-white font-bold py-3 px-4 rounded-lg w-full hover:bg-purple-700 focus:outline-none focus:shadow-outline shadow-lg"
        >
            {children}
        </button>
    );
}

export default RegisterButton;
