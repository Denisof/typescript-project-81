import Even from './backend/Even'
import Odd from './backend/Odd'
import RenderInterface from './RenderInterface'
import { Attribues } from './backend/Attributes'

export default class Tag implements RenderInterface {
  private odd: string[] = ['input', 'br', 'img']
  private even: string[] = ['label', 'div', 'form']
  constructor(private readonly name: string, private readonly attibutes: Attribues = {}, private readonly inner: string | RenderInterface = '') {};

  toString(): string {
    if (this.odd.includes(this.name)) {
      return new Odd(this.name, this.attibutes).toString()
    }

    if (this.even.includes(this.name)) {
      return new Even(this.name, this.attibutes, this.inner).toString()
    }

    throw new Error('Unknown tag')
  }
}
