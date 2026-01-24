
module.exports = (rules) => {
    return async(req, res, next) => {
        try {
            const data = req.body;
            if (!data) {
                throw {code: 422, message:"Data Not Found", status:"EMPTY_PAYLOAD_ERR"}
                
            }
            await rules.validateAsync(data, {abortEarly: false})
            next()
            
        } catch (exception) {
            console.log(exception);
            next(exception) 
            
            
        }

    }
    
}