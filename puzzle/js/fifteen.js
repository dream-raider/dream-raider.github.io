"use strict";
var row = 3;
var col = 3;
const WIDTH = 100;
const HEIGHT = 100;
$(document).ready(function () {
    //<-- first initialize puzzle in background--->
    var init = function () {
        row = 3;
        col = 3;
        var xPos = function (num) {
            return (num % 4) * 100;
        };
        var yPos = function (num) {
            return Math.floor(num / 4) * 100;
        };
        $("#puzzlearea div").each(function (idx) {
            var x = xPos(idx);
            var y = yPos(idx);
            console.log(x);
            $(this).addClass("puzzlepiece");
            $(this).css({
                "background-image": "url(images/background.jpg)",
                "background-position": -x + "px " + -y + "px",
                left: x + "px",
                top: y + "px",
            });
            $(this).x = x;
            $(this).y = y;
        });
    };
    init();

    //<!---- puzzle play -- ((hover and move )) --->
    $("#puzzlearea div").hover(
        function () {
            $(this).addClass("movablepiece");
        },
        function () {
            $(this).removeClass("movablepiece");
        }
    );

    $("#puzzlearea div").click(function () {
        var div = $(this);
        var checkMov = isMovable(div);
        if (checkMov) {
            movePiece(div);
        } else {
            alert("Sorry, can't Move");
        }
    });

    // <!--Shuffle  Algorithim -->
    $("#shufflebutton").click(function () {
        init();
        let originalUnshuffledArray = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        ];
        let shuffledArray = shuffleArray(originalUnshuffledArray);
        console.log(shuffledArray);
        $("#puzzlearea div").each(function (idx) {
            let newIdx = shuffledArray[idx];
            var xPos = function (num) {
                return (num % 4) * 100;
            };
            var yPos = function (num) {
                return Math.floor(num / 4) * 100;
            };
            var x = xPos(newIdx);
            var y = yPos(newIdx);
            var origX = xPos(idx);
            var origY = yPos(idx);
            $(this).addClass("puzzlepiece");
            $(this).css({
                "background-image": "url(images/background.jpg)",
                "background-position": -origX + "px " + -origY + "px",
                left: x + "px",
                top: y + "px",
            });
            $(this).x = x;
            $(this).y = y;
        });
        randomizeEmptyArea(shuffledArray);
    });

    //<!----UTILITY FUCNTIONS----->
    function movePiece(div) {
        var curElemPosition = div.position();
        var x = curElemPosition.left;
        var y = curElemPosition.top;
        console.log(x + "x" + "y" + y);
        var tempX = x / 100;
        var tempY = y / 100;
        $(div).css({
            top: col * HEIGHT,
            left: row * WIDTH,
        });
        row = tempX;
        col = tempY;
    }

    var isMovable = function (div) {
        var emptySquareXpos = row * WIDTH;
        var emptySquareYpos = col * HEIGHT;

        var curElemPosition = $(div).position();
        var x = curElemPosition.left;
        var y = curElemPosition.top;

        // movable position left right top bottom
        var leftPos = x + 100;
        var upTopPos = y - 100;
        var rightPos = x - 100;
        var downPos = y + 100;

        var leftPOSCHECK =
            leftPos == emptySquareXpos && y == emptySquareYpos ? true : false;
        var rightPOSCHECK =
            rightPos == emptySquareXpos && y == emptySquareYpos ? true : false;
        var topPOSCHECK =
            upTopPos == emptySquareYpos && x == emptySquareXpos ? true : false;
        var downPOSCHECK =
            downPos == emptySquareYpos && x == emptySquareXpos ? true : false;
        if (leftPOSCHECK || rightPOSCHECK || topPOSCHECK || downPOSCHECK) {
            return true;
        } else {
            return false;
        }
    };

    var shuffleArray = function (arr) {
        let numElements = arr.length;
        let numTimesToShuffle = numElements;
        while (numTimesToShuffle != 0) {
            let randIdx1 = Math.floor(Math.random() * numElements);
            let randIdx2 = Math.floor(Math.random() * numElements);
            let tmp = arr[randIdx1];
            arr[randIdx1] = arr[randIdx2];
            arr[randIdx2] = tmp;
            numTimesToShuffle -= 1;
        }
        return arr;
    };

    var randomizeEmptyArea = function (arr) {
        let numElements = arr.length;
        let randDivIdx = Math.floor(Math.random() * numElements);
        var randDiv = $("#puzzlearea div")[randDivIdx];
        console.log("Empty area is: x => " + row + " and y => " + col);
        let randDivX = $(randDiv).position().left;
        let randDivY = $(randDiv).position().top;
        $(randDiv).css({
            top: col * HEIGHT,
            left: row * WIDTH,
        });
        row = randDivX / 100;
        col = randDivY / 100;
        console.log("Empty area is: x => " + row + " and y => " + col);
    };
});