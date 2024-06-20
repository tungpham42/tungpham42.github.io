<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['csvFile'])) {
    $csvFile = $_FILES['csvFile']['tmp_name'];
    
    if (($handle = fopen($csvFile, 'r')) !== FALSE) {
        $srtContent = '';
        $index = 1;
        
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            if (count($data) >= 3) {
                $startTime = formatTime($data[0]);
                $endTime = formatTime($data[1]);
                $text = $data[2];

                $srtContent .= $index . "\n";
                $srtContent .= $startTime . ' --> ' . $endTime . "\n";
                $srtContent .= $text . "\n\n";
                
                $index++;
            }
        }
        
        fclose($handle);

        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="output.srt"');
        echo $srtContent;
    }
}

function formatTime($time) {
    $parts = explode(':', $time);
    if (count($parts) == 3) {
        $secondsParts = explode('.', $parts[2]);
        $milliseconds = isset($secondsParts[1]) ? $secondsParts[1] : '000';
        return sprintf('%02d:%02d:%02d,%03d', $parts[0], $parts[1], $secondsParts[0], $milliseconds);
    }
    return '00:00:00,000';
}
?>
