export const generateCode = (codeLength) => {
    const number = String(Math.random()).split('.')[1].split('');
    const length = number.length;


    if(!codeLength){
        code = 4
    }

    let code = '';
    for (let i = 0; i < codeLength; i++) {
        code = code + number[length - (i + 1)];
    }
    return code;
}