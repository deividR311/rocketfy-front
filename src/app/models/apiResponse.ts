export class ApiResponse {
    status: string;
    message: string;
    response: any;

    constructor() {
        this.status = ''
        this.message = ''
        this.response = null;
    }
}