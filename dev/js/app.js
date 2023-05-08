let originalMatrix = document.getElementById(`original`);
let flippedMatrix = document.getElementById(`flipped`);

window.onload = () => {
    let input = (parseInt(window.prompt(`Please enter an integer`)));

    while (isNaN(input) || input < 2) {
        if (isNaN(input)) {
            window.alert(`Error. Input must be an integer. Try again.`);
        }
        else {
            window.alert(`Error. Input cannot be less than 2. Try again.`);
        }

        input = window.prompt(`Please enter an integer`);
    }

    let originalMatrixTitle = document.createElement(`caption`);
    originalMatrixTitle.innerText = `Original Matrix`;
    originalMatrix.appendChild(originalMatrixTitle);

    let matrix = [];

    for (let row = 0; row < input; row++) {
        let matrixRow = document.createElement(`tr`);
        matrix[row] = [];

        for (let column = 0; column < input; column++) {
            let cell = document.createElement(`td`);
            matrix[row][column] = column + row * input + 1;
            cell.innerHTML = matrix[row][column];

            if (row + column === input - 1) {
                cell.setAttribute(`class`, `diagonal`);
            }

            matrixRow.appendChild(cell);

        }

        originalMatrix.appendChild(matrixRow);

    }

    let flippedMatrixTitle = document.createElement(`caption`);
    flippedMatrixTitle.innerText = `Flipped Matrix`;
    flippedMatrix.appendChild(flippedMatrixTitle);

    let flipMatrix = [];

    for (let row = 0; row < input; row++) {
        flipMatrix[row] = [];

        for (let column = input - 1; column >= 0; column--) {
            let temp = flipMatrix[row][input - 1 - column];
            flipMatrix[row][input - 1 - column] = matrix[column][row];
            matrix[column][row] = temp;
        }
    }

    flipMatrix.reverse();

    for (let row = 0; row < input; row++) {
        let matrixRow = document.createElement(`tr`);

        for (let column = 0; column < input; column++) {
            let cell = document.createElement(`td`);

            if (row + column === input - 1) {
                cell.setAttribute(`class`, `diagonal`);
                cell.innerHTML = flipMatrix[row][column];
            }
            else {
                cell.innerHTML = flipMatrix[column][row];
            }

            matrixRow.appendChild(cell);

        }

        flippedMatrix.appendChild(matrixRow);

    }

};
