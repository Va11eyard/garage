"use client"

import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form"
import { GovDatePicker } from "./GovDatePicker"

interface GovDatePickerControllerProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  placeholder?: string
  disabled?: boolean
  className?: string
  error?: boolean
  required?: boolean
  rules?: Omit<RegisterOptions<T, Path<T>>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

export function GovDatePickerController<T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: GovDatePickerControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <GovDatePicker
          value={field.value}
          onChange={field.onChange}
          {...props}
        />
      )}
    />
  )
}
