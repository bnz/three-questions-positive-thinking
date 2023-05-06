export const randomIntFromInterval = (min: number, max: number): number => (
    Math.floor(Math.random() * (max - min + 1) + min)
)

export const generateRandom = (except: number[]): number => {
    const num = randomIntFromInterval(0, 2)
    return except.includes(num) ? generateRandom(except) : num
}
