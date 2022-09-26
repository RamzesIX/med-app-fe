export function cls(...classes: (string | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ')
}

export function delay(time: number): Promise<void> {
    return new Promise((res) => {
        setTimeout(res, time)
    })
}
