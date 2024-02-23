export function fibonacci (num: number) {
    const result: number[] = []

    for(let i=0; i<num; i++) {
        const prev = result[result.length - 2] ?? 0  
        const cur =  result[result.length - 1] ?? 0

        result.push(cur ? prev + cur : 1)
    }

    return num
}