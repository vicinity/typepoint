export interface Logger {
    log(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export declare class NoopLogger {
    log: () => void;
    debug: () => void;
    info: () => void;
    warn: () => void;
    error: () => void;
}
