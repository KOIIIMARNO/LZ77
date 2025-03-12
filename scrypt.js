
function lz77Compress(inputString) {
    let i = 0;
    const n = inputString.length;
    const result = [];

    while (i < n) {
        let matchLength = 0;
        let matchOffset = 0;

        for (let j = 0; j < i; j++) {
            let length = 0;
            while (length + i < n && inputString[j + length] === inputString[i + length]) {
                length++;
            }
            if (length > matchLength) {
                matchLength = length;
                matchOffset = i - j;
            }
        }
        if (inputString[i + matchLength] == null){
          result.push([matchOffset, matchLength, ""]);
          break
        }

        if (matchLength > 0) {
            result.push([matchOffset, matchLength, inputString[i + matchLength]]);
            i += matchLength + 1;
        } else {
            result.push([0, 0, inputString[i]]);
            i++;
        }
    }

    return result;
}


function lz77Decompress(compressedData) {
    let result = '';

    for (let i = 0; i < compressedData.length; i++) {
        const [offset, length, char] = compressedData[i];

        if (length > 0) {
            const start = result.length - offset;
            for (let j = 0; j < length; j++) {
                result += result[start + j];
            }
            result += char;
        } else {
            result += char;
        }
    }

    return result;
}


function compressString() {
    const input = document.getElementById("inputCompress").value.trim();
    if (input === "") {
        alert("Пожалуйста, введите текст для сжатия.");
        return;
    }

    const compressed = lz77Compress(input);
    document.getElementById("result").textContent = JSON.stringify(compressed, null, 2);
}


function decompressString() {
    const input = document.getElementById("inputDecompress").value.trim();
    if (input === "") {
        alert("Пожалуйста, введите текст для разжатия.");
        return;
    }

    try {
        const compressedData = JSON.parse(input);
        const decompressed = lz77Decompress(compressedData);
        document.getElementById("result").textContent = decompressed;
    } catch (error) {
        alert("Неверный формат. Убедитесь, что введенные данные соответствуют формату сжатого текста.");
    }
}