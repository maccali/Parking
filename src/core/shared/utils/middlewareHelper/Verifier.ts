export class Verifier {
    userPoolId: string
    clientId: string

    constructor(userPoolId: string, clientId: string) {
        this.userPoolId = userPoolId
        this.clientId = clientId
    }

    validateUser(userLogged: any): boolean {
        if(userLogged.aud === this.userPoolId && userLogged.aud === this.clientId){
            return true
        }
        return false
    }
}