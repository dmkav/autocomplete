import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchedText'
})
export class MatchedTextPipe implements PipeTransform {

  transform(item: string, term: string): any {
    if (item && term) {
      const startIndex = item.toLowerCase().indexOf(term.toLowerCase());
      if (startIndex !== -1) {
        const matchedLength = term.length;
        const matchedString = item.substr(startIndex, matchedLength);
        item = item.replace(matchedString, `<mark>${matchedString}</mark>`);
      } else {
        item += '<i>Matched in the description</i>';
      }
      return item;
    }
    return null;
  }
}
