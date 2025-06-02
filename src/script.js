const gridSize = 50;
const offsetX = 25;
const offsetY = 25;
let selected = null;
let offset = { x: 0, y: 0 };
let deadblackCount = 0;
let deadredCount = 0;

function snapToGrid(x, y) {
    const snappedX = Math.round((x - offsetX) / gridSize) * gridSize + offsetX;
    const snappedY = Math.round((y - offsetY) / gridSize) * gridSize + offsetY;
    return { x: snappedX, y: snappedY };
}


function removePiece(piece) {
    let x, y = 0;
    // piece.remove();
    if(piece.getAttribute('data-color') === 'red') {
        x = 500 + Math.floor(deadredCount/8) * 50
        y = 25+deadredCount%8 * 50
        deadredCount++;
    } else {
        x = 600 + Math.floor(deadblackCount/8)* 50
        y = 25+deadblackCount%8 * 50
        deadblackCount++;
    }
    piece.setAttribute('transform', `translate(${x},${y})`);
    // remove the piece event listener
    piece.removeEventListener('click', handleClick);
}

function handleClick(e) {
    const piece = e.currentTarget;
    e.stopPropagation();
    if (selected) {
        // check the selected piece data-color
        // same colore switch selected piece
        if (selected.getAttribute('data-color') === piece.getAttribute('data-color')) {
            selected.querySelectorAll('circle').forEach(circle => {
                circle.setAttribute('fill', 'white');
            });
            selected = piece;
            // different color remove piece and move selected piece
        } else {
            const transform = piece.getAttribute('transform');
            const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
            let x, y = 0;
            if (match) {
                x = parseFloat(match[1]);
                y = parseFloat(match[2]);
            }
            console.log(`x: ${x}, y: ${y}`);
            // remove the piece from the board
            removePiece(piece);
            // move the selected piece to the clicked position
            selected.querySelectorAll('circle').forEach(circle => {
                circle.setAttribute('fill', 'white');
            });
            selected.setAttribute('transform', `translate(${x},${y})`);
            selected = null
        }
    } else {
        selected = piece;
    }

    if (selected) {
        selected.querySelectorAll('circle').forEach(circle => {
            circle.setAttribute('fill', 'yellow');
        });
    }
}

export function setupMouseMoveAndClick(document) {
    document.getElementById('svg-object').addEventListener('load', function () {
        const svgDoc = this.contentDocument;
        const pieces = svgDoc.querySelectorAll('.piece');

        pieces.forEach(piece => {
            piece.addEventListener('click', handleClick);
        });

        svgDoc.addEventListener('click', e => {
            if (!selected) return;
            const centerX = e.clientX;
            const centerY = e.clientY;
            const { x, y } = snapToGrid(centerX, centerY);

            // move the selected piece to the clicked position
            selected.setAttribute('transform', `translate(${x},${y})`);
            if (selected) {
                selected.querySelectorAll('circle').forEach(circle => {
                    circle.setAttribute('fill', 'white');
                });
            }
            selected = null;
        });
    });
}