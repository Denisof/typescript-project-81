import { describe, it, expect } from 'vitest'
import Tag from '../src/tag/Tag'

// Additional test cases to improve coverage
describe('Tag - Additional Coverage Tests', () => {
  describe('Extended edge cases', () => {
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

  describe('Attribute variations', () => {
    it('should handle single attribute correctly', () => {
      const tag = new Tag('input', { type: 'text' })
      expect(tag.toString()).toBe('<input type="text" />')
    })

    it('should handle multiple attributes', () => {
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
    it('should work with only tag name for odd tags', () => {
      const tag = new Tag('br')
      expect(tag.toString()).toBe('<br  />')
    })

    it('should work with tag name and attributes only for odd tags', () => {
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

    it('should work with only tag name for even tags', () => {
      const tag = new Tag('div')
      expect(tag.toString()).toBe('<div></div>')
    })
  })

  describe('Content variations for even tags', () => {
    it('should handle very long content', () => {
      const longContent = 'This is a very long content string that should be handled correctly by the tag system.'
      const tag = new Tag('div', {}, longContent)
      expect(tag.toString()).toBe(`<div>${longContent}</div>`)
    })

    it('should handle content with HTML entities', () => {
      const content = 'Content with &lt;special&gt; characters &amp; symbols'
      const tag = new Tag('div', {}, content)
      expect(tag.toString()).toBe(`<div>${content}</div>`)
    })

    it('should handle content with newlines', () => {
      const content = 'Line 1\nLine 2\nLine 3'
      const tag = new Tag('div', {}, content)
      expect(tag.toString()).toBe(`<div>${content}</div>`)
    })
  })
})
