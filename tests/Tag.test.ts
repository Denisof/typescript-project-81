import { describe, it, expect } from 'vitest'
import Tag from '../src/tag/Tag'

describe('Tag', () => {
  describe('Odd tags (self-closing)', () => {
    it('should render input tag with attributes', () => {
      const tag = new Tag('input', { type: 'submit', value: 'Save' })
      expect(tag.toString()).toBe('<input type="submit" value="Save" />')
    })

    it('should render img tag with src attribute', () => {
      const tag = new Tag('img', { src: 'path/to/image' })
      expect(tag.toString()).toBe('<img src="path/to/image" />')
    })

    it('should render br tag without attributes', () => {
      const tag = new Tag('br')
      expect(tag.toString()).toBe('<br  />')
    })
  })

  describe('Even tags (with closing tags)', () => {
    it('should render label tag with text content', () => {
      const tag = new Tag('label', {}, 'Email')
      expect(tag.toString()).toBe('<label>Email</label>')
    })

    it('should render label tag with attributes and content', () => {
      const tag = new Tag('label', { for: 'email' }, 'Email')
      expect(tag.toString()).toBe('<label for="email">Email</label>')
    })

    it('should render div tag without content', () => {
      const tag = new Tag('div')
      expect(tag.toString()).toBe('<div></div>')
    })

    it('should render div tag with content', () => {
      const tag = new Tag('div', { class: 'container' }, 'Hello World')
      expect(tag.toString()).toBe('<div class="container">Hello World</div>')
    })

    it('should render form tag with attributes and content', () => {
      const tag = new Tag('form', { action: '/submit', method: 'POST' }, 'Form content')
      expect(tag.toString()).toBe('<form action="/submit" method="POST">Form content</form>')
    })

    it('should render form tag with attributes but no content', () => {
      const tag = new Tag('form', { action: '/submit', method: 'POST' })
      expect(tag.toString()).toBe('<form action="/submit" method="POST"></form>')
    })
  })

  describe('Nested tags', () => {
    it('should render nested tags correctly', () => {
      const innerTag = new Tag('label', {}, 'Email')
      const outerTag = new Tag('div', { class: 'form-group' }, innerTag)
      expect(outerTag.toString()).toBe('<div class="form-group"><label>Email</label></div>')
    })
  })

  describe('Error handling', () => {
    it('should throw error for unknown tag', () => {
      const unknownTag = new Tag('unknown')
      expect(() => unknownTag.toString()).toThrow('Unknown tag')
    })

    it('should throw error for unsupported tag', () => {
      const unsupportedTag = new Tag('section')
      expect(() => unsupportedTag.toString()).toThrow('Unknown tag')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty attributes object', () => {
      const tag = new Tag('input', {})
      expect(tag.toString()).toBe('<input  />')
    })

    it('should handle attributes with special characters', () => {
      const tag = new Tag('input', { 'data-test': 'value-with-dashes', 'id': 'test_id' })
      expect(tag.toString()).toBe('<input data-test="value-with-dashes" id="test_id" />')
    })

    it('should handle empty string content for even tags', () => {
      const tag = new Tag('div', {}, '')
      expect(tag.toString()).toBe('<div></div>')
    })
  })
})
