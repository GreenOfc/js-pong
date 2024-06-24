//BOLINHA
let bolinha_x = 300;
let bolinha_y = 200;
let bolinha_diametro = 23;
let bolinha_raio = bolinha_diametro / 2;

let bolinha_velo_x = 6;
let bolinha_velo_y = 6;

//RAQUETES
let raque_compri = 10;
let raque_altu = 90;


let colidiu = false;

//PLAYER
let player_x = 5;
let player_y = 150;

let player_velo_y = 3;

//ENEMY
let enemy_x = 585;
let enemy_y = 150;

let enemy_velo_y;

let chanceDeErrar = 0;

//SCORE
let player_score = 0;
let enemy_score = 0;

//SONDS
let raquete_sound;
let score_sound;
let background_music;

function preload(){
  background_music = loadSound("trilha.mp3");
  score_sound = loadSound("ponto.mp3");
  raquete_sound = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  background_music.loop();
}

function draw() {
  background(0);
  BolinhaCreate();
  BolinhaMove();
  bolinhaNaoFicaPresa();
  RaqueteCreate(player_x, player_y);
  PlayerMove();
  RaqueteColisão(player_x, player_y);
  RaqueteCreate(enemy_x, enemy_y);
  EnemyMove();
  RaqueteColisão(enemy_x, enemy_y);
  ScoreCreate();
  ScoreManager();
}

function BolinhaCreate(){
   circle(bolinha_x, bolinha_y, bolinha_diametro);
}

function BolinhaMove(){
  bolinha_x += bolinha_velo_x;
  bolinha_y += bolinha_velo_y;
  
  if (bolinha_x + bolinha_raio > width || bolinha_x - bolinha_raio < 0) {
      bolinha_velo_x *= -1;
  }
  
  if (bolinha_y + bolinha_raio > height || bolinha_y - bolinha_raio < 0) {
      bolinha_velo_y *= -1;
  }
}

function RaqueteCreate(x, y){
  rect(x, y, raque_compri, raque_altu);
}

function RaqueteColisão(x,y){
    colidiu = collideRectCircle(x, y, raque_compri, raque_altu, bolinha_x, bolinha_y, bolinha_raio);
    if (colidiu) {
      bolinha_velo_x *= -1;
      raquete_sound.play();
    }
}

function bolinhaNaoFicaPresa(){
    if (bolinha_x - bolinha_raio < 0){
    bolinha_x = 23
    }
}

function PlayerMove(){
  if (keyIsDown(UP_ARROW)) {
    player_y -= player_velo_y;
  }
    if (keyIsDown(DOWN_ARROW)) {
    player_y += player_velo_y;
  }
}

function EnemyMove(){
  enemy_velo_y = bolinha_y - enemy_y - raque_compri / 2 - 30;
  enemy_y += enemy_velo_y + chanceDeErrar;
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (enemy_score >= player_score) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function ScoreCreate(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20)
  fill(255);
  text(player_score, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20)
  fill(255);
  text(enemy_score, 470, 26);
}

function ScoreManager(){
  if(bolinha_x > 590){
    player_score += 1;
    score_sound.play();
  }
  if(bolinha_x < 10){
    enemy_score += 1;
    score_sound.play();
  }
}