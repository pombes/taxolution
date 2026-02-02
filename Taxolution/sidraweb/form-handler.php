<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Brevo API Configuration
// IMPORTANT: Replace these values with your actual credentials before uploading to server
define('BREVO_API_KEY', 'YOUR_BREVO_API_KEY_HERE');
define('RECIPIENT_EMAIL', 'info@dubaitaxolution.com');
define('SENDER_EMAIL', 'info@dubaitaxolution.com');
define('SENDER_NAME', 'Dubai Taxolution Website');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$requiredFields = ['name', 'email', 'phone', 'service', 'message'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
        exit();
    }
}

// Honeypot check (spam protection)
if (!empty($data['website'])) {
    // Bot detected - return success but don't send email
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Thank you for your message!']);
    exit();
}

// Sanitize inputs
$name = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars(trim($data['service']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');
$company = isset($data['company']) ? htmlspecialchars(trim($data['company']), ENT_QUOTES, 'UTF-8') : 'Not provided';
$revenue = isset($data['revenue']) ? htmlspecialchars(trim($data['revenue']), ENT_QUOTES, 'UTF-8') : 'Not provided';

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit();
}

// Create HTML email content
$emailContent = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #722E21, #FFBEA5); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
        .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0; }
        .field:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #722E21; text-transform: uppercase; font-size: 12px; margin-bottom: 5px; }
        .value { color: #333; font-size: 14px; }
        .footer { background: #153357; color: white; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
            <p style='margin: 0; opacity: 0.9;'>Dubai Taxolution Website</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name</div>
                <div class='value'>{$name}</div>
            </div>
            <div class='field'>
                <div class='label'>Email</div>
                <div class='value'><a href='mailto:{$email}'>{$email}</a></div>
            </div>
            <div class='field'>
                <div class='label'>Phone</div>
                <div class='value'>{$phone}</div>
            </div>
            <div class='field'>
                <div class='label'>Company</div>
                <div class='value'>{$company}</div>
            </div>
            <div class='field'>
                <div class='label'>Service Interested In</div>
                <div class='value'>{$service}</div>
            </div>
            <div class='field'>
                <div class='label'>Estimated Annual Revenue</div>
                <div class='value'>{$revenue}</div>
            </div>
            <div class='field'>
                <div class='label'>Message</div>
                <div class='value'>{$message}</div>
            </div>
        </div>
        <div class='footer'>
            <p style='margin: 0;'>© " . date('Y') . " Dubai Taxolution. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
";

// Prepare Brevo API request
$brevoData = [
    'sender' => [
        'name' => SENDER_NAME,
        'email' => SENDER_EMAIL
    ],
    'to' => [
        [
            'email' => RECIPIENT_EMAIL,
            'name' => 'Dubai Taxolution'
        ]
    ],
    'subject' => "New Contact Form: {$service} - {$name}",
    'htmlContent' => $emailContent,
    'replyTo' => [
        'email' => $email,
        'name' => $name
    ]
];

// Send email via Brevo API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.brevo.com/v3/smtp/email');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($brevoData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'accept: application/json',
    'api-key: ' . BREVO_API_KEY,
    'content-type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Handle response
if ($httpCode === 201) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We\'ll get back to you within 24 hours.'
    ]);
} else {
    // Log error for debugging
    error_log("Brevo API Error: HTTP {$httpCode} - {$response}");
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    ]);
}
?>
