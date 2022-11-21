const TITLE = 'test';
console.log(`[${TITLE}] hello world!`);

window.onload = rainbowMatrix;
window.onresize = rainbowMatrix;

function rainbowMatrix() {
    const canvas = document.getElementById('rainbow-background');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const context = canvas.getContext('2d');
    const font = 'arial';
    const fontSize = 10;
    context.font = `${fontSize}px ${font}`;

    const cols = canvas.width / fontSize;

    const charSet = 'B01JD'.split('');

    let drops = [];
    for (let col = 0; col < cols; col++) {
        drops[col] = Math.floor(Math.random() * canvas.height);
    }

    setInterval(() => {
        context.fillStyle = 'rgba(255, 255, 255, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let col = 0; col < drops.length; col++) {
            const char = charSet[Math.floor(Math.random() * charSet.length)];

            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            context.fillStyle = `rgb(${r}, ${g}, ${b})`;
            context.fillText(char, col * fontSize, drops[col] * fontSize);

            if (Math.random() > 0.99) { drops[col] = 0; }
            drops[col]++;
        }
    }, 25);
}
