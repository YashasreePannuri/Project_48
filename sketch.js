var database;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player, form, game;
var player1,player2;
var players;
var fishFood;
var foodGroup;
var shark;
var sharkGroup;
var back_img;
var player1_img, player2_img;
var fishFood_img;
var shark_img;
var collion_snd;
var player1score =0;
var player2score =0;

function preload(){
  back_img = loadImage("background.jpg");
  player1_img = loadImage("Fish1.png");
  player2_img = loadImage("Fish2.png");
  fishFood_img = loadImage("fishfood.png");
  shark_img = loadImage("shark.png")
  collision_sound = loadSound("collisionSound.wav")
  
}

function setup() {
  createCanvas(800,600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  foodGroup = new Group();
  sharkGroup = new Group();
}

function draw() {
  background(255,255,255);  
  //drawSprites();
  background(back_img);
  if (gameState === 1) {
    clear(); 
    game.play();
  }
  if (gameState === 2) {
    game.end();
  }
  if (playerCount === 2 && gameState != 2) {
    game.update(1);
  }
}