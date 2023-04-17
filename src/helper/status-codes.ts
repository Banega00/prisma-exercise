export enum ErrorStatusCode {
    UNKNOWN_ERROR = 10000,
    VALIDATION_ERROR = 10001,
}

export enum SuccessStatusCode {
    Success = 20000
}

export function getStatusCodeDescription(status: SuccessStatusCode | ErrorStatusCode): string {
    return status in SuccessStatusCode ? SuccessStatusCodeDescription[status] : ErrorStatusCodeDescription[status];
}

const ErrorStatusCodeDescription: { [key: number]: string } = {
    10000: "Unknown error, please try again.",
    10001: "Message not found",
    10002: "Error sending message",
    10003: "Invalid payload format",
    10004: "Failure",
    10005: "Template not found",
    10006: "Content of message does not match template format"
}

const SuccessStatusCodeDescription: { [key: number]: string } = {
    20000: "Operation successfully executed"
}
