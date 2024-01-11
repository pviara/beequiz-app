export class User {
    constructor(
        readonly username: string,
        readonly password: string,
        readonly hasBeenWelcomed?: boolean,
    ) {}
}
