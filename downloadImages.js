const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(process.cwd(), 'public', 'images', 'uiux');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const images = [
    { name: 'portrait.jpg', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60&auto=format' },
    { name: 'id_card.jpg', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=60&auto=format' },
    { name: 'akilo.jpg', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=60&auto=format' },
    { name: 'sanora.jpg', url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=60&auto=format' },
    { name: 'factory_flow.jpg', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=60&auto=format' },
    { name: 'agoda.jpg', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=60&auto=format' },
    { name: 'balancefy.jpg', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=60&auto=format' }
];

async function download(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                https.get(response.headers.location, (res) => {
                    res.pipe(file);
                    file.on('finish', () => { file.close(); resolve(); });
                }).on('error', reject);
            } else {
                response.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            }
        }).on('error', reject);
    });
}

(async () => {
    for (const img of images) {
        const filepath = path.join(dir, img.name);
        await download(img.url, filepath);
        const stats = fs.statSync(filepath);
        console.log(`${img.name} downloaded: ${(stats.size / 1024).toFixed(2)} KB`);
    }
    console.log("All done.");
})();
