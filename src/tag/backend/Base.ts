import { Attribues } from './Attributes'

export default class Base {
  protected attributesToString(attr: Attribues): string {
    const attributeString = Object.entries(attr).map((v: [string, string]) => `${v[0]}="${v[1]}"`).join(' ')
    return attributeString
  }
}
