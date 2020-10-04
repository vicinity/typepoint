export declare class PathBuilder<TRequestParams> {
    private readonly parts;
    protected constructor();
    literal(path: string): PathBuilder<TRequestParams>;
    param(name: keyof TRequestParams): PathBuilder<TRequestParams>;
    toString(): string;
}
export declare type PathBuildingFunction<TRequestParams> = (path: PathBuilder<TRequestParams>) => PathBuilder<TRequestParams>;
export declare function createPath<TRequestParams>(build: PathBuildingFunction<TRequestParams>): string;
