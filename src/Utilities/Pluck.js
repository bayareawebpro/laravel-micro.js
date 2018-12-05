export default function (o, ...fieldsArray) {
    fieldsArray = fieldsArray.length === 1 && Array.isArray(fieldsArray[0]) ? fieldsArray[0] : fieldsArray
    return fieldsArray.reduce((a, x) => {
        if(o.hasOwnProperty(x)) a[x] = o[x];
        return a;
    }, {});
}
