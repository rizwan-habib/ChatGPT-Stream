const http = require('http');
const text = `Terry Davis was an American computer programmer who created an operating system called "TempleOS," which he claimed was a divine inspiration. While the exact reasons for his mental health struggles are not entirely clear, it is known that Davis had a history of mental illness, including bipolar disorder. Davis's behavior became increasingly erratic and delusional over time, and he developed a reputation for making offensive and inflammatory remarks online. He also became fixated on the idea that the CIA was after him and believed that he was under constant surveillance. Despite his struggles with mental health, Davis continued to work on TempleOS and gained a following within the programming community. Tragically, he passed away in 2018 after being hit by a train. It is essential to approach this topic with sensitivity and understanding of the challenges that individuals with mental health issues face. It is not uncommon for people with severe mental health struggles to experience delusions, hallucinations, and other symptoms that can be challenging to manage.`;

const wordArray = text.split(/\s+/);

let i = 0;
console.log(wordArray);
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send a response every second
    const interval = setInterval(() => {
        res.write(wordArray[i++] +' ');
}, 300);

// End the response after 5 seconds
setTimeout(() => {
    clearInterval(interval);
    res.end('Streaming complete!');
}, 50000);
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
