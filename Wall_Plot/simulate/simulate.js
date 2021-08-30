let bg;
let bot_fg;
let res;
let bot;
let can;
let can2;
let speed;
let skip = 1;
let magic = true;
let delay_time = 1;

function preload(){  
bg = loadImage("https://images.unsplash.com/photo-1531685250784-7569952593d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80.png");
bot_fg = loadImage("https://iili.io/RVYC1S.png");
}
//https://iili.io/RVYC1S.png
function setup() {
  
  can = createCanvas(wdth,higt);
  can2 = createGraphics(width,height);
  
  can.parent("#canvas");
  speed = select(".res");
  
  bot = new BOT(bot_wd,bot_ht,20);
  
  bg.resize(width,height);
  can2.image(bg,0,0);
  
  progress();
  
  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function progress(){
  
  can2.stroke(0);
  
  can2.fill(0);
  can2.circle(0,0,40);
  can2.circle(width,0,40);
  
  for(let i=0; i<points.length ; i++){
    
    await bot.move(points[i][0][0],points[i][0][1]);
    bot.pen_act();
    
    for(let j=skip; j<points[i].length;j += skip){
      
      res = map(speed.value(),1,300,150,1);
      background(0);
      image(can2,0,0);
      
      await bot.move(points[i][j][0],points[i][j][1]);
      can2.line(points[i][j-skip][0],points[i][j-skip][1],points[i][j][0],points[i][j][1]);
      image(bg,0,0);
    }
    
    bot.pen_act();
    
    if(i < points.length-1){
      
      await bot.move(points[i+1][0][0],points[i+1][0][1]);
      
    }
    else{   
    
      bot.move(width-bot.wd/2,bot.ht/2.6);
    }
  }
}
