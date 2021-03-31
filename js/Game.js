class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player1_img);
        player1.scale = 0.457
        
        player2 = createSprite(800,500);
        player2.addImage("player2", player2_img);
        player2.scale = 0.07
        players=[player1,player2];
    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 800, 600);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            if(index === player.index){   
                fill(77, 0, 77);
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25); 
            }
           
            // Add code to diplay the scores of both 
            // the players on the screen
            
            textSize(25);
            fill("white");
            text("Player 1:"+allPlayers.player1.score,50,50);
            text("Player 2:"+allPlayers.player2.score,50,100)



        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
    
        if (frameCount % 20 === 0) {
            fishFood = createSprite(random(100, 800), 0, 100, 100);
            fishFood.addImage(fishFood_img)
            fishFood.scale = 0.15
            fishFood.velocityY = 6;
            foodGroup.add(fishFood);
            
        }

        if (frameCount % 70 === 0) {
            shark = createSprite(random(100, 800), 0, 100, 100);
            shark.addImage(shark_img)
            shark.scale = 0.15
            shark.velocityY = 6+frameCount/100;
            sharkGroup.add(shark);
            
        }

        // Add code to destroy fruits, calculate scores and
        // update the scores to the database
        if(player.index !== null){
                for(var i = 0; i < foodGroup.length; i++){
                    if(foodGroup.get(i).isTouching(players)){
                        foodGroup.get(i).destroy();
                        player.score = player.score+5;
                        //player.scale = player.scale+0.5
                        player.update();
                    }
                }
                for(var i = 0; i < sharkGroup.length; i++){
                    if(sharkGroup.get(i).isTouching(players)){ //
                        sharkGroup.get(i).destroy();  //
                        //gameState=2
                        // player.score = player.score-10;
                        player.scale = player.scale-1
                        player.update();
                    }
                }
            }
 


        // Add code for game end condition
        if(player.score >= 100 ){ //|| sharkGroup.collide(players)
            this.end()
        }


    }

    end(){

       // Add code to update game state and display Game Over
       game.update(2)
       clear();
       fill(179, 102, 255);
       textSize(60);
       textFont("Courier New")
       text("Game Over", 350, 300)
       if(player.score>=100){
           text("You Win !", 350, 350)
       }else{
           text("You Lost :(", 350, 350)
       }
       

       
    }
}