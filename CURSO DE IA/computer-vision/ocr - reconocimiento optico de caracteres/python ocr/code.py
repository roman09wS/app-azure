import azure.ai.vision as sdk
KEY = "2e3246ca6bf14b7c87b279092d911e79"
ENPOINT = "https://jeffry-computer-vision.cognitiveservices.azure.com/"
service_options = sdk.VisionServiceOptions(ENPOINT,KEY)

vision_source = sdk.VisionSource(filename="img/carro_1.png")

analysis_options = sdk.ImageAnalysisOptions()

analysis_options.features = (
    sdk.ImageAnalysisFeature.CROP_SUGGESTIONS | 
    sdk.ImageAnalysisFeature.CAPTION |
    sdk.ImageAnalysisFeature.DENSE_CAPTIONS |
    sdk.ImageAnalysisFeature.OBJECTS |
    sdk.ImageAnalysisFeature.PEOPLE |
    sdk.ImageAnalysisFeature.TEXT |
    sdk.ImageAnalysisFeature.TAGS
)
analysis_options.language = "en"
image_analyzer = sdk.ImageAnalyzer(service_options, vision_source, analysis_options)

result = image_analyzer.analyze()

if result.reason == sdk.ImageAnalysisResultReason.ANALYZED:

    print(" Image height: {}".format(result.image_height))
    print(" Image width: {}".format(result.image_width))
    print(" Model version: {}".format(result.model_version))

    if result.caption is not None:
        print(" Caption:")
        print("   '{}', Confidence {:.4f}".format(result.caption.content, result.caption.confidence))

    if result.dense_captions is not None:
        print(" Dense Captions:")
        for caption in result.dense_captions:
            print("   '{}', {}, Confidence: {:.4f}".format(caption.content, caption.bounding_box, caption.confidence))

    if result.objects is not None:
        print(" Objects:")
        for object in result.objects:
            print("   '{}', {}, Confidence: {:.4f}".format(object.name, object.bounding_box, object.confidence))

    if result.tags is not None:
        print(" Tags:")
        for tag in result.tags:
            print("   '{}', Confidence {:.4f}".format(tag.name, tag.confidence))

    if result.people is not None:
        print(" People:")
        for person in result.people:
            print("   {}, Confidence {:.4f}".format(person.bounding_box, person.confidence))

    if result.crop_suggestions is not None:
        print(" Crop Suggestions:")
        for crop_suggestion in result.crop_suggestions:
            print("   Aspect ratio {}: Crop suggestion {}"
                  .format(crop_suggestion.aspect_ratio, crop_suggestion.bounding_box))

    if result.text is not None:
        print(" Text:")
        for line in result.text.lines:
            points_string = "{" + ", ".join([str(int(point)) for point in line.bounding_polygon]) + "}"
            print("   Line: '{}', Bounding polygon {}".format(line.content, points_string))
            for word in line.words:
                points_string = "{" + ", ".join([str(int(point)) for point in word.bounding_polygon]) + "}"
                print("     Word: '{}', Bounding polygon {}, Confidence {:.4f}"
                      .format(word.content, points_string, word.confidence))

    result_details = sdk.ImageAnalysisResultDetails.from_result(result)
    print(" Result details:")
    print("   Image ID: {}".format(result_details.image_id))
    print("   Result ID: {}".format(result_details.result_id))
    print("   Connection URL: {}".format(result_details.connection_url))
    print("   JSON result: {}".format(result_details.json_result))

else:

    error_details = sdk.ImageAnalysisErrorDetails.from_result(result)
    print(" Analysis failed.")
    print("   Error reason: {}".format(error_details.reason))
    print("   Error code: {}".format(error_details.error_code))
    print("   Error message: {}".format(error_details.message))