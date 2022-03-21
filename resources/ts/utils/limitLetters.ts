const limitLetters =  (str:string,limit:number) => {
                 
    if(str.length >= limit) {
        let result = ""
        for (let index = 0; index <= limit; index++) {
            result+=str[index];
        }
        return result+"..."
    }
    return str
}

export {
    limitLetters
}