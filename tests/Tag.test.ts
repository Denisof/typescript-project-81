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

    it('should handle numeric content in even tags', () => {
      const tag = new Tag('div', {}, '123')
      expect(tag.toString()).toBe('<div>123</div>')
    })

    it('should handle whitespace-only content', () => {
      const tag = new Tag('div', {}, '   ')
      expect(tag.toString()).toBe('<div>   </div>')
    })

    it('should handle multiple attributes with empty values', () => {
      const tag = new Tag('input', { type: '', value: '', placeholder: 'test' })
      expect(tag.toString()).toBe('<input type="" value="" placeholder="test" />')
    })

    it('should handle attributes with quotes in values', () => {
      const tag = new Tag('input', { 'data-json': '{"key":"value"}', 'title': 'Say "Hello"' })
      expect(tag.toString()).toBe('<input data-json="{"key":"value"}" title="Say "Hello"" />')
    })
  })

  describe('Complex nested structures', () => {
    it('should handle deeply nested tags', () => {
      const label = new Tag('label', { for: 'username' }, 'Username:')
      const fieldGroup = new Tag('div', { class: 'field-group' }, label)
      const form = new Tag('form', { action: '/login', method: 'POST' }, fieldGroup)

      expect(form.toString()).toBe(
        '<form action="/login" method="POST"><div class="field-group"><label for="username">Username:</label></div></form>',
      )
    })

    it('should handle multiple nested RenderInterface objects', () => {
      const input1 = new Tag('input', { type: 'text', name: 'first' })
      const wrapper1 = new Tag('div', { class: 'wrapper1' }, input1)
      const container = new Tag('div', { class: 'container' }, wrapper1)

      expect(container.toString()).toBe(
        '<div class="container"><div class="wrapper1"><input type="text" name="first" /></div></div>',
      )
    })

    it('should handle nested tags with mixed content types', () => {
      const span = new Tag('label', {}, 'Label text')
      const div = new Tag('div', { class: 'mixed' }, span)

      expect(div.toString()).toBe('<div class="mixed"><label>Label text</label></div>')
    })
  })

  describe('All supported tags coverage', () => {
    it('should handle all odd tags correctly', () => {
      const oddTags = ['input', 'br', 'img']

      oddTags.forEach((tagName) => {
        const tag = new Tag(tagName, { class: 'test' })
        expect(tag.toString()).toBe(`<${tagName} class="test" />`)
      })
    })

    it('should handle all even tags correctly', () => {
      const evenTags = ['label', 'div', 'form']

      evenTags.forEach((tagName) => {
        const tag = new Tag(tagName, { class: 'test' }, 'content')
        expect(tag.toString()).toBe(`<${tagName} class="test">content</${tagName}>`)
      })
    })

    it('should handle all even tags without content', () => {
      const evenTags = ['label', 'div', 'form']

      evenTags.forEach((tagName) => {
        const tag = new Tag(tagName, { id: 'test' })
        expect(tag.toString()).toBe(`<${tagName} id="test"></${tagName}>`)
      })
    })
  })

  describe('Attribute edge cases', () => {
    it('should handle single attribute correctly', () => {
      const tag = new Tag('input', { type: 'text' })
      expect(tag.toString()).toBe('<input type="text" />')
    })

    it('should handle multiple attributes in consistent order', () => {
      const tag = new Tag('input', {
        type: 'text',
        id: 'test-input',
        class: 'form-control',
        name: 'testname',
      })
      const result = tag.toString()
      expect(result).toContain('type="text"')
      expect(result).toContain('id="test-input"')
      expect(result).toContain('class="form-control"')
      expect(result).toContain('name="testname"')
      expect(result.startsWith('<input ')).toBe(true)
      expect(result.endsWith(' />')).toBe(true)
    })

    it('should handle attributes with special HTML characters', () => {
      const tag = new Tag('input', {
        'data-value': '<script>alert("test")</script>',
        'data-amp': 'this & that',
      })
      expect(tag.toString()).toBe('<input data-value="<script>alert("test")</script>" data-amp="this & that" />')
    })
  })

  describe('Constructor parameter variations', () => {
    it('should work with only tag name', () => {
      const tag = new Tag('br')
      expect(tag.toString()).toBe('<br  />')
    })

    it('should work with tag name and attributes only', () => {
      const tag = new Tag('input', { type: 'submit' })
      expect(tag.toString()).toBe('<input type="submit" />')
    })

    it('should work with all parameters for even tags', () => {
      const tag = new Tag('div', { class: 'container' }, 'Hello World')
      expect(tag.toString()).toBe('<div class="container">Hello World</div>')
    })

    it('should work with empty attributes for even tags', () => {
      const tag = new Tag('div', {}, 'Content only')
      expect(tag.toString()).toBe('<div>Content only</div>')
    })
  })
})
