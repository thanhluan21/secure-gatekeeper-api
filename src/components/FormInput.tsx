
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type: initialType,
  placeholder,
  value,
  onChange,
  required = false,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = initialType === 'password';
  const type = isPassword ? (showPassword ? 'text' : 'password') : initialType;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full input-transition ${error ? 'border-destructive ring-destructive' : 'focus:border-primary'}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
