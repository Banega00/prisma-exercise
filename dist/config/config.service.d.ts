declare class ConfigService {
    env: {
        port: number;
        db: {
            port: number;
            host: string;
            username: string;
            password: string;
            db_name: string;
        };
    };
    db_url(): string;
    constructor();
    getValue(key: string, throwOnMissing?: boolean): string;
    ensureValues(keys: string[]): this;
}
declare const configService: ConfigService;
export { configService };
