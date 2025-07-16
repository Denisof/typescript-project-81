import { describe, it, expect } from 'vitest'
import Odd from '../src/tag/backend/Odd'
import Even from '../src/tag/backend/Even'
import Tag from '../src/tag/Tag'

describe('Backend classes', () => {
  describe('Odd class', () => {
    it('should render self-closing tag with no attributes', () => {
      const odd = new Odd('input', {})
      expect(odd.toString()).toBe('<input  />')
    })

    it('should render self-closing tag with single attribute', () => {
      const odd = new Odd('input', { type: 'text' })
      expect(odd.toString()).toBe('<input type="text" />')
    })

    it('should render self-closing tag with multiple attributes', () => {
      const odd = new Odd('img', { src: 'image.jpg', alt: 'An image' })
      expect(odd.toString()).toBe('<img src="image.jpg" alt="An image" />')
    })
  })

  describe('Even class', () => {
    it('should render paired tag with no content', () => {
      const even = new Even('div', {})
      expect(even.toString()).toBe('<div></div>')
    })

    it('should render paired tag with string content', () => {
      const even = new Even('div', {}, 'Hello World')
      expect(even.toString()).toBe('<div>Hello World</div>')
    })

    it('should render paired tag with attributes and content', () => {
      const even = new Even('label', { for: 'email' }, 'Email Address')
      expect(even.toString()).toBe('<label for="email">Email Address</label>')
    })

    it('should render paired tag with nested RenderInterface object', () => {
      const innerTag = new Tag('input', { type: 'text' })
      const even = new Even('label', {}, innerTag)
      expect(even.toString()).toBe('<label><input type="text" /></label>')
    })
  })

  describe('Integration tests', () => {
    it('should handle complex nested structures', () => {
      const input = new Tag('input', { type: 'email', id: 'email' })
      const label = new Tag('label', { for: 'email' }, 'Email:')
      const fieldset = new Tag('div', { class: 'field' }, label)

      expect(input.toString()).toBe('<input type="email" id="email" />')
      expect(label.toString()).toBe('<label for="email">Email:</label>')
      expect(fieldset.toString()).toBe('<div class="field"><label for="email">Email:</label></div>')
    })
  })
})
