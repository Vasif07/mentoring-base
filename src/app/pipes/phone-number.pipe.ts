import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'editphonenumber',
    standalone: true,
    pure: true,
})
export class EDitPhoneNumberPipe implements PipeTransform{
    transform(text: string): string {
        return text.replace(/\D/g, '');
    }
}