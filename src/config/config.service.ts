require('dotenv').config()

export class ConfigService {

    public env = {
        environment: this.getValue('NODE_ENV') || this.getValue('ENV') || this.getValue('ENVIRONMENT'),
        port: +this.getValue('PORT') || 8080,
        db: {
            port: +this.getValue('DB_PORT') || 5432,
            host: this.getValue('DB_HOST') || 'localhost',
            username: this.getValue('DB_USERNAME'),
            password: this.getValue('DB_PASSWORD'),
            db_name: this.getValue('DB_NAME'),
        },
        jwt_secret: this.getValue('JWT_SECRET'),
    }

    public db_url(){
        return `postgresql://${this.env.db.username}:${this.env.db.password}@${this.env.db.host}:${this.env.db.port}/${this.env.db.db_name}?schema=public`
    }

    constructor() {}

    public getValue(key: string, throwOnMissing = false): string {
        const value = process.env[key.toUpperCase()] || process.env[key.toLowerCase()];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }
    


}

const configService = new ConfigService();

export { configService };