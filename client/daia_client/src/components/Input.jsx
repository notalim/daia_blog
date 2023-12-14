function Input({ placeholder, onChange, value, disabled }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={disabled}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    );
}

export default Input;