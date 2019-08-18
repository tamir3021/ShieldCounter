import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'timerTransform'
})
export class TimerPipe implements PipeTransform {

    // Take time in miliseconds and return it as a digits string, with or without delimiters
    transform(value: number, showdelimiters?: boolean) {
        let hours = Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((value % (1000 * 60)) / 1000);
        let hoursDisplay = (hours < 10) ? "0" + hours : hours;
        let minutesDisplay = (minutes < 10) ? "0" + minutes : minutes;
        let secondsDisplay = (seconds < 10) ? "0" + seconds : seconds;
        
        const dots = showdelimiters ? ':' : ' ';
        const dot = showdelimiters ? '.' : ' '

        return `${hoursDisplay}${dots}${minutesDisplay}${dot}${secondsDisplay}`;
    }
    
}