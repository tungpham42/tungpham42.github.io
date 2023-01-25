const audioBg = document.getElementById("musicBg");
const audioShake = document.getElementById("musicShake");
const imgMute = document.getElementById("mute");
const bowl = document.getElementById("bowl");
const dice = [];
dice[0] = document.getElementById("dice1");
dice[1] = document.getElementById("dice2");
dice[2] = document.getElementById("dice3");

var audioPlaying = false;
var imgList = ["bau", "cua", "tom", "ca", "ga", "huou"];
var indexDice = [0, 0, 0];
var delayMillis = 850;

audioBg.loop = true;

function mute() {
    if(audioPlaying == true) {
        audioBg.pause();
        imgMute.src = "./image/mute.png";
        audioPlaying = false;
    }
    else {
        audioBg.play();
        imgMute.src = "./image/unmute.png";
        audioPlaying = true;
    }
}

function openBowl() {
    bowl.style.animationName="none";
    bowl.style.transitionDuration="1s";
    bowl.style.transform="translateY(-350px)";
}

function shakeBowl() {
    bowl.style.transitionDuration="1s";
    bowl.style.transform="translateY(0)";
    bowl.style.animation="shake 0.5s";
    bowl.style.animationDelay="0.9s"
    bowl.style.animationIterationCount="4";

    // for(var i=0; i<dice.length; i++) {
    //     indexDice[i] = Math.floor(Math.random() * 6);
    // }

    setTimeout(function() {
        dice.forEach(_dice => {
            _dice.src =  "./image/" + imgList[Math.floor(Math.random() * 6)] + ".png";
        });

        // for(var i=0; i<dice.length; i++) {
        //     dice[i].src = "./image/" + imgList[indexDice[i]] + ".png";
        // }
        audioShake.play();
    }, delayMillis);
}
