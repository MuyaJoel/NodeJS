export const createSchema = {
    username: {
        notEmpty : {
            errorMessage: "Username cann't be empty"
        },
        isLength: {
            options : { min : 5, max: 12},
            errorMessage: "Username must be between 5 and 12 chatacters"
        },
        isString: {
            errorMessage: "Username must be string"
        },
        trim : {}
        
    },
    displayName: {
        notEmpty : {
            errorMessage: "displayName cann't be empty"
        },
        isString: {
            errorMessage: "DisplayName must be string"
        }
    }
}
