var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && b === 'number') {
                resolve(a + b);
            }
            else {
                reject('Arguments are not numbers');
            }
        }, 1500);
    })
}

var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //        resolve('It works');
        reject("It failed");
    }, 2500);

});

somePromise.then((message) => {
    console.log(message);
}, (errorMessage) => {
    console.log(errorMessage);
})