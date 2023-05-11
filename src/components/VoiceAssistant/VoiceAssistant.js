import "./VoiceAssistant.css"
import Assistant from "../classes/Assistant";


const VoiceAssistant = () => {
    const VA = new Assistant()
    const speak = () => {
        VA.speak()
    }
    return (
        <div className="voice-assistant-container">
            <span onClick={speak} style={{fontSize: "45px"}} className="material-symbols-outlined">launcher_assistant_on</span>
        </div>
    )
}

export default VoiceAssistant;