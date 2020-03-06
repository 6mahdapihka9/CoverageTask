let res = (a)=>{
    let sum = a;
    function ad(b) {
        if (b) {
            sum += b;
            return sum;
        }
    }
    return a;
};

const add = (a) => {
    let sum = a;
    const func = (b) => {
        if (b) {
            sum += b;
            return func;
        } else {
            return sum;
        }
    };
    return func;
};

console.log( add(10)(5)(2) );
