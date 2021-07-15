const Ship = require('./ships');

const Gameboard = () => {
    let board = [];
    let ships = [];

    const shipSizes = [
        ['Carrier', 5],
        ['Battleship', 4],
        ['Destroyer', 3],
        ['Submarine', 3],
        ['Patrol', 2]
    ]

    const init = () => {
        for (let i=0; i<100; i++) {
            let info = {
                shipInfo: {
                    hasShip: false,
                    shipObj: null
                },
                isHit: false
            };
            board.push(info);
        };

        shipSizes.forEach(boat => {
            ships.push(createShip(boat));
        });

    }

    const showBoard = () => board;

    const getShips = () => ships;

    const receiveAttack = (move) => {
        if (!board[move] || board[move].isHit) {
            throw new Error('Error: Invalid Move');
        } else if (board[move].hasShip) {
            board[move].isHit = true;
            return 'hit';
        } else {
            board[move].isHit = true;
            return 'miss';
        }
    }

    const createShip = ([shipType, length]) => {
        return Ship(length, shipType);
    }

    const placeShip = (ship, location, axis) => {

        shipLength = ship.getLength();

        if (!isValidPlacement(shipLength, location, axis)) {
            throw new Error('Error: Invalid Ship Placement');
        }

        if (axis === 'x') {
            for (let i=0; i < shipLength; i++) {
                board[location + i].shipInfo.hasShip = true;
                board[location + i].shipInfo.shipObj = ship;
            }
        }

        if (axis === 'y') {
            for (let i=0; i < shipLength; i++) {
                board[location + (i * 10)].shipInfo.hasShip = true;
                board[location + (i * 10)].shipInfo.shipObj = ship;
            }
        }
    }

    const isValidPlacement = (shipLength, location, axis) => {
        if (axis == 'x') {
            if (location % 10 > (location + shipLength - 1) % 10) {
                return false;
            };
        } else if (axis == 'y') {
            let row = Math.floor(location / 10);

            if (row % 10 > (row + shipLength - 1) % 10) {
                return false;
            }
        }
        return true;
    };

    init();

    return {
        showBoard,
        receiveAttack,
        getShips,
        placeShip,
    }
}

module.exports = Gameboard;