import cn from 'classnames';
import {
  UseFormReturn,
  UseFormRegisterReturn,
  Control,
  FieldValues,
  Controller,
  Path,
  FieldError,
} from 'react-hook-form';
import { cutiveMono } from '@styles/fonts';
import { ReactNode, TextareaHTMLAttributes } from 'react';

export const Form = <T extends FieldValues>({
  formContext,
  onSubmit,
  children,
}: {
  formContext: UseFormReturn<T, unknown, undefined>;
  onSubmit: (data: T) => void;
  children: ReactNode;
}) => {
  return (
    <form
      className={cn('text-[18px] font-bold p-3', cutiveMono.className)}
      onSubmit={formContext.handleSubmit(onSubmit)}
    >
      {children}
      <input
        className="underline decoration-dotted underline-offset-2 hover:cursor-pointer hover:text-blue-600"
        type="submit"
        value="Send"
      />
    </form>
  );
};

export const InputEmail = <Name extends string>({
  label,
  name,
  register,
  error,
}: {
  label: string;
  name: Name;
  register: UseFormRegisterReturn<Name>;
  error?: FieldError;
}) => {
  return (
    <div className="flex flex-row gap-4">
      <label
        className={cn('font-bold whitespace-nowrap', {
          'text-red-600': Boolean(error),
        })}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        className="bg-black focus:outline-none hover:bg-gray-800 focus:bg-gray-900 w-full"
        type="email"
        {...register}
      />
    </div>
  );
};

export const InputText = <Name extends string>({
  label,
  name,
  register,
  error,
}: {
  label: string;
  name: Name;
  register: UseFormRegisterReturn<Name>;
  error?: FieldError;
}) => {
  return (
    <div className="flex flex-row gap-4">
      <label
        className={cn('font-bold whitespace-nowrap', {
          'text-red-600': Boolean(error),
        })}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        className="bg-black focus:outline-none hover:bg-gray-800 focus:bg-gray-900 w-full"
        type="text"
        {...register}
      />
    </div>
  );
};

export const InputTextFake = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-row gap-4">
      <label className="font-bold whitespace-nowrap">{label}</label>
      <span>{value}</span>
    </div>
  );
};

export const InputTextArea = <T extends FieldValues>({
  label,
  name,
  register,
  ...props
}: {
  label?: string;
  name: Path<T>;
  register: UseFormRegisterReturn<Path<T>>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div className="flex flex-row gap-4">
      {label && (
        <label htmlFor={name} className="font-bold whitespace-nowrap">
          {label}
        </label>
      )}
      <textarea
        id={name}
        className="bg-black focus:outline-none hover:bg-gray-800 focus:bg-gray-900 font-normal w-full"
        rows={props?.rows}
        {...register}
      />
    </div>
  );
};

export const FieldSet = ({
  legend,
  children,
}: {
  legend: string;
  children: ReactNode;
}) => {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className="ml-4">{children}</div>
    </fieldset>
  );
};

export const CheckBox = <T extends FieldValues>({
  control,
  name,
  label,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div
            className="flex flex-row gap-4 cursor-pointer group"
            onClick={() => {
              onChange(!value);
            }}
          >
            <span className="font-bold group-hover:text-blue-600">{`[${value ? 'X' : ' '}]`}</span>
            <label htmlFor={name}>{label}</label>
          </div>
        );
      }}
    />
  );
};
