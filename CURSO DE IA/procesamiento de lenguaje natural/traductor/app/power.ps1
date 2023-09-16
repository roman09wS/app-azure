#Add your key here
$key="45256b4902f24462948fda7582f21d05"

#You need to add your resource location if you use a Cognitive Services resource
$location="eastus"

#The endpoint is global for the Translator service, DO NOT change it 
$endpoint="https://api.cognitive.microsofttranslator.com/"

#Text to be translated 
$text="Hola"

# Code to call Text Analytics service to analyze sentiment in text
$headers = @{}
$headers.Add( "Ocp-Apim-Subscription-Key", $key )
$headers.Add( "Ocp-Apim-Subscription-Region", $location )
$headers.Add( "Content-Type","application/json" )

$body = "[{'text': '$text'}]" 

write-host "Translating text..."
$result = Invoke-Webrequest -Method Post `
          -Uri "$endpoint/translate?api-version=3.0&from=es&to=fr&to=it&to=zh-Hans" `
          -Headers $headers `
          -Body $body 

$analysis = $result.content | ConvertFrom-Json
$french = $analysis.translations[0] 
$italian = $analysis.translations[1] 
$chinese = $analysis.translations[2] 
Write-Host ("Original Text: $text`nFrench Translation: $($french.text)`nItalian Translation: $($italian.text)`nChinese Translation: $($chinese.text)`n")
