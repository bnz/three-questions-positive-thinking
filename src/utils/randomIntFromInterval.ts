export function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generateRandom(except: number[]): number {
    const num = randomIntFromInterval(0, 2)
    return except.includes(num) ? generateRandom(except) : num
}
