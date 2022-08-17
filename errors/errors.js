const AppError = {
    ERR_NOT_FOUND: 123142314,
    ERR_VALIDATION_ERROR: "ASDFWSF"
}

class NotFoundError extends Error{
    constructor(msg){
        const errorMessage = msg == null ? "Não encontrado entidade" : msg; 
        super(errorMessage);
        this.code = AppError.ERR_NOT_FOUND;
    }
}

class ValidationError extends Error{
    constructor(msg, atribute, validation){
        let errorMessage = msg == null ? "Error na validação do atributo" : msg;
        errorMessage += ` | ${atribute} : ${validation}`
        super(errorMessage);
        this.code = AppError.ERR_VALIDATION_ERROR;
    }
}


export {AppError, NotFoundError, ValidationError};
