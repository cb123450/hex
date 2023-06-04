const canvas = document.getElementById('gameArea');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

ctx.fillStyle = "brown";
ctx.fillRect(0,0, width, height);