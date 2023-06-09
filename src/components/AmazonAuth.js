let amazonAccessToken = '';

//Adding Login With Amazon (LWA) SDK for getting profile access
window.onAmazonLoginReady = function () {
    amazon.Login.setClientId(
        "amzn1.application-oa2-client.4647d811315141b7ad84ee97c7e9da1c"
    );
};
(function (d) {
    var a = d.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.id = "amazon-login-sdk";
    a.src = "https://assets.loginwithamazon.com/sdk/na/login1.js";
    d.getElementById("amazon-root").appendChild(a);
})(document);


async function fetchUserProfile() {
    const url = "https://api.amazon.com/user/profile";
    const options = {
        headers: {
            Authorization: `Bearer ${amazonAccessToken}`,
            "x-api-key": "amzn1.application-oa2-client.4647d811315141b7ad84ee97c7e9da1c"
        },
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("User data request failed with status: ", response.status)
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error fetching user profile: ", error)
    }
}

async function fetchAmazonTopPlaylists() {
    const url = 'https://api.music.amazon.dev/browse/playlists/top';
    const options = {
        headers: {
            Authorization: `Bearer ${amazonAccessToken}`,
            "x-api-key": "amzn1.application-oa2-client.4647d811315141b7ad84ee97c7e9da1c"
        },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

}

function loginAmazon() {
    const options = {
        scope: "profile",
        pkce: true,
        scope_data: {
            profile: { essential: false },
        },
    };
    amazon.Login.authorize(options, function (response) {
        if (response.error) {
            console.log("oauth error: " + response.error);
            return;
        }
        amazon.Login.retrieveToken(response.code, function (response) {
            if (response.error) {
                console.log("oauth error: " + response.error);
                return;
            }
            const accessToken = response.access_token;
            amazonAccessToken = accessToken;
            fetchUserProfile();
            fetchAmazonTopPlaylists();
        });
    });
}


export { loginAmazon, fetchAmazonTopPlaylists, fetchUserProfile }