import RenderInterface from '../RenderInterface'
import { Attribues } from './Attributes'
import Base from './Base'

export default class Even extends Base implements RenderInterface {
  constructor(private readonly name: string, private readonly attibutes: Attribues, private readonly inner: string | RenderInterface = '') {
    super()
  }

  toString(): string {
    const inner: string = this.isRenderI(this.inner) ? this.inner.toString() : this.inner
    const attributeString = this.attributesToString(this.attibutes)
    const attributes = attributeString ? ` ${attributeString}` : ''

    return `<${this.name}${attributes}>${inner}</${this.name}>`
  }

  private isRenderI(obj: unknown): obj is RenderInterface {
    return obj !== null && typeof obj === 'object' && typeof (obj as RenderInterface).toString === 'function'
  }
}
