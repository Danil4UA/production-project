type Modes = Record<string, boolean | string>


export function classNames(cls: string, modes: Modes, additional: string[]): string {
    return [
        cls,
        ...additional,
        Object.entries(modes)
            .filter(([className, value])=> Boolean(value))
            .map(([className])=> className)
    ]
        .join(" ")
} 
