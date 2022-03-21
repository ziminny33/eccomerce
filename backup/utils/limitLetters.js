export const limitLetters = (string,limit) => {
                 
    if(string.length >= limit) {
        let result = ""
        for (let index = 0; index <= limit; index++) {
            result+=string[index];
        }
        return result+"..."
    }
    return string
}