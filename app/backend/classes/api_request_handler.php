<?php
    class ApiRequestHandler extends ApiMethods
    {
        public function handleRequest(string $method, array $params=[]): array
        {
            //$method = strtolower($method);
            
            // $test_response=["request_accepted" => true, "method" => $method, "test" => "test_result"];
           // $test_response=$this->create_api_response_array(true, "Request handled successfully", "", "", ["method_called" => $method, "params" => $params]);   
           // return $test_response;
            if ($this->checkRequestMethod()){
           
                $method = $this->checkRequestMethod();
                $test_response=$this->create_api_response_array(true, "Request handled successfully", "", "", ["method_called" => $method, "params" => $params]);   
                return $test_response;
            }
            else{
                $test_response=$this->create_api_response_array(false, "", "", "No valid request method found", []);   
                return $test_response;
            }

        }
    }
?>