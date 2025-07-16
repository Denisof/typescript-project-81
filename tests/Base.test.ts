import { describe, it, expect } from 'vitest'
import Base from '../src/tag/backend/Base'

// Create a test class that extends Base to test protected methods
class TestBase extends Base {
  public testAttributesToString(attr: Record<string, string>): string {
    return this.attributesToString(attr)
  }
}

describe('Base class', () => {
  describe('attributesToString', () => {
    let testBase: TestBase

    beforeEach(() => {
      testBase = new TestBase()
    })

    it('should convert single attribute to string', () => {
      const result = testBase.testAttributesToString({ class: 'test' })
      expect(result).toBe('class="test"')
    })

    it('should convert multiple attributes to string', () => {
      const result = testBase.testAttributesToString({
        'class': 'test',
        'id': 'myId',
        'data-value': 'something',
      })
      expect(result).toBe('class="test" id="myId" data-value="something"')
    })

    it('should handle empty attributes object', () => {
      const result = testBase.testAttributesToString({})
      expect(result).toBe('')
    })

    it('should handle attributes with empty values', () => {
      const result = testBase.testAttributesToString({
        type: '',
        value: '',
        placeholder: 'test',
      })
      expect(result).toBe('type="" value="" placeholder="test"')
    })

    it('should handle attributes with special characters', () => {
      const result = testBase.testAttributesToString({
        'data-json': '{"key":"value"}',
        'onclick': 'alert("hello")',
      })
      expect(result).toBe('data-json="{"key":"value"}" onclick="alert("hello")"')
    })

    it('should handle attributes with spaces in values', () => {
      const result = testBase.testAttributesToString({
        class: 'form control input',
        title: 'This is a title',
      })
      expect(result).toBe('class="form control input" title="This is a title"')
    })

    it('should handle attributes with numbers', () => {
      const result = testBase.testAttributesToString({
        'tabindex': '1',
        'data-count': '42',
      })
      expect(result).toBe('tabindex="1" data-count="42"')
    })
  })
})
