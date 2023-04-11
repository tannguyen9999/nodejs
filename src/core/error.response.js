'use strict';
const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    NOTFOUND:404,
}

const ReasonStatusCode = {
    FORBIDDEN: "Bad Request Error", 
    CONFLICT: "Conflict Error",
    NOTFOUND:"NOT FOUND",
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

class NotFoundError extends ErrorResponse{
    constructor(message = ReasonStatusCode.NOTFOUND,status = StatusCode.NOTFOUND){
        super(message,status);
    }
}

class FORBIDDENERROR extends ErrorResponse{
    constructor(message = ReasonStatusCode.FORBIDDEN,status = StatusCode.FORBIDDEN){
        super(message,status);
    }
}

module.exports = {
    ConfictRequestError,
    BadRequestError,
    NotFoundError,
    FORBIDDENERROR
};