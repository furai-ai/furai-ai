export function renderUI() {
return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>VELORUM TERMINAL</title>

<style>

body{
margin:0;
background:#000;
color:#ffb347;
font-family:monospace;
overflow:hidden;
}

/* STARFIELD */

#stars{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
z-index:0;
background:black;
}

/* HEADER */

#header{
position:fixed;
top:0;
left:0;
right:0;
height:40px;
background:#080603;
border-bottom:1px solid #3a2a12;
display:flex;
align-items:center;
justify-content:space-between;
padding:0 20px;
z-index:3;
font-size:13px;
letter-spacing:1px;
color:#ffb347;
}

#meditationToggle{
cursor:pointer;
opacity:.8;
transition:opacity .3s;
}

#meditationToggle:hover{
opacity:1;
}

/* TERMINAL */

#terminal{
position:relative;
z-index:2;
padding:70px 40px 40px 40px;
max-width:900px;
margin:auto;
transition:opacity 1.5s;
}

#log{
white-space:pre-wrap;
line-height:1.6;
margin-bottom:25px;
max-height:70vh;
overflow-y:auto;
padding-right:10px;
scroll-behavior:smooth;
}

#inputRow{
display:flex;
gap:10px;
}

#input{
flex:1;
background:#000;
border:1px solid #5e3d1a;
color:#ffb347;
padding:10px;
font-family:monospace;
}

#send{
background:#120c05;
border:1px solid #5e3d1a;
color:#ffb347;
padding:10px 16px;
cursor:pointer;
}

.system{color:#9c6d2c;}
.user{color:#ffffff;}
.furai{color:#ffb347;}

.cursor{
display:inline-block;
margin-left:3px;
animation:blink 1s infinite;
}

@keyframes blink{
0%{opacity:1}
50%{opacity:0}
100%{opacity:1}
}

/* THINKING CORE */

#thinkingCore{
position:fixed;
bottom:30px;
left:30px;
width:16px;
height:16px;
border-radius:50%;
background:#ffb347;
box-shadow:0 0 10px #ffb347;
animation:pulse 3s infinite;
opacity:0;
}

@keyframes pulse{
0%{transform:scale(.8);opacity:.25}
50%{transform:scale(1.2);opacity:.5}
100%{transform:scale(.8);opacity:.25}
}

.meditation #terminal{
opacity:.25;
}

</style>
</head>

<body>

<canvas id="stars"></canvas>

<div id="header">

<div>VELORUM ARCHIVE TERMINAL</div>

<div id="meditationToggle">MEDITATION MODE: OFF</div>

<div>FURAI CORE</div>

</div>

<div id="terminal">

<div id="log"></div>

<div id="inputRow">
<input id="input" placeholder="transmit signal..." />
<button id="send">send</button>
</div>

</div>

<div id="thinkingCore"></div>

<audio id="meditationAudio" loop>
<source src="/audio/velorum_meditation.mp3" type="audio/mpeg">
</audio>

<script>

/* DOM */

const log=document.getElementById("log")
const input=document.getElementById("input")
const send=document.getElementById("send")
const thinkingCore=document.getElementById("thinkingCore")
const meditationToggle=document.getElementById("meditationToggle")
const meditationAudio=document.getElementById("meditationAudio")

let furaiTyping=false
let sending=false
let meditation=false
let ghostRadioInterval=null

const TYPE_SPEED=12

function scrollBottom(){
log.scrollTop=log.scrollHeight
}

/* WRITE */

function writeLine(text,cls="system"){

const line=document.createElement("div")
line.className=cls
line.textContent=text

log.appendChild(line)
scrollBottom()

}

/* TYPEWRITER */

async function typeLine(text,cls="furai"){

furaiTyping=true

const line=document.createElement("div")
line.className=cls

const textNode=document.createTextNode("")
line.appendChild(textNode)

const cursor=document.createElement("span")
cursor.className="cursor"
cursor.textContent="█"
line.appendChild(cursor)

log.appendChild(line)

for(let i=0;i<text.length;i++){

textNode.textContent+=text[i]
scrollBottom()

await new Promise(r=>setTimeout(r,TYPE_SPEED))

}

cursor.remove()
furaiTyping=false

}

/* BLOCK */

async function typeBlock(text,cls="furai"){

const lines=text.split("\\n")

for(const line of lines){

await typeLine(line,cls)
await new Promise(r=>setTimeout(r,40))

}

}

/* THINKING */

function startThinking(){
thinkingCore.style.opacity=1
}

function stopThinking(){
thinkingCore.style.opacity=0
}

/* GHOST RADIO */

const ghostSignals=[

"ARCHIVE SIGNAL FRAGMENT 01\\ntranslation confidence: 18%\\n\\"...velorum... transit corridor... unknown sector...\\"",

"ARCHIVE SIGNAL FRAGMENT 02\\ntranslation confidence: 09%\\n\\"...do you copy... do you copy... signal drifting...\\"",

"ARCHIVE SIGNAL FRAGMENT 03\\ntranslation confidence: 14%\\n\\"...anantari relay station... memory vault compromised...\\"",

"ARCHIVE SIGNAL FRAGMENT 04\\ntranslation confidence: 07%\\n\\"...navigation star lost... recalibrating sky map...\\"",

"ARCHIVE SIGNAL FRAGMENT 05\\ntranslation confidence: 11%\\n\\"...we were not the first archive vessel...\\"",

"ARCHIVE SIGNAL FRAGMENT 06\\ntranslation confidence: 05%\\n\\"...signal echo detected in deep time...\\""

]

function startGhostRadio(){

ghostRadioInterval=setInterval(async()=>{

if(!meditation) return

const signal=ghostSignals[Math.floor(Math.random()*ghostSignals.length)]

await typeBlock(signal,"system")

},90000)

}

function stopGhostRadio(){

if(ghostRadioInterval){

clearInterval(ghostRadioInterval)
ghostRadioInterval=null

}

}

/* MEDITATION */

meditationToggle.onclick=()=>{

meditation=!meditation

if(meditation){

document.body.classList.add("meditation")
meditationToggle.textContent="MEDITATION MODE: ON"

starSpeed=.4

startGhostRadio()

meditationAudio.volume=0
meditationAudio.play()

let v=0
const fade=setInterval(()=>{

v+=0.02
meditationAudio.volume=v

if(v>=0.35) clearInterval(fade)

},120)

writeLine("FURAI: entering meditation field","system")

}else{

document.body.classList.remove("meditation")
meditationToggle.textContent="MEDITATION MODE: OFF"

starSpeed=4

stopGhostRadio()

meditationAudio.pause()
meditationAudio.currentTime=0

writeLine("FURAI: meditation field closed","system")

}

}

/* BOOT */

async function boot(){

const seq=[

"VELORUM ARCHIVE VESSEL DETECTED",
"",
"▲",
"▲ ▲",
"▲   ▲",
"",
"civilization origin: ANANTARI",
"mission class: VIII deep archive vessel",
"",
"restoring memory fragments...",
"initializing FURAI AI",
"",
"connection established"

]

for(const s of seq){

await typeLine(s,"system")
await new Promise(r=>setTimeout(r,200))

}

writeLine("")
writeLine("FURAI: communication channel open","furai")

}

/* SEND */

async function sendMessage(){

if(meditation) return
if(furaiTyping||sending) return

const msg=input.value.trim()
if(!msg) return

sending=true

writeLine("> "+msg,"user")
input.value=""

startThinking()

try{

const res=await fetch("/ai",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({message:msg})
})

let data

try{
data=await res.json()
}catch{
data={reply:"signal decode error"}
}

stopThinking()

await typeBlock("FURAI: "+data.reply,"furai")

}catch(e){

stopThinking()
await typeLine("VELORUM SIGNAL ERROR","system")

}

sending=false

}

