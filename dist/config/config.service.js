"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = void 0;
require('dotenv').config();
class ConfigService {
    db_url() {
        return `postgresql://${this.env.db.username}:${this.env.db.password}@${this.env.db.host}:${this.env.db.port}/${this.env.db.db_name}?schema=public`;
    }
    constructor() {
        this.env = {
            port: +this.getValue('PORT') || 8080,
            db: {
                port: +this.getValue('DB_PORT') || 5432,
                host: this.getValue('DB_HOST') || 'localhost',
                username: this.getValue('DB_USERNAME'),
                password: this.getValue('DB_PASSWORD'),
                db_name: this.getValue('DB_NAME'),
            }
        };
    }
    getValue(key, throwOnMissing = false) {
        const value = process.env[key.toUpperCase()] || process.env[key.toLowerCase()];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }
    ensureValues(keys) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }
}
const configService = new ConfigService();
exports.configService = configService;
//# sourceMappingURL=config.service.js.map