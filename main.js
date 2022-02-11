song="";
leftWristX =0;
rightWristX =0;
leftWristY =0;
rightWristY =0;
scoreleftwrist=0;
scorerightwrist=0;
counter=0;
function preload() 
{
    
    song = loadSound("music4.mp3");
    
    if(counter==1)
    {
        song= loadSound("music1.mp3");
    }
    else if(counter==2)
    {
        song= loadSound("music2.mp3");
    }
    else if(counter==3)
    {
        song= loadSound("music3.mp3");
    }
    else if(counter==4)
    {
        song= loadSound("music.mp3");
    }
}

function setup() 
{
    canvas=createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded); 
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("poseNet is loaded");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;

        console.log("scorerightWrist= "+scorerightwrist+" scoreleftWrist"+scoreleftwrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        console.log("leftwristX =" + leftWristX + ", leftwristY =" + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log("rightWristX =" + rightWristX + ", rightWristY =" + rightWristY);
    }
} 
function draw() 
{
    image(video,0,0,600,500);
    
    fill("#FF0000");
    stroke("#FF000");

    if(scorerightwrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
    if(rightWristY >0 && rightWristY <=100)
    {
        document.getElementById("speed").innerHTML="speed = 0.5";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <=200)
    {
        document.getElementById("speed").innerHTML="speed =1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML="speed =1.5";
        song.rate(1.5);
    }
    else if(rightWristY > 200 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML="speed =2x";
        song.rate(2);
    }
    else if(rightWristY >400)
    {
        document.getElementById("speed").innerHTML="speed =2x";
        song.rate(2.5);
    }
 }
 if(scoreleftwrist > 0.2)
 {
 circle(leftWristX,leftWristY,20);
    InNumberleftwristY=Number(leftWristY);
    remove_decimal=floor(InNumberleftwristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume="+volume;
    song.setVolume(volume);
 }  
}

function play() 
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function stop() 
{
    song.stop();
}

function next() 
{
    counter++;
    
}
