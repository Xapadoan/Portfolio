import cn from 'classnames';
import { UseFormReturn, UseFormRegisterReturn } from 'react-hook-form';
import { cutiveMono } from '@styles/fonts';
import { ReactNode } from 'react';

export const Form = <T extends Record<string, unknown>>({
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
}: {
  label: string;
  name: Name;
  register: UseFormRegisterReturn<Name>;
}) => {
  return (
    <div className="flex flex-row gap-4">
      <label className="font-bold" htmlFor={name}>
        {label}
      </label>
      <input
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
}: {
  label: string;
  name: Name;
  register: UseFormRegisterReturn<Name>;
}) => {
  return (
    <div className="flex flex-row gap-4">
      <label className="font-bold" htmlFor={name}>
        {label}
      </label>
      <input
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
      <label className="font-bold">{label}</label>
      <span>{value}</span>
    </div>
  );
};

export const InputTextArea = <Name extends string>({
  register,
  rows,
}: {
  register: UseFormRegisterReturn<Name>;
  rows: HTMLTextAreaElement['rows'];
}) => {
  return (
    <div>
      <textarea
        className="bg-black focus:outline-none hover:bg-gray-800 focus:bg-gray-900 font-normal w-full"
        rows={rows}
        {...register}
      />
    </div>
  );
};
