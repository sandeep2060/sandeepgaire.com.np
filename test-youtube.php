<?php
header('Content-Type: text/plain');

$apiKey = 'YOUR_API_KEY_HERE';
$channelId = 'UCM-wESg3YSvM8fqNLoZ2GIg';

$url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=$channelId&key=$apiKey";

echo "Testing YouTube API...\n";
echo "URL: $url\n\n";

$response = file_get_contents($url);

if ($response === FALSE) {
    echo "ERROR: Could not fetch data\n";
    $error = error_get_last();
    echo "Error: " . $error['message'] . "\n";
} else {
    echo "SUCCESS: Data received\n";
    echo "Response: " . $response . "\n";
}
?>
