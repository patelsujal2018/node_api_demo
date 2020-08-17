module.exports = {
    formatValidationErrors: (validatorErrorsArr) => {
        var validatorErrorsArrFormated = {};
        validatorErrorsArr.forEach(function(value,index){
            if(validatorErrorsArrFormated.hasOwnProperty(value.param)){
                validatorErrorsArrFormated[value.param].push(value.msg);
            } else{
                validatorErrorsArrFormated[value.param] = [];
                validatorErrorsArrFormated[value.param].push(value.msg);
            }
        });
        return validatorErrorsArrFormated;
    }
};