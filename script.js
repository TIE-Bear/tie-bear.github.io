"use strict"

let clearTextBlock = document.getElementById("clear-text-input");
let encodedTextOutput = document.getElementById("encoded-text-output");
let encodedTextBlock = document.getElementById("encoded-text-input");
let decodedTextOutput = document.getElementById("decoded-text-output");

let encodeButton = document.getElementById("encode-button");
let decodeButton = document.getElementById("decode-button");

encodeButton.addEventListener("click", encode);
decodeButton.addEventListener("click", decode);

function decode() {
    let result = "";
    let input = encodedTextBlock.value.split("-");
    for (let i = 0; i < input.length; i++) {
        if (input[i] != "0") {
            let base = parseInt(input[i].charAt(0)) - 2;
            let residue = input[i].length;
            let symbolCode = base * 4 + 1072 + residue - 1;
            result += String.fromCodePoint(symbolCode);
        } else {
            result += String.fromCodePoint(32);
        }      
    }
    decodedTextOutput.innerHTML = result;
}

function encode() {
    let result = "";
    
    let input = clearTextBlock.value;
    input = input.trim().toLowerCase();
    if (input.length != 0) {
        for(let i = 0; i < input.length; i++) {
            let char = input.codePointAt(i);
            if (char > 1071 && char < 1104) {
                result += getNumberByCode(char) + "-";
            } else {
                result += "0-";
            }
        }
        if(result.endsWith("-")) {
            result = result.substring(0, result.length - 1);
        }
    }
   encodedTextOutput.innerHTML = result;
}

function getNumberByCode(decChar) {
    decChar -= 1072;
    let base = decChar / 4 - decChar % 4 / 4;
    let k = () => {
        let residue = decChar % 4;
        let result = 0;
        for (let i = 0; i <= residue; i++) {
            result += 10**i
        }    
        return result;
    };
    return (2 + base) * k(); 
}

function getCodeByNumber(number) {
     
}
