"use client"

import * as React from "react"
import { format } from "date-fns"
import { ru, kk } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { useTranslation } from "@/shared/i18n/use-translation"

interface DatePickerProps {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  disabled,
  className,
}: DatePickerProps) {
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
    }
  }

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value))
    }
  }, [value])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "dd.MM.yyyy", { locale: dateLocale })
          ) : (
            <span>{placeholder || t('common.dateFormat')}</span>
          )}
        </Button>
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
