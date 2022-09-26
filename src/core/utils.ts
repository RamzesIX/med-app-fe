export const cls = (...classes: (string | undefined | null)[]): string => classes.filter(Boolean).join(' ')
