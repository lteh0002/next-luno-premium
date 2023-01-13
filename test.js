function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    for (let i = 0; i < 5; i++) {
        console.log(`Loop ${i} time...`);
        await sleep(5000);
    }
    console.log('Done');
}

demo();