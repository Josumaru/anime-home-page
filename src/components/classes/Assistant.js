export default class Assistant {
    constructor(config, commands) {
        this.sr = window.webkitSpeechRecognition
        this.speaker = window.speechSynthesis
    }

    speak() {
        let utterance = new SpeechSynthesisUtterance("Hello")
        utterance.lang = "en-US"
        utterance.pitch = 1
        utterance.voice = speechSynthesis.getVoices()[3]
        utterance.rate = 1.1
        this.speaker.speak(utterance)
    }
}