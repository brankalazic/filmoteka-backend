export class JwtDataAdministratorDto {
    administratorId: number;
    username: string;
    exp: number; // unix timestamp
    ip: string;
    ua: string;

    // iz klasnog u obican objekat
    toPlainObject() {
        return {
            administratorId: this.administratorId,
            username: this.username,
            exp: this.exp,
            ip: this.ip,
            ua: this.ua,
        }
    }
}