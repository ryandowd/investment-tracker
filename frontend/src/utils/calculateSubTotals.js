export const cashSubTotal = (assetObj) => {
    const cloneObj = {...assetObj};
    delete cloneObj.id;
    delete cloneObj.date;
    delete cloneObj.dateUnix;
    const subtotal = Object.values(cloneObj).reduce((r,c) => r + c, 0)
    return subtotal.toFixed(2);
}

export const cryptoSubTotal = (assetObj) => {
    const cloneObj = {...assetObj};
    delete cloneObj.id;
    delete cloneObj.date;
    delete cloneObj.dateUnix;
    const subtotal = Object.values(cloneObj).reduce((r,c) => r + c, 0)
    return subtotal.toFixed(2);
}

export const isaSubTotal = (assetObj) => {
    const cloneObj = {...assetObj};
    delete cloneObj.id;
    delete cloneObj.date;
    delete cloneObj.dateUnix;
    const subtotal = Object.values(cloneObj).reduce((r,c) => r + c, 0)
    return subtotal.toFixed(2);
}