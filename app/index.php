<?php
echo "<h1>Hello from PHP on Raspberry Pi! This is a test page. Donbigosso Inc</h1><br>This line was changed.";
$folder = __DIR__ . '/uploads';
$file = $folder . '/test_file.txt';
echo "Test";
// Try to create file
if (file_put_contents($file, "Hello from PHP!\n")) {
    echo "File created successfully at: $file";
// Change file permission to group write
    chmod($file, 0664);  // owner rw, group rw, others r
} else {
    echo "Failed to create file. Check folder permissions!";
}
$secret = getenv('APP_SECRET');
var_dump($secret);

echo "<br><h2>Checking ENV variables</h2>";
echo"<br>The app secret is: ".getenv('APP_SECRET');
echo "<br><h2>Checking DB connection</h2>";
echo "<br>";
$db   = getenv('MYSQL_DATABASE');
$user = getenv('MYSQL_USER');
$pass = getenv('MYSQL_PASSWORD');
$pdo = new PDO('mysql:host=mysql;dbname='.$db, $user, $pass);
echo "Connected!<br>";

$stmt = $pdo->query("SHOW TABLES");
while ($row = $stmt->fetch()) {
    echo $row[0] . "<br>";
}

?>
