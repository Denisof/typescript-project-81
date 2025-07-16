import { describe, it, expect } from 'vitest'
import { concat } from '../src/util'

describe('Utility functions', () => {
  describe('concat', () => {
    it('should concatenate two strings', () => {
      const result = concat('Hello', ' World')
      expect(result).toBe('Hello World')
    })

    it('should concatenate empty strings', () => {
      const result = concat('', '')
      expect(result).toBe('')
    })

    it('should concatenate with one empty string', () => {
      const result1 = concat('Hello', '')
      const result2 = concat('', 'World')
      expect(result1).toBe('Hello')
      expect(result2).toBe('World')
    })

    it('should concatenate strings with special characters', () => {
      const result = concat('Hello!', '@#$%')
      expect(result).toBe('Hello!@#$%')
    })

    it('should concatenate strings with numbers', () => {
      const result = concat('Value: ', '123')
      expect(result).toBe('Value: 123')
    })

    it('should concatenate strings with whitespace', () => {
      const result = concat('  spaces  ', '  more spaces  ')
      expect(result).toBe('  spaces    more spaces  ')
    })
  })
})
