export function cx(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}
