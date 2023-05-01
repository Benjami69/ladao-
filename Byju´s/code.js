var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

createEdgeSprites();
var ladrao = createSprite(25,375,15,15) ; 
ladrao.shapeColor = "black";
var laser1 = createSprite(100,300,200,5) ;
laser1.shapeColor = "red";
laser1.velocityX = 5 ;
var laser2 = createSprite(200,100,200,5) ;
laser2.shapeColor = "red" ;
laser2.velocityX = 5;
var diamante = createSprite(390,10,10,10);
diamante.shapeColor = "lightblue";

function draw() {
  background("gray");
  
laser1.bounceOff(rightEdge);
laser1.bounceOff(leftEdge);
laser2.bounceOff(rightEdge);
laser2.bounceOff(leftEdge);
ladrao.bounceOff(topEdge);
ladrao.bounceOff(bottomEdge);
ladrao.bounceOff(leftEdge);
ladrao.bounceOff(rightEdge);

if (laser1.isTouching(ladrao)  || laser2.isTouching(ladrao)){
  stroke(0);
  fill(0);
  textSize(24);
  text("Ladrao foi pego",120,200);
  laser1.setVelocity(0,0);
  laser2.setVelocity(0,0);
  ladrao.setVelocity(0,0);
 
}

if (diamante.isTouching(ladrao)){
 stroke(0);
 fill(0);
 textSize(24);
   text("Voce venceu",120,200);
  laser1.setVelocity(0,0);
  laser2.setVelocity(0,0);
  ladrao.setVelocity(0,0);

}
  if(keyDown(RIGHT_ARROW)){
  ladrao.velocityX = 2;
  ladrao.velocityY = 0;
  }
   if(keyDown(LEFT_ARROW)){
  ladrao.velocityX = -2;
  ladrao.velocityY = 0;
   }
   if(keyDown(UP_ARROW)){
  ladrao.velocityX = 0;
  ladrao.velocityY = -2;
   }
   if(keyDown(DOWN_ARROW)){
  ladrao.velocityX = 0;
  ladrao.velocityY = 2;
   }

  if(keyDown("space")){
  laser1.velocityX = 5;
  laser1.velocityY = 0;
  
  laser2.velocityX = 5;
  laser2.velocityY = 0;
  ladrao.x = 25;
  ladrao.y = 375; 
  }
  drawSprites();



}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