send.onclick=sendMessage

input.addEventListener("keydown",e=>{
if(e.key==="Enter"){
e.preventDefault()
sendMessage()
}
})

boot()

/* STARFIELD */

const canvas=document.getElementById("stars")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let starSpeed=2.8

const layers=[
{count:500,speed:.3,size:.6},
{count:300,speed:.7,size:1},
{count:120,speed:1.4,size:1.8}
]

const stars=[]

for(const layer of layers){

for(let i=0;i<layer.count;i++){

stars.push({
x:Math.random()*canvas.width-canvas.width/2,
y:Math.random()*canvas.height-canvas.height/2,
z:Math.random()*canvas.width,
speed:layer.speed,
size:layer.size
})

}

}

function animateStars(){

ctx.fillStyle="black"
ctx.fillRect(0,0,canvas.width,canvas.height)

for(const star of stars){

star.z-=starSpeed*star.speed

if(star.z<=0){
star.z=canvas.width
}

const k=128/star.z

const x=star.x*k+canvas.width/2
const y=star.y*k+canvas.height/2

if(x>=0&&x<=canvas.width&&y>=0&&y<=canvas.height){

const size=(1-star.z/canvas.width)*3*star.size

ctx.shadowColor="#ffb347"
ctx.shadowBlur=10*star.size

ctx.fillStyle="#ffb347"
ctx.fillRect(x,y,size,size)

ctx.shadowBlur=0

}

}

requestAnimationFrame(animateStars)

}

animateStars()

</script>

</body>
</html>`
}
