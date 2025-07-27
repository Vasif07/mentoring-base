import { inject, Pipe, PipeTransform} from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
    name: 'dateheader',
    standalone: true,
    pure: true,
})
export class HeaderDatePipe implements PipeTransform {
    private datePipe = inject(DatePipe);

    transform(value: Date | string | number): string | null {
        return this.datePipe.transform(value, 'medium');
    }
}