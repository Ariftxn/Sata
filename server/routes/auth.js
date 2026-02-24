const express = require('express');
const router = express.Router();

// OAuth2 configuration
define('DISCORD_CLIENT_ID', 'your_client_id');
define('DISCORD_CLIENT_SECRET', 'your_client_secret');
define('DISCORD_REDIRECT_URI', 'your_redirect_uri');

type = 'application/x-www-form-urlencoded';

// Redirect to Discord for authentication
router.get('/login', (req, res) => {
    const redirectUri = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify`;
    res.redirect(redirectUri);
});

// Callback route for Discord to redirect after authentication
router.get('/callback', async (req, res) => {
    const { code } = req.query;

    // Exchange the authorization code for an access token
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': type,
        },
        body: new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: DISCORD_REDIRECT_URI,
        }),
    });

    const data = await response.json();
    // Handle the access token (data.access_token)
    res.send(data);
});

module.exports = router;