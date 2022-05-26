import React, { PropsWithChildren, useState } from 'react';
import { InputFieldProps } from './interfaces';

function InputField({ label, ...props }: PropsWithChildren<InputFieldProps>) {
    return (
        <div className="relative mb-6">
            {label ? (
                <label className="text-sm block text-gray-700" htmlFor={props.id}>
                    {label}
                </label>
            ) : null}
            <input
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                {...props}
            />
        </div>
    );
}
export default InputField;
