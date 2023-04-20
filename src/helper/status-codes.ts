export enum ErrorStatusCode {
    UNKNOWN_ERROR = 10000,
    VALIDATION_ERROR = 10001,
    USER_NOT_FOUND = 10002,
    USER_ALREADY_EXISTS = 10003,
    INVALID_PASSWORD = 10004,
    UNAUTHORIZED = 10005,
    FORBIDDEN = 10006,
    POST_NOT_FOUND = 10007
}

export enum SuccessStatusCode {
    SUCCESS = 20000,
    SUCCESSFUL_LOGIN=20001,
    SUCCESSFUL_REGISTRATION=20002,
    POST_CREATED=20003,
    POST_UPDATED=20004,
    POST_DELETED=20005
}

export function getStatusCodeDescription(status: SuccessStatusCode | ErrorStatusCode): string {
    return status in SuccessStatusCode ? SuccessStatusCodeDescription[status] : ErrorStatusCodeDescription[status];
}

const ErrorStatusCodeDescription: { [key: number]: string } = {
    10000: "Unknown error, please try again.",
    10001: "Validation error",
    10002: "User not found",
    10003: "User already exists",
    10004: "Invalid password",
    10005: "Unauthorized",
    10006: "Forbidden",
    10007: "Post not found"
}

const SuccessStatusCodeDescription: { [key: number]: string } = {
    20000: "Operation successfully executed",
    20001: "Login successful",
    20002: "Registration successful",
    20003: "Post created",
    20004: "Post updated",
    20005: "Post deleted"

}
