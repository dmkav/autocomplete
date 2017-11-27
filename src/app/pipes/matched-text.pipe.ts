import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchedText'
})
export class MatchedTextPipe implements PipeTransform {

  transform(name: string, term: string): any {
    if (name && term) {
      const startIndex = name.toLowerCase().indexOf(term.toLowerCase());
      if (startIndex !== -1) {
        const matchedLength = term.length;
        const matchedString = name.substr(startIndex, matchedLength);
        name = name.replace(matchedString, `<mark>${matchedString}</mark>`);
      } else {name += '<i>Matched in the description</i>';
      }
      return name;
    }
    return null;
  }
}
