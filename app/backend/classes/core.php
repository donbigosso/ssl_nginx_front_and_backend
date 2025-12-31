<?php
class Core
{
  public function JSONencode(array $data): string
  {
      return json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  }

  public function JSONdecode(string $json): array
  {
      return json_decode($json, true);
  }

  public function show_files_in_folder($folder_path): array
  {
      $all_items = array_diff(scandir($folder_path), ['.', '..', '.gitkeep', '.DS_Store']);
      $files_only = array_filter($all_items, function($item) use ($folder_path) {
          return is_file($folder_path . '/' . $item);
      });
      return $files_only;
  }

  public function create_file_details_table($folder_path){
      $files = $this->show_files_in_folder($folder_path);
     if(!empty($files)){
      $n = 0;
      $file_details = [];
      foreach($files as $file){
          $full_path = $folder_path . '/' . $file;
          $sizeKB = round(filesize($full_path) / 1024, 0);
          if($sizeKB == 0) $sizeKB = 1;
          $file_details[$n] = array($file, 
                                  $sizeKB, 
                                  date("Y-m-d H:i:s", filemtime($full_path))
                                 );
          $n++;
      }
       usort($file_details, function($a, $b) {
                return strcasecmp($a[0], $b[0]); // Sort by filename (index 0)
            });
      return $file_details; 
     }
     else return array();

  }

  public function JSONencodeFileTable($folder_path){
      return $this->JSONencode($this->create_file_details_table($folder_path));
  }

}
?>