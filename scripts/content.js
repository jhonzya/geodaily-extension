const server = 'https://geotrack.joelcuevas.com';

async function postData() {
    const nextdata = JSON.parse(document.getElementById("__NEXT_DATA__").textContent);
    const { challengeToken } = nextdata.props.pageProps;
    const { gamePlayedByCurrentUser } = nextdata.props.pageProps;

    const urlParams = new URLSearchParams(window.location.search);
    const forceRedirect = urlParams.get('forceRedirect');

    const response = await fetch(`${server}/api/track`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ challengeToken, gamePlayedByCurrentUser, forceRedirect })
    });

    if (! response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

postData().then(data => {
    if(data.redirect) {
        window.open(data.route, '_self');
    }
}).catch(error => {
    window.open('https://www.geoguessr.com/daily-challenges', '_self');
});
