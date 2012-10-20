enchant();

mushrooms = []

function randomDiscrete(from, to) {
   return Math.floor(Math.random()*(to-from+1)+from);
}

function random(from, to) {
   return Math.random()*(to-from+1)+from;
}

Bear = Class.create(Sprite, {
   initialize: function(x, y, frameOffset) {
      Sprite.call(this, 32, 32);
      this.image = game.assets['chara1.png'];
      this.x = x;
      this.y = y;
      this.tx = x;
      this.ty = y;
      this.frame = frameOffset;
      this.frameOffset = frameOffset;

      // Movement variables.
      this.speed = 10;
      this.isMoving = false;
      this.vx = 0;
      this.vy = 0;
   },
   onenterframe: function() {
      if (this.x < this.tx)
         this.x += this.speed > this.tx - this.x ? this.tx - this.x : this.speed;
      else if (this.x > this.tx)
         this.x -= this.speed > this.x - this.tx ? this.x - this.tx : this.speed;
      if (this.y < this.ty)
         this.y += this.speed > this.ty - this.y ? this.ty - this.y : this.speed;
      else if (this.y > this.ty)
         this.y -= this.speed > this.y - this.ty ? this.y - this.ty : this.speed;
   },
   setSpeed: function(speed) {
      this.speed = speed;
   },
   speedUp: function() {
      this.speed += 1;
   },
   setTx: function(tx) {
      this.tx = tx - 16;
   },
   setTy: function(ty) {
      this.ty = ty - 16;
   },
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

window.onload = function() {
   game = new Game(320, 320);
   game.fps = 15;
   game.preload("chara1.png");
   game.preload("Poison_mushroom.gif");
   game.onload = function() {
      bear = new Sprite(32, 32);
      bear = new Bear(0, 0, 0);
      game.rootScene.addChild(bear);

      bear2 = new Bear(16, 16, 5);
      bear2.setSpeed(16);
      game.rootScene.addChild(bear2);
      for (var i = 0; i < 8; i++) {
         var mushroom = new PoisonMushroom();
         game.rootScene.addChild(mushroom);
         mushrooms.push(mushroom);
      }

      game.rootScene.addEventListener('touchmove', function(e) {
         bear.setTx(e.x);
         bear.setTy(e.y);
      });

   };
   game.start();
}
