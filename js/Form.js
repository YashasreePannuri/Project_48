class Form{
    constructor(){
       this.input = createInput("Name");
       this.button = createButton('Play');
       this.greeting = createElement('h2');
       this.title = createElement('h2');
       this.reset = createButton('Reset');
    }
    hide() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }
    display() {
        this.title.html("FISH GAME");
        this.title.position(200, 50);
        this.title.style('font-size', '70px');
        this.title.style('color', '#b84dff');
        this.input.position(250,260);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'lavender');
        this.button.position(420,375);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'skyblue');
        this.reset.position(670, 30);
        this.reset.style('width', '100px');
        this.reset.style('height', '30px');
        this.reset.style('background', '#ffcce6');

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello " + player.name)
            this.greeting.position(300,300);
            this.greeting.style('color', 'white');
            this.greeting.style('font-size', '70px');
        });


        // Make reset button reset the values in the database
        this.reset.mousePressed(()=> {
            player.updateCount(0);
            game.update(0);
        })
        
        
    }
}