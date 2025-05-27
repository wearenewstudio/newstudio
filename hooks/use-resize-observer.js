import { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lib'

/**
 * useResizeObserver - observe elements dimensions using ResizeObserver
 * @param {Boolean} lazy - should return a state or not
 * @param {Number} debounce - minimum delay between two ResizeObserver computations
 * @param {String} box - ResizeObserver parameter
 * @param {Function} callback - called on value change
 * @param {Array} deps - props that should trigger a new computation
 */

export default function useResizeObserver(
  {
    lazy = false,
    debounce: debounceDelay = 500,
    box = 'border-box',
    callback = () => {},
  } = {},
  deps = [],
) {
  const entryRef = useRef({})
  const [entry, setEntry] = useState({})
  const [element, setElement] = useState()

  useEffect(() => {
    if (!element) return

    const onResize = debounce(
      ([entry]) => {
        entryRef.current = entry

        callback(entry)

        if (!lazy) {
          setEntry(entry)
        }
      },
      debounceDelay,
      true,
    )

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(element, { box })

    return () => {
      resizeObserver.disconnect()
      onResize.cancel()
    }
  }, [element, lazy, debounceDelay, box, ...deps])

  const get = useCallback(() => entryRef.current, [])

  return [setElement, lazy ? get : entry]
}
