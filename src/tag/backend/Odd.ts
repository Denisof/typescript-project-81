import RenderInterface from '../RenderInterface'
import { Attribues } from './Attributes'
import Base from './Base'

export default class Odd extends Base implements RenderInterface {
  constructor(private readonly name: string, private readonly attibutes: Attribues) {
    super()
  }

  toString(): string {
    const attributeString = this.attributesToString(this.attibutes)
    return `<${this.name} ${attributeString} />`
  }
}
