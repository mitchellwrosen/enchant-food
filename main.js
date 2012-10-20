enchant();

mushrooms = []
bananas = []

function randomDiscrete(from, to) {
   return Math.floor(Math.random()*(to-from+1)+from);
}

function random(from, to) {
   return Math.random()*(to-from+1)+from;
}

Bear = Class.create(Sprite, {
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

GoodBear = Class.create(Bear, {
   initialize: function(x, y) {
      Sprite.call(this, 32, 32);
      this.image = game.assets['chara1.png'];
      this.x = x;
      this.y = y;
      this.tx = x;
      this.ty = y;
      this.frame = 0;
      this.frameOffset = 0;
      this.speed = 10;
   },
   onenterframe: function() {
      // Move.
      if (this.x < this.tx)
         this.x += this.speed > this.tx - this.x ? this.tx - this.x : this.speed;
      else if (this.x > this.tx)
         this.x -= this.speed > this.x - this.tx ? this.x - this.tx : this.speed;
      if (this.y < this.ty)
         this.y += this.speed > this.ty - this.y ? this.ty - this.y : this.speed;
      else if (this.y > this.ty)
         this.y -= this.speed > this.y - this.ty ? this.y - this.ty : this.speed;
      this.frame = this.age%2;

      // Check for banana collision.
      for (var i = 0; i < bananas.length; i++) {
         if (this.intersect(bananas[i]))
            game.rootScene.removeChild(bananas[i]);
      }
   },
});

BadBear = Class.create(Bear, {
   initialize: function(x, y, goodBear) {
      Sprite.call(this, 32, 32);
      this.image = game.assets['chara1.png'];
      this.x = x;
      this.y = y;
      this.tx = x;
      this.ty = y;
      this.frame = 5;
      this.frameOffset = 5;
      this.speed = 1;
      this.goodBear = goodBear;
   },
   onenterframe: function() {
      // Move.
      if (this.x < this.goodBear.x)
         this.x += this.speed > this.goodBear.x - this.x ? this.goodBear.x - this.x : this.speed;
      else if (this.x > this.goodBear.x)
         this.x -= this.speed > this.x - this.goodBear.x ? this.x - this.goodBear.x : this.speed;
      if (this.y < this.goodBear.y)
         this.y += this.speed > this.goodBear.y - this.y ? this.goodBear.y - this.y : this.speed;
      else if (this.y > this.goodBear.y)
         this.y -= this.speed > this.y - this.goodBear.y ? this.y - this.goodBear.y : this.speed;

      if (Math.abs(this.x - this.goodBear.x) < 40)
         this.frame = this.frameOffset + 2;
      else
         this.frame = this.age%2 + this.frameOffset;

      // Check for banana collision.
      for (var i = 0; i < bananas.length; i++) {
         if (this.intersect(bananas[i]))
            game.rootScene.removeChild(bananas[i]);
      }
   },
});

Banana = Class.create(Sprite, {
   initialize: function() {
      Sprite.call(this, 32, 30);
      this.image = game.assets['banana.png'];
      this.scaleX = .5;
      this.scaleY = .5;

      this.scale = random(.4, 1.0);
      this.scaleX *= this.scale;
      this.scaleY *= this.scale;
      this.x = -60;
      this.y = -40;

      if (randomDiscrete(0, 1) == 0.0) {
         this.velX = random(1.0, 5.0);
         this.y = random(-0, game.width - 20);
         if (randomDiscrete(0, 1) == 0.0) {
            this.x = -60;
         }
         else {
            this.x = game.width + 60;
            this.velX *= -1.0;
         }
      }
      else {
         this.x = random(-0, game.width - 20);
         this.velY = random(1.0, 5.0);
         if (randomDiscrete(0, 1) == 0.0) {
            this.y = -40;
         }
         else {
            this.y = game.width + 40;
            this.velY *= -1.0;
         }
      }
   },
   onenterframe: function() {
      this.x += this.velX;
      this.y += this.velY;

      if (this.velX > 0.0) {
         if (this.x > game.width - 20) {
         }
      }
      else if (this.velX < 0.0) {
         if (this.x < -60) {
            var banana = new Banana()
            bananas.push(banana);
            game.rootScene.addChild(banana);
            game.rootScene.removeChild(this);
         }
      }
      else if (this.velY < 0.0) {
         if (this.y < -40) {
            var banana = new Banana()
            bananas.push(banana);
            game.rootScene.addChild(banana);
            game.rootScene.removeChild(this);
         }
      }
      else if (this.velY > 0.0) {
         if (this.y > game.width + 40) {
            var banana = new Banana()
            bananas.push(banana);
            game.rootScene.addChild(banana);
            game.rootScene.removeChild(this);
         }
      }
   }
});

PoisonMushroom = Class.create(Sprite, {
   initialize: function() {
      Sprite.call(this, 100, 100);
      this.image = game.assets['Poison_mushroom.gif'];
      this.scaleX = .2;
      this.scaleY = .2;

      this.scale = random(.4, 1.0);
      this.scaleX *= this.scale;
      this.scaleY *= this.scale;
      this.x = -60;
      this.y = -40;

      if (randomDiscrete(0, 1) == 0.0) {
         this.velX = random(1.0, 5.0);
         this.y = random(-0, game.width - 20);
         if (randomDiscrete(0, 1) == 0.0) {
            this.x = -60;
         }
         else {
            this.x = game.width + 60;
            this.velX *= -1.0;
         }
      }
      else {
         this.x = random(-0, game.width - 20);
         this.velY = random(1.0, 5.0);
         if (randomDiscrete(0, 1) == 0.0) {
            this.y = -40;
         }
         else {
            this.y = game.width + 40;
            this.velY *= -1.0;
         }
      }
   },
   onenterframe: function() {
      this.x += this.velX;
      this.y += this.velY;

      if (this.velX > 0.0) {
         if (this.x > game.width - 20) {
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
         if (this.y > game.width + 40) {
            var mushroom = new PoisonMushroom()
            mushrooms.push(mushroom);
            game.rootScene.addChild(mushroom);
            game.rootScene.removeChild(this);
         }
      }
   }
});

window.onload = function() {
   game = new Game(640, 640);
   game.fps = 15;
   game.preload("chara1.png");
   game.preload("Poison_mushroom.gif");
   game.preload("banana.png");
   game.onload = function(){
      bear = new Sprite(32, 32);
      bear = new GoodBear(game.width/2, game.height/2);
      game.rootScene.addChild(bear);

      bear2 = new BadBear(160, 160, bear);
      game.rootScene.addChild(bear2);
      for (var i = 0; i < 8; i++) {
         var banana = new Banana();
         game.rootScene.addChild(banana);
         bananas.push(banana);
      }
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
