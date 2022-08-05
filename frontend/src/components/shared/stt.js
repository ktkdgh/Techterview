import React, { PureComponent } from "react";
import { socket } from '../../lib/socket'
let sound_detect_check = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = "ko-KR";
recognition.maxAlternatives = 10000;

class Recognition extends PureComponent {
    state = {
        transcript: "",
        message: []
    };
    componentDidMount() {
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;  

        recognition.start();

        recognition.onstart = () => {
        sound_detect_check = false;    
        };

        recognition.onend = () => {
        if (this.state.transcript !== "") {
            const sttData = {
                text: this.state.transcript,
            };
            socket.emit('sttSoket', this.state.transcript);
        }
        this.setState({ transcript: "" });
        recognition.start();
        };

        recognition.onresult = (event) => {
        if (sound_detect_check !== true) {
            sound_detect_check = true;
        }
        this.setState({
            transcript: Array.from(event.results)
            .map((res) => res[0].transcript)
            .join(""),
        });
        };
    }
    render() {
        return (
            <div>
                <script></script>
            </div>
        );
    }
}

export default React.memo(Recognition);