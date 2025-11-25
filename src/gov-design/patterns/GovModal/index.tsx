import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { GovButton } from "@/gov-design/components/Button"

export interface GovModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

export function GovModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: GovModalProps) {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  }

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={cn(
          "bg-white rounded-xl shadow-2xl w-full mx-4 overflow-hidden",
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gov-blue-500 to-gov-blue-700 text-black px-6 py-4 flex items-center justify-between">
          <div>
            <h3 id="modal-title" className="text-lg font-semibold">
              {title}
            </h3>
            {description && (
              <p className="text-sm opacity-90 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded p-1 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-gov-gray-50 border-t border-gov-gray-200 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

// Convenience component for confirm dialogs
export interface GovConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
  isLoading?: boolean
}

export function GovConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  variant = "danger",
  isLoading = false,
}: GovConfirmModalProps) {
  return (
    <GovModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <GovButton variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </GovButton>
          <GovButton
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : confirmText}
          </GovButton>
        </>
      }
    >
      <p className="text-gov-gray-700">{message}</p>
    </GovModal>
  )
}
