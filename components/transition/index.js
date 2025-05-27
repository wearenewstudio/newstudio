export function slideInOut(e) {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: 'translateY(0)',
      },
      {
        opacity: 0,
        transform: 'translateY(-50%) scale(0.5)',
      },
    ],
    {
      duration: 1500,
      easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)',
    },
  )

  document.documentElement.animate(
    [
      {
        transform: 'translateY(100%)',
      },
      {
        transform: 'translateY(0)',
      },
    ],
    {
      duration: 1500,
      easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}
