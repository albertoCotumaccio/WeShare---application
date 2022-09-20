export const isValidObjField = obj => {
    return Object.values(obj).every(value => value.trim());
}

export const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
        stateUpdater('');
    }, 4500);
    }


export const isValidEmail = value => {
    const regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regx.test(value);
}



export const isValidPhone = value => {
    const regx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
   
    return regx.test(value);
}