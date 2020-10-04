export interface BasicConsole {
    warn?: (...args: string[]) => void;
    log: (...args: string[]) => void;
}
export declare function warnIfWindowDetected(window: any, console: BasicConsole): void;
