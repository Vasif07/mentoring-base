import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'editphonenumber',
    standalone: true,
    pure: true,
})
export class EditPhoneNumberPipe implements PipeTransform{
    transform(text: string): string {
        return text.replace(/\D/g, '');
    }
}