import useResizeObserver from './use-resize-observer'
import { debounce } from 'lib'
import { useCallback, useEffect, useRef, useState } from 'react'

// offsetTop function returns the offsetTop value of a DOM element.
// The offsetTop value is the distance between the top of the element
// and the top of the viewport.

function removeParentSticky(element) {
  const position = getComputedStyle(element).position

  const isSticky = position === 'sticky'

  if (isSticky) {
    element.style.setProperty('position', 'static')
    element.dataset.sticky = 'true'
  }

  if (element.offsetParent) {
    removeParentSticky(element.offsetParent)
  }
}

function addParentSticky(element) {
  if (element?.dataset?.sticky === 'true') {
    element.style.removeProperty('position')
    element.dataset.sticky = 'true'
    delete element.dataset.sticky
  }

  if (element.parentNode) {
    addParentSticky(element.parentNode)
  }
}

export function offsetTop(element, accumulator = 0) {
  const top = accumulator + element.offsetTop

  if (element.offsetParent) {
    return offsetTop(element.offsetParent, top)
  }
  return top
}

// offsetLeft function returns the offsetLeft value of a DOM element.
// The offsetLeft value is the distance between the left of the element
// and the left of the viewport.
export function offsetLeft(element, accumulator = 0) {
  const left = accumulator + element.offsetLeft
  if (element.offsetParent) {
    return offsetLeft(element.offsetParent, left)
  }
  return left
}

/**
 * useRect - observe an element's bounding rectangle
 * @param {boolean} ignoreTransform - include transformations in the returned rect
 * @param {boolean} ignoreSticky - ignore parent sticky elements
 * @param {boolean} lazy - return a state object or a getter function
 * @param {number} debounce - minimum delay between two rect computations
 * @param {number} resizeDebounce - minimum delay between two ResizeObserver callbacks
 * @param {Function} callback - called whenever the value changes
 * @param {Array} deps - props that should trigger a new rect computation
 */

function useRect(
  {
    ignoreTransform = false,
    ignoreSticky = true,
    lazy = false,
    debounce: debounceDelay = 500,
    resizeDebounce = debounceDelay,
    callback = () => {},
  } = {},
  deps = [],
) {
  const [element, setElement] = useState()
  const [rect, setRect] = useState({})
  const rectRef = useRef({})
  const [setResizeObserverElement] = useResizeObserver(
    {
      lazy: true,
      debounce: resizeDebounce,
      callback: (entry) => {
        // includes padding and border
        const width = entry.borderBoxSize[0].inlineSize
        const height = entry.borderBoxSize[0].blockSize

        rectRef.current.width = width
        rectRef.current.height = height

        callback(rectRef.current)

        if (!lazy) {
          setRect((rect) => ({
            ...rect,
            width,
            height,
          }))
        }
      },
    },
    [lazy, resizeDebounce, ...deps],
  )

  // resize if body height changes
  useEffect(() => {
    if (!element) return

    const onBodyResize = debounce(
      () => {
        let top, left

        if (ignoreSticky) removeParentSticky(element)
        if (ignoreTransform) {
          top = offsetTop(element)
          left = offsetLeft(element)
        } else {
          const rect = element.getBoundingClientRect()
          top = rect.top + window.scrollY
          left = rect.left + window.scrollX
        }
        if (ignoreSticky) addParentSticky(element)

        rectRef.current.top = top
        rectRef.current.left = left

        callback(rectRef.current)

        if (!lazy) {
          setRect((rect) => ({
            ...rect,
            top,
            left,
          }))
        }
      },
      debounceDelay,
      true,
    )
    const resizeObserver = new ResizeObserver(onBodyResize)
    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
      onBodyResize.cancel()
    }
  }, [element, lazy, debounceDelay, ignoreTransform, ignoreSticky, ...deps])

  const getRect = useCallback(() => rectRef.current, [])

  return [
    (node) => {
      setElement(node)
      setResizeObserverElement(node)
    },
    lazy ? getRect : rect,
  ]
}

export default useRect
