'use strict';
const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: "Bad Request Error", 
    CONFLICT: "Conflict Error",
}
class ErrorResponse extends Error {
    constructor(message,status){
        super(message);
        this.status = status;
    }
}

class ConfictRequestError extends ErrorResponse{
    constructor(message = ReasonStatusCode.CONFLICT,status = StatusCode.CONFLICT){
        super(message,status);
    }
}

class BadRequestError extends ErrorResponse{
    constructor(message = ReasonStatusCode.CONFLICT,status = StatusCode.CONFLICT){
        super(message,status);
    }
}

module.exports = {
    ConfictRequestError,
    BadRequestError
};