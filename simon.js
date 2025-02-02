var buttonColours=["redbtn","greenbtn","yellowbtn","bluebtn"];

var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function()
{
    if(!started)
    {
        $(".title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function()
{
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);  
})

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(gamePattern.length===userClickedPattern.length)//Check if the user has completed the entire sequence
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
        else
        {
            playSound("wrong");
            $("body").addClass("game-over");
            $(".title").text("Game Over, Press Any Key to Restart");

            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
}

function nextSequence()
{
    userClickedPattern = [];//reset pattern for new level
    level++;
    $(".title").text("Level " + level).fadeIn(100);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#"+randomChosenColour+"btn").fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(currentColour)
{
    var aud=new Audio(currentColour+'.mp3');
aud.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function()
{
    $("#"+currentColor).removeClass("pressed");
},100);
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}