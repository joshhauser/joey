import * as _ from 'lodash';

export class Utils {
  /**
   * Convert image buffer into a usable string for 'src' attribute of <img /> tag
   * @param buffer the buffer that contains image data
   */
  static convertImageBuffer(buffer: any) {
    return (
      'data:;base64,' +
      btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    );
  }

  static formatObjectKeys(obj: { [key: string]: any }, formatFct: Function): { [key: string]: any } {
    return Object.keys(obj).reduce(
      (accumulator: { [key: string]: any }, key: string) => {
        if (_.isPlainObject(obj[key])) {
          accumulator[formatFct(key)] = this.formatObjectKeys(obj[key], formatFct);
        } else if (_.isArray(obj[key])) {
          accumulator[formatFct(key)] = obj[key].map((subObject: { [key: string]: any }) =>
            this.formatObjectKeys(subObject, formatFct)
          );
        } else {
          formatFct(key);
          accumulator[formatFct(key)] = obj[key];
        }
        return accumulator;
      },
      {} as { [key: string]: any }
    );
  }
}
