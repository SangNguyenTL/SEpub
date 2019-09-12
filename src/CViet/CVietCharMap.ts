export default class CVietCharMap {
  public vietchars!: number[];
  public length = 149;
  public charCache = new Array(20);
  public indexCache = new Array(20);
  public cptr = 0;

  public charAt(index: number) {
    const e = this.vietchars[index];
    return e ? String.fromCharCode(e) : null;
  }

  public regExpAt(e: number) {
    let char = this.charAt(e);
    if (char) {
      char = char.replace(/([\*|+-?.(^$])/g, "\\$1");
      return new RegExp(char, "g");
    }
    return 0;
  }

  public isVowel(char: string) {
    let index = 0;
    for (let i = 0; 20 > i && char !== this.charCache[i]; ) {
      index = i++;
    }
    if (20 > index) {
      return this.indexCache[index];
    }
    for (let i = this.length - 5; char !== this.charAt(i) && i; ) {
      index = --i;
    }
    this.caching(char, index);
    return index;
  }

  public caching(char: string, index: number) {
    this.charCache[this.cptr] = char;
    this.indexCache[this.cptr++] = index;
    this.cptr %= 20;
  }

  public lowerCaseOf(char: string, id?: number) {
    const r = id ? id : this.isVowel(char);
    return r ? this.charAt((r - 1) % 24 >= 12 ? r - 12 : r) : 0;
  }
}
