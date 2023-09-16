import azure.cognitiveservices.speech as speechsdk
KEY="9ec4a021c3d24a85aeaba8cd96047ed5"
REGION="eastus"
# This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
def hablar(text,idioma):

    if idioma == 1:
        pais = "en-US"
        voz = "en-US-JennyMultilingualNeural"
    else:
        pais = "fr-FR"
        voz = "fr-FR-DeniseNeural"
    speech_config = speechsdk.SpeechConfig(subscription=KEY, region=REGION)
    audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=True)

# The language of the voice that speaks.
    speech_config.speech_synthesis_language = pais
    speech_config.speech_synthesis_voice_name= voz

    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

    # Get text from the console and synthesize to the default speaker.
    print("texto hablar ",text)
    speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

    if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print("Speech synthesized for text [{}]".format(text))
    else:
        print("error")
# hablar("hola me llamo jeffry",1)        