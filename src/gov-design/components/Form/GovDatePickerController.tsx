"use client"

import * as React from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { GovDatePicker } from "./GovDatePicker"

interface GovDatePickerControllerProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  placeholder?: string
  disabled?: boolean
  className?: string
  error?: boolean
  required?: boolean
}

export function GovDatePickerController<T extends FieldValues>({
  name,
  control,
  ...props
}: GovDatePickerControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
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
