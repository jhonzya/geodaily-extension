const server = 'http://127.0.0.1';

async function postData() {
    const nextdata = JSON.parse(document.getElementById("__NEXT_DATA__").textContent);
    const { challengeToken } = nextdata.props.pageProps;
    const { gamePlayedByCurrentUser } = nextdata.props.pageProps;

    const response = await fetch(`${server}/api/track`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ challengeToken, gamePlayedByCurrentUser })
    });

    if (! response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const json = await response.json();
}

postData().then(data => {
    window.open(server, '_self');
}).catch(error => {
    window.open('https://www.geoguessr.com/daily-challenges', '_self');
});
