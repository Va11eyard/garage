/**
 * Extract error message from API error response
 * @param error - The error object from API call
 * @returns User-friendly error message
 */
export function getErrorMessage(error: any): string {
    // Check if error has a response body with message
    if (error?.body?.message) {
        return error.body.message
    }
    
    // Check if error has a message property
    if (error?.message) {
        return error.message
    }
    
    // Check if error response has error field
    if (error?.body?.error) {
        return error.body.error
    }
    
    // Check for validation errors
    if (error?.body?.errors) {
        const errors = error.body.errors
        if (Array.isArray(errors)) {
            return errors.join(', ')
        }
        if (typeof errors === 'object') {
            return Object.values(errors).flat().join(', ')
        }
    }
    
    // Check for status text
    if (error?.statusText) {
        return error.statusText
    }
    
    // Default error message
    return 'Произошла ошибка'
}
