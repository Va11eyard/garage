"use client"

import * as React from "react"
import { format } from "date-fns"
import { ru, kk } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Calendar } from "@/shared/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { useTranslation } from "@/shared/i18n/use-translation"

interface GovDatePickerProps {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  error?: boolean
  required?: boolean
}

export function GovDatePicker({
  value,
  onChange,
  placeholder,
  disabled,
  className,
  error,
  required,
}: GovDatePickerProps) {
  const { t, locale } = useTranslation()
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  )

  const dateLocale = locale === 'kk' ? kk : ru

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate && onChange) {
      // Format as YYYY-MM-DD for form compatibility
      const formattedDate = format(selectedDate, 'yyyy-MM-dd')
      onChange(formattedDate)
    } else if (!selectedDate && onChange) {
      onChange('')
    }
  }

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value))
    } else {
      setDate(undefined)
    }
  }, [value])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "w-full px-3 py-2 border rounded-md text-sm text-left",
            "focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center gap-2",
            error
              ? "border-gov-red-500 focus:border-gov-red-500 focus:ring-gov-red-500/20"
              : "border-gov-gray-300 focus:border-gov-blue-500 focus:ring-gov-blue-500/20",
            !date && "text-gov-gray-400",
            className
          )}
        >
          <CalendarIcon className="h-4 w-4 shrink-0" />
          {date ? (
            <span className="text-gov-gray-900">
              {format(date, "dd.MM.yyyy", { locale: dateLocale })}
            </span>
          ) : (
            <span>{placeholder || t('common.dateFormat')}</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white border shadow-lg" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          locale={dateLocale}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
