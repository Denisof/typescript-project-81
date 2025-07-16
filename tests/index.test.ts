import { describe, it, expect, vi } from 'vitest'
import { main } from '../src/index'

describe('Main application', () => {
  describe('main function', () => {
    it('should run without errors and output expected content', () => {
      // Mock console.log to capture output
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

      // Run the main function
      main()

      // Verify console.log was called with expected outputs
      expect(consoleSpy).toHaveBeenCalledTimes(5)
      expect(consoleSpy).toHaveBeenNthCalledWith(1, '<img src="path/to/image" />')
      expect(consoleSpy).toHaveBeenNthCalledWith(2, '<input type="submit" value="Save" />')
      expect(consoleSpy).toHaveBeenNthCalledWith(3, '<label>Email</label>')
      expect(consoleSpy).toHaveBeenNthCalledWith(4, '<label for="email">Email</label>')
      expect(consoleSpy).toHaveBeenNthCalledWith(5, '<div></div>')

      // Restore console.log
      consoleSpy.mockRestore()
    })

    it('should demonstrate all tag types correctly', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

      main()

      // Verify we test both odd and even tags
      const calls = consoleSpy.mock.calls.flat()

      // Should have odd tags (self-closing)
      expect(calls).toContain('<img src="path/to/image" />')
      expect(calls).toContain('<input type="submit" value="Save" />')

      // Should have even tags (paired)
      expect(calls).toContain('<label>Email</label>')
      expect(calls).toContain('<label for="email">Email</label>')
      expect(calls).toContain('<div></div>')

      consoleSpy.mockRestore()
    })
  })
})
