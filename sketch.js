var dogSit
var dogEat
var dogSprite
var database
var foodCount
function preload()
{
dogSit = loadImage("images/dogImg.png")
dogEat = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(800, 800);
  database = firebase.database()
  dogSprite = createSprite(400,400,20,20)
  dogSprite.addImage(dogSit)
  dogSprite.scale = 0.5
  var foodValue = database.ref('Food/Count')
  foodValue.on("value",read,error)
}


function draw() {  
background("lightGreen")
text("Remaining Food : "+ foodCount,100,400)
  drawSprites();
if (keyDown(UP_ARROW)){
  update();
  dogSprite.addImage(dogEat)
}
if (keyWentUp(UP_ARROW)){
  dogSprite.addImage(dogSit)
}
}
function read(data)
{
 foodCount = data.val() 
 console.log(foodCount)
}
function error()
{
  console.log("weeeeee")
}
function update()
{
  database.ref('Food').set({
    'Count': foodCount -1
  })
}