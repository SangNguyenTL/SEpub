export default class CMaps {
  public length = 1;
  public names = ["_RESERVED_"];
  public constructors = ["_RESERVED_"];
  public patterns: Array<string | RegExp> = ["_RESERVED_"];

  /**
   * register
   */
  public register(map: any) {
    this.names[this.length] = map.vietchars[0];
    this.constructors[this.length] = map.constructor.name;
    const re = map.pattern ? map.pattern : "[a-ỹ]";
    const reg = new RegExp(re, map.maxchrlen ? "gi" : "g").compile();
    this.patterns[this.length++] = reg;
  }

  public getMap(id: string | number) {
    let ind = this.length - 1;
    if ("number" === typeof id) {
      ind = id;
    } else {
      for (
        id = id.toUpperCase();
        ind > 0 && this.names[ind].toUpperCase() !== id;

      ) {
        --ind;
    }
      }
    return !ind || ind >= this.length
  }
}
