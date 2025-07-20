import React from 'react';

const TextInputField = ({
    id,
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    touched,
    required = false
}) => {
    const isInvalid = touched && required && !value.trim();

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                required={required}
                type="text"
                id={id}
                className={`w-full p-3 border rounded-md transition duration-150 ease-in-out bg-gray-50 ${isInvalid
                    ? 'ring-1 ring-red-600/10 ring-inset bg-red-50 placeholder-red-700'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {isInvalid && <p className="text-xs text-red-700">Required</p>}
        </div>
    );
};

export default TextInputField;
