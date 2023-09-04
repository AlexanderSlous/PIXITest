const Application = PIXI.Application;

const app = new Application(
    {
        width: 500,
        height: 500,
        backgroundColor:0x23395D,
        transparent: false,
        antialias: true
    }
);

//app.renderer.backgroundColor = 0x23395D;

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

//rectangle

const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
.lineStyle(4, 0xFFEA00, 1)
.drawRect(200, 200, 100, 120)
.endFill();

//circle

const circle = new Graphics();
circle.beginFill(0xFF66FF)
.drawCircle(0, 0, 60)
.endFill();

//line

const line = new Graphics();
line.lineStyle(5, 0xFFEA00, 1)
.moveTo(1500, 100)
.lineTo(1500, 800);

//text font

const style = new PIXI.TextStyle(
{
    fontFamily: 'Monsterrat',
    fontSize: 48,
    fill: 'deepskyblue'
})

//POV text

const myText1 = new PIXI.Text('POV', style);
myText1.style.align = 'center';
myText1.x = 100;

//START text

const myText2 = new PIXI.Text('START', style);
myText2.style.align = 'center';
myText2.y = 750;
//Setting the center so the rotation doesn't look weird
myText2.anchor.set = (0.5, 0.5);

//loop creation + START text movement

app.ticker.add(delta => loop(delta));

function loop(delta) 
{
    myText2.x += 2;
    myText2.rotation += 0.05;
}

//image

const Sprite1 = PIXI.Sprite.from('./images/test.jpg');

Sprite1.scale.set(0.5, 0.5);
Sprite1.y = 50;

//adding elements to scene

app.stage.addChild(rectangle);
app.stage.addChild(circle);
//app.stage.addChild(line);
app.stage.addChild(myText1);
app.stage.addChild(myText2);
app.stage.addChild(Sprite1);

//input events

Sprite1.interactive = true;
app.stage.interactive = true;

//Makes image bigger whenever you click on it
Sprite1.on('pointerdown', function()
{
    Sprite1.scale.x += 0.1;
    Sprite1.scale.y += 0.1;
})

//Moves circle to mouse
app.stage.on('pointermove', moveCircle);
app.ticker.add(moveCircle => loop(moveCircle));

function moveCircle(e)
{
    let pos = e.data.global;

    circle.x = pos.x;
    circle.y = pos.y;
}