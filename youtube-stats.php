<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://sandeepgaire.com.np');

// Replace with your actual API key (keep this file secure)
$apiKey = 'AIzaSyANLJjQZOgfMtNUg10_MXjY_luwvdRUyWg';
$channelId = 'UCM-wESg3YSvM8fqNLoZ2GIg';

$url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=$channelId&key=$apiKey";

$response = file_get_contents($url);

if ($response === FALSE) {
    // Fallback data if API fails
    echo json_encode([
        'items' => [[
            'statistics' => [
                'subscriberCount' => '1'
            ]
        ]]
    ]);
} else {
    echo $response;
}
?>
