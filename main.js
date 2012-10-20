enchant();

mushrooms = []

function randomDiscrete(from, to) {
   return Math.floor(Math.random()*(to-from+1)+from);
}

function random(from, to) {
   return Math.random()*(to-from+1)+from;
}

Bear = Class.create(Sprite, {
   initialize: function() {
      Sprite.call(this, 32, 32);
      this.image = game.assets['chara1.png'];
   }
});

PoisonMushroom = Class.create(Sprite, {
   initialize: function() {
      Sprite.call(this, 100, 100);
      this.image = game.assets['Poison_mushroom.gif'];
      this.scaleX = .2;
      this.scaleY = .2;

      var scale = random(.4, 1.0);
      this.scaleX *= scale;
      this.scaleY *= scale;
      this.x = -60;
      this.y = -40;

      if (randomDiscrete(0, 1) == 0.0) {
         this.velX = random(1.0, 5.0);
         this.y = random(-0, 300);
         if (randomDiscrete(0, 1) == 0.0) {
            this.x = -60;
         }
         else {
            this.x = 380;
            this.velX *= -1.0;
         }
      }
      else {
         this.x = random(-0, 300);
         this.velY = random(1.0, 5.0);
         if (randomDiscrete(0, 1) == 0.0) {
            this.y = -40;
         }
         else {
            this.y = 360;
            this.velY *= -1.0;
         }
      }
   },
   onenterframe: function() {
      this.x += this.velX;
      this.y += this.velY;

      if (this.velX > 0.0) {
         if (this.x > 300) {
            var mushroom = new PoisonMushroom()
            mushrooms.push(mushroom);
            game.rootScene.addChild(mushroom);
            game.rootScene.removeChild(this);
         }
      }
      else if (this.velX < 0.0) {
         if (this.x < -60) {
            var mushroom = new PoisonMushroom()
            mushrooms.push(mushroom);
            game.rootScene.addChild(mushroom);
            game.rootScene.removeChild(this);
         }
      }
      else if (this.velY < 0.0) {
         if (this.y < -40) {
            var mushroom = new PoisonMushroom()
            mushrooms.push(mushroom);
            game.rootScene.addChild(mushroom);
            game.rootScene.removeChild(this);
         }
      }
      else if (this.velY > 0.0) {
         if (this.y > 360) {
            var mushroom = new PoisonMushroom()
            mushrooms.push(mushroom);
            game.rootScene.addChild(mushroom);
            game.rootScene.removeChild(this);
         }
      }
   }
});

window.onload = function(){
   game = new Game(320, 320);
   game.fps = 15;
   game.preload("chara1.png");
   game.preload("Poison_mushroom.gif");
   game.onload = function(){
      bear = new Sprite(32, 32);
      bear.image = game.assets["chara1.png"];
      bear.x = 0;
      bear.y = 0;
      bear.frame = 5;
      game.rootScene.addChild(bear);
      bear.addEventListener("enterframe", function(){
         this.x += 1;
         this.frame = this.age % 2 + 6;
      });

      bear.addEventListener("touchstart", function(){
         game.rootScene.removeChild(bear);
      });


      for (var i = 0; i < 8; i++) {
         var mushroom = new PoisonMushroom();
         game.rootScene.addChild(mushroom);
         mushrooms.push(mushroom);
      }
   };

   game.start();
};
