export class JwtDataDto {
    role: "administrator" | "user";
    id: number;
    username: string;
    exp: number; // unix timestamp
    ip: string;
    ua: string;

    // iz klasnog u obican objekat
    toPlainObject() {
        return {
            role: this.role,
            id: this.id,
            username: this.username,
            exp: this.exp,
            ip: this.ip,
            ua: this.ua,
        }
    }
}