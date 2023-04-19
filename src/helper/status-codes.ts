export enum ErrorStatusCode {
    UNKNOWN_ERROR = 10000,
    VALIDATION_ERROR = 10001,
    USER_NOT_FOUND = 10002,
    USER_ALREADY_EXISTS = 10003
}

export enum SuccessStatusCode {
    SUCCESS = 20000,
    SUCCESSFUL_LOGIN=20001,
    SUCCESSFUL_REGISTRATION=20002
}

export function getStatusCodeDescription(status: SuccessStatusCode | ErrorStatusCode): string {
    return status in SuccessStatusCode ? SuccessStatusCodeDescription[status] : ErrorStatusCodeDescription[status];
}

const ErrorStatusCodeDescription: { [key: number]: string } = {
    10000: "Unknown error, please try again.",
    10001: "Validation error",
    10002: "User not found",
    10003: "User already exists",
}

const SuccessStatusCodeDescription: { [key: number]: string } = {
    20000: "Operation successfully executed",
    20001: "Login successful",
    20002: "Registration successful"
}
