interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  disabled?: boolean;
}

export default function FormField({ label, id, type = "text", value, onChange, error, placeholder, required, hint, disabled }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-label2 text-primary-13">
        {label}{required && <span className="text-error-8 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2.5 rounded-md border text-body2 text-primary-13 placeholder:text-primary-6
          focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? "border-error-8 bg-error-3 focus:border-error-8 focus:ring-error-8/20"
            : "border-primary-6 bg-white focus:border-primary-9 focus:ring-primary-9/20"
          }`}
      />
      {hint && !error && <p className="text-body3 text-primary-10">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-body3 text-error-11">
          <span className="material-symbols-outlined text-[13px]">error</span>
          {error}
        </p>
      )}
    </div>
  );
}
