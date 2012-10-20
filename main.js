enchant();

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

window.onload = function() {
   game = new Game(320, 320);
   game.fps = 15;
   game.preload("chara1.png");
   game.onload = function() {
      bear = new Bear(0, 0, 0);
      game.rootScene.addChild(bear);

      bear2 = new Bear(16, 16, 5);
      bear2.setSpeed(16);
      game.rootScene.addChild(bear2);
      game.rootScene.addEventListener('touchend', function(e) {
         bear.setTx(e.x);
         bear.setTy(e.y);
      });
   };

   game.start();
};
