var enxame = [];
var perseguir = true;
var tempoNovaAbelha = 0;

var sorteNumeroDeAbelhas; 

function setup() {
 createCanvas(windowWidth, windowHeight);
 
 sorteNumeroDeAbelhas = random(0, 100);//sorteamos um valor qualquer de 0 a 100.
 
 //Isso serve para começar o programa com poucas ou muitas abelhas, cada vez que inicia.
 if(sorteNumeroDeAbelhas > 0 && sorteNumeroDeAbelhas < 33){
   sorteNumeroDeAbelhas = random(2,10); 
 }else if(sorteNumeroDeAbelhas > 33 && sorteNumeroDeAbelhas < 66){
   sorteNumeroDeAbelhas = random(10,100); 
 }else if(sorteNumeroDeAbelhas > 66 && sorteNumeroDeAbelhas < 100){
   sorteNumeroDeAbelhas = random(66,1000); 
 }
 
 //Criamos o enxame de abelhas com o numero maximo estabelecido pela sorte.
 for(var i = 0; i < sorteNumeroDeAbelhas; i++){
   enxame.push(new Abelha(random(50, windowWidth), random(50, windowHeight)));
 }
}

function draw() {
  background(51);
  
  //Vincula as abelhas tendo como alvo o mouse.
  var target = createVector(mouseX, mouseY);
  
  //Executa os metodos para todas as abelhas.
  for(var count = 0; count < enxame.length; count++){
    enxame[count].seek(target);     
    enxame[count].update();
    enxame[count].display();
  }
  
 //Cria novas abelhas a cada tanto tempo
  if(tempoNovaAbelha == 100){
    enxame.push(new Abelha(random(50, width), random(50, height)));
    tempoNovaAbelha = 0;
  }  
  tempoNovaAbelha++;
  
  //Atualiza as abelhas sobre perseguir ou não o mouse.
   if(!perseguir){
     fill(0, 100, 255);
      for(var c = 0; c < enxame.length; c++){
        enxame[c].maxforce = 0.2;
     }
    }else{      
      fill(255, 0, 50);
      for(var c = 0; c < enxame.length; c++){
        enxame[c].maxforce = -0.02;
      }
    }
    
    //Mostra uma abelha menor 
    ellipse(mouseX, mouseY, 30, 30);
}

function Abelha(x, y, m){
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 5;
  this.maxforce = 0.2;
  
  this.seek = function(target){ //A função Busca
    
    //Aqui é criado um novo vetor formado pela subtração do vetor target pelo vetor this.pos
    var desired = p5.Vector.sub(target, this.pos); 
    desired.setMag(this.maxspeed); //Calcula o tamanho 
    
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce); //Limita o vetor steering ao valor maximo fornecido.
    
    this.applyForce(steering); //Aplica a força de perseguição.   
  }
  
  this.applyForce = function(force){
    this.acc.add(force); 
  }
  
  this.update = function(){
   this.vel.add(this.acc);
   this.vel.limit(this.maxspeed);
   this.pos.add(this.vel);
   this.acc.set(0, 0);
  }
  
  this.display = function(){
   fill(255, 0, 50, 50);
   stroke(255);
   ellipse(this.pos.x, this.pos.y, 50, 50);
  }  
}

//Mata abelha de uma a uma ao precionar a barra de espaço.
function keyPressed(){
  if(key == ' '){
    enxame.splice(0, 1); 
  }
}


//Ao pressionar o mouse a abelha vai atras do mouse ou foge dele.
function mousePressed(){  
    if(!perseguir){
      for(var c = 0; c < enxame.length; c++){
        enxame[c].maxforce = 0.2;
        perseguir = true;
     }
    }else{
      for(var c = 0; c < enxame.length; c++){
        enxame[c].maxforce = -0.02;
        perseguir = false;
      }
    }  
}
