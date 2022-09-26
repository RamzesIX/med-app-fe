export function cls(...classes: (string | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ')
}

export function delay(time: number): Promise<void> {
    return new Promise((res) => {
        setTimeout(res, time)
    })
}

// TODO remove me once the server API is finished
export function isClientMode(): boolean {
    return process.env.APP_MODE === 'client'
}
