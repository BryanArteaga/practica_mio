interface IParams {
    a: number;
    b: number;
    operator: string;
}
function operationMatematica( params: IParams  ): number {
    const { a, b, operator } = params;
    if (operator === '+') {
        return a + b
    } else if (operator === '-') {
        return a - b
    } else if (operator === '*') {
        return a * b
    } else if (operator === '/') {
        return a / b
    }
    return 0
}

export { operationMatematica };


