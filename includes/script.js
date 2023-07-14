const container = document.getElementById('container');
const resetButton = document.getElementById('reset-button');

function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);
    }
}

function clearGrid() {
    while (container.firstChild) {
        container.firstChild.remove();
    }
}

function resetGrid() {
    let newSize = prompt('Enter the number of squares per side for the new grid (maximum: 100):');
    newSize = parseInt(newSize);
    if (isNaN(newSize) || newSize <= 0 || newSize > 100) {
        alert('Invalid input! Please enter a valid number between 1 and 100.');
        return;
    }

    clearGrid();
    createGrid(newSize);
}

function changeColor(e) {
    const square = e.target;
    const currentColor = square.style.backgroundColor;

    if (!currentColor || currentColor === 'rgb(255, 255, 255)') {
        square.style.backgroundColor = getRandomColor();
        square.dataset.darkness = 0;
    } else {
        let darkness = parseInt(square.dataset.darkness);
        if (darkness < 10) {
            darkness++;
            square.dataset.darkness = darkness;
            square.style.backgroundColor = darkenColor(currentColor, darkness);
        }
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(color, darkness) {
    const rgbValues = color.match(/\d+/g);
    const r = Math.floor(parseInt(rgbValues[0]) * (1 - darkness * 0.1));
    const g = Math.floor(parseInt(rgbValues[1]) * (1 - darkness * 0.1));
    const b = Math.floor(parseInt(rgbValues[2]) * (1 - darkness * 0.1));
    return `rgb(${r}, ${g}, ${b})`;
}

createGrid(16);

container.addEventListener('mouseover', changeColor);
resetButton.addEventListener('click', resetGrid);
