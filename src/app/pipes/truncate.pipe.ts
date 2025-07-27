import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: 'customTruncate',
    standalone: true,
    pure: true,
})
export class CustomTruncatePipe implements PipeTransform {
    transform(text: string, limit = 20): string {
        return text.length > limit ? text.slice(0, limit) + '...' : text;
    }
}