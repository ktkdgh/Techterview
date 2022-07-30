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
        // interimResults 임시 결과 반환 여부를 제어한다. 실시간으로 인식된 결과 값을 모두 확인하고 싶다면 true

        recognition.start();

        // 음성인식 시작 로그 찍어야함
        recognition.onstart = () => {
        sound_detect_check = false;     // 여기서 로그 찍으면 계속 카운트 올라감.
        };

        recognition.onend = () => {
        if (this.state.transcript !== "") {
            const sttData = {
            text: this.state.transcript,
            //   startTime: this.state.start_time,
            };
            console.log(this.state.transcript)
            socket.emit('sttSoket', this.state.transcript);
            // this.state.message.push(this.state.transcript)
            // console.log(this.state.message);

            // this.props.parentFunction(sttData);
        }
        this.setState({ transcript: "" });
        recognition.start();
        };

        // 음성감지 된 경우 시작시간을 등록한다. 우리는 불필요.
        recognition.onresult = (event) => {
        if (sound_detect_check !== true) {
            this.setState({
            //   start_time: new Date().getTime(),
            });
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