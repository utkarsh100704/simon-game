var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var i = 1;
function nextSequence(){
    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    detector1(randomChosenColor);
    $("h1").html("Level " + i);
    i++;
}

keypress1();



function press(buttonPressed){
    $(buttonPressed).addClass("pressed");
    setTimeout(function(){
    $(buttonPressed).removeClass("pressed");
    },100);
}
function keypress1(){
    $("html").on("keypress", function(){
        setTimeout(function(){
          nextSequence();  
        },500);
        userClickedPattern=[];
        $("html").off("keypress");
    });
}



$(".btn").on("click", function(){
    var userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    detector1(userChosenColor)
    if(userClickedPattern.length===(i-1)){
        checkAnswer(i);
    }
})





function detector1(kp){
    switch(kp){
        case "red":
            press(".red");
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;
        case "blue":
            press(".blue");
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            press(".green");
            var green = new Audio("./sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            press(".yellow");
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;                              
    }
}




function checkAnswer(currnetLevel){
    for(var j = 0; j<currnetLevel-1;j++){
        if(gamePattern[j]===userClickedPattern[j]){
            if(j===currnetLevel-2){
                userClickedPattern=[];
                setTimeout(function(){
                    nextSequence()
                },1000)
            }
            else{
                continue;
            }
        }

        else {
            userClickedPattern=[];
            gamePattern=[];
            i=1;
            setTimeout(function(){
                var wrong = new Audio("./sounds/wrong.mp3")
                wrong.play();
                $("h1").html("Game Over, Press Any Key to Try Again");
                wrongbc();
                keypress1();
            },500)
            break;
        }
    }
}



function wrongbc(){
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    },200);
}