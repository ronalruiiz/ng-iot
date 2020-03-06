import {Component, OnInit} from '@angular/core';
import {SpeechRecognitionService} from '@kamiazya/ngx-speech-recognition';
import {MqttService, IMqttMessage} from 'ngx-mqtt';

@Component({
    selector: 'app-controller-page',
    templateUrl: './controller-page.component.html',
    styleUrls: ['./controller-page.component.scss'],
    providers: [
        SpeechRecognitionService,
    ],
})
export class ControllerPageComponent implements OnInit {
    public led = false;
    private synth = window.speechSynthesis;
    message = '';
    private voices;
    listen = '';

    constructor(private _mqttService: MqttService, public _speech: SpeechRecognitionService,) {
    }

    ngOnInit() {
    }

    controllerAction() {
        this.led = !this.led;
        this._mqttService.publish('habitacion1/luz', (this.led) ? '1' : '0').subscribe({
            next: () => {
                console.log('publicando');
            },
            error: (error: Error) => {
                console.log('error publicar');
            }
        });
    }

    connect(config): void {
        this._mqttService.connect(config);
    }

    voiceSearch() {
        if (this.synth !== null) {
            this.voices = this.synth.getVoices();
            const utterThis = new SpeechSynthesisUtterance('Que accion desea hacer');
            utterThis.lang = 'es-EC';
            this._speech.lang = 'es-EC';
            this.synth.speak(utterThis);
            const speking = this.synth.speaking;
            this.listen = 'warn';
            setTimeout(() => {
                this._speech.start();
            }, 2000);
            this._speech.onresult = ({results}) => {
                this.message = results.item(0).item(0).transcript;
            };
            this._speech.onend = () => {
                this.listen = '';
                console.log(this.message);
                if (this.message.toLocaleLowerCase() === 'encender') {
                    console.log('On');
                    this.led = true;
                }
                if (this.message.toLocaleLowerCase() === 'apagar') {
                    console.log('Off');
                    this.led = false;
                }
            };
        }
    }
}
