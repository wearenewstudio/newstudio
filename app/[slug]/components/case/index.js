'use client'

import { BaseTextClass, Container, Grid, RenderMedia } from 'styles'
import { Fragment } from 'react'

/**
 * Fully‑finished, Safari‑safe + key‑collision‑free Case component
 * --------------------------------------------------------------
 * • Mobile-first: Uses a simple flexbox stack for mobile (`sm` and below).
 * • Desktop: Uses the original, complex grid layout for larger screens.
 * • A separate layout is rendered for mobile vs. desktop to prevent style conflicts.
 */

// Helper: Render an image with its text below (if any)
function MediaWithText({ media, text, className = '', style = {}, textClass = '', textStyle = {} }) {
  if (!media && !text) return null
  return (
    <div className={className} style={style}>
      {media && <RenderMedia data={media} className={'h-fit'} />}
      {text && (
        <p className={`${BaseTextClass()} ${textClass}`} style={textStyle}>
          <span>{text}</span>
        </p>
      )}
    </div>
  )
}

// Helper: For desktop, render a grid row of image+text pairs
function GridRow({ items, colSpan, startCol = 1, row = 1, keyPrefix = '' }) {
  return items.map((c, i) => {
    const m = c?.media?.data?.attributes
    const t = c?.text
    const col = startCol + i * colSpan
    return (
      <Fragment key={`${keyPrefix}-${i}`}>
        {m && (
          <RenderMedia
            data={m}
            style={{ gridColumn: `${col} / span ${colSpan}`, gridRow: row }}
            className={'h-fit'}
          />
        )}
        {t && (
          <p
            className={BaseTextClass()}
            style={{ gridColumn: `${col} / span ${colSpan}`, gridRow: row + 1 }}
          >
            <span>{t}</span>
          </p>
        )}
      </Fragment>
    )
  })
}

export default function Case({ data }) {
  return (
    <section className="relative">
      <Container>
        <div className="2xl:gap-(--desktop-15) gap-15 flex flex-col">
          {data?.map((item, index) => {
            const baseKey = `${item.__component}-${item?.id ?? index}`

            /* ---------- project.single-image ---------- */
            if (item.__component === 'project.single-image') {
              const { layout, reverse, media: wrap } = item
              const media = wrap?.media?.data?.attributes
              const text = wrap?.text ?? ''
              const span = +/(\d+)/.exec(layout)?.[1] || 12
              const textStyle =
                span >= 10 || reverse
                  ? { gridColumn: '1 / 3' }
                  : { gridColumn: '11 / 13' }
              const mediaStyle = reverse
                ? { gridColumn: `${13 - span} / 13` }
                : { gridColumn: `1 / ${span + 1}` }

              return (
                <Fragment key={baseKey}>
                  {/* Mobile Layout: Simple stack, always image then text. */}
                  <MediaWithText media={media} text={text} className="flex flex-col gap-5 sm:hidden" />

                  {/* Desktop Layout: Original code, preserving reverse logic and grid styles. */}
                  <div className="hidden sm:block">
                    <Grid>
                      {reverse && text && (
                        <p className={BaseTextClass()} style={textStyle}>
                          <span>{text}</span>
                        </p>
                      )}
                      <RenderMedia
                        className={'h-fit'}
                        data={media}
                        style={mediaStyle}
                      />
                      {!reverse && text && (
                        <p className={BaseTextClass()} style={textStyle}>
                          <span>{text}</span>
                        </p>
                      )}
                    </Grid>
                  </div>
                </Fragment>
              )
            }

            /* ---------- project.double-media ---------- */
            if (item.__component === 'project.double-media') {
              const { layout, reverse, media: wrap } = item
              const [l, r] = wrap
              const match = layout.match(/\[(\d+)\]\s*(?:\|\s*)?\[(\d+)\]/)
              let [lSpan, rSpan] = match ? [+match[1], +match[2]] : [12, 12]
              if (reverse) [lSpan, rSpan] = [rSpan, lSpan]

              return (
                <Fragment key={baseKey}>
                  {/* Mobile Layout: All content from both sides stacked vertically. */}
                  <div className="flex flex-col gap-5 sm:hidden">
                    <MediaWithText media={l?.media?.data?.attributes} text={l?.text} />
                    <MediaWithText media={r?.media?.data?.attributes} text={r?.text} />
                  </div>

                  {/* Desktop Layout: Original side-by-side grid. */}
                  <div className="hidden sm:block">
                    <Grid>
                      <MediaWithText
                        media={l?.media?.data?.attributes}
                        text={l?.text}
                        style={{ gridColumn: `1 / span ${lSpan}` }}
                      />
                      <MediaWithText
                        media={r?.media?.data?.attributes}
                        text={r?.text}
                        style={{ gridColumn: `${13 - rSpan} / span ${rSpan}` }}
                      />
                    </Grid>
                  </div>
                </Fragment>
              )
            }

            /* All subsequent components follow the same pattern:
               1. A simple flexbox stack for mobile.
               2. The original, untouched grid code for desktop.
            */

            /* ---------- project.4-4-4 ---------- */
            if (item.__component === 'project.4-4-4') {
              return (
                <Fragment key={baseKey}>
                  <div className="gap-15 flex flex-col sm:hidden">
                    {item.media.map((c, i) => (
                      <MediaWithText
                        key={`${baseKey}-${i}-mobile`}
                        media={c?.media?.data?.attributes}
                        text={c?.text}
                        className="flex flex-col gap-5"
                      />
                    ))}
                  </div>

                  <div className="hidden sm:block">
                    <Grid>
                      {item.media.map((c, i) => (
                        <MediaWithText
                          key={`${baseKey}-${i}-desktop`}
                          media={c?.media?.data?.attributes}
                          text={c?.text}
                          style={{ gridColumn: `${i * 4 + 1} / span 4` }}
                        />
                      ))}
                    </Grid>
                  </div>
                </Fragment>
              )
            }

            /* ---------- project.12-4-4-4 ---------- */
            if (item.__component === 'project.12-4-4-4') {
              const { top = {}, bottom = [] } = item
              return (
                <Fragment key={baseKey}>
                  <div className="flex flex-col gap-5 sm:hidden">
                    <MediaWithText media={top.media?.data?.attributes} text={top.text} className="mb-10" />
                    {bottom.map((b, i) => (
                      <MediaWithText
                        key={`${baseKey}-b-${i}-mobile`}
                        media={b.media?.data?.attributes}
                        text={b.text}
                        className="mt-10"
                      />
                    ))}
                  </div>

                  <div className="hidden sm:block">
                    <Grid>
                      <MediaWithText
                        media={top.media?.data?.attributes}
                        text={top.text}
                        style={{ gridColumn: '1 / -1' }}
                        className="mb-10"
                      />
                      {bottom.map((b, i) => (
                        <MediaWithText
                          key={`${baseKey}-b-${i}-desktop`}
                          media={b.media?.data?.attributes}
                          text={b.text}
                          style={{ gridColumn: `${i * 4 + 1} / span 4` }}
                        />
                      ))}
                    </Grid>
                  </div>
                </Fragment>
              )
            }

            /* ---------- project.12-6-6 ---------- */
            if (item.__component === 'project.12-6-6') {
              const { top = {}, bottom = [] } = item
              return (
                <Fragment key={baseKey}>
                  <div className="flex flex-col gap-5 sm:hidden">
                    <MediaWithText media={top.media?.data?.attributes} text={top.text} className="mb-10" />
                    {bottom.map((b, i) => (
                      <MediaWithText
                        key={`${baseKey}-b-${i}-mobile`}
                        media={b.media?.data?.attributes}
                        text={b.text}
                        className="mt-10"
                      />
                    ))}
                  </div>

                  <div className="hidden sm:block">
                    <Grid>
                      <MediaWithText
                        media={top.media?.data?.attributes}
                        text={top.text}
                        style={{ gridColumn: '1 / -1' }}
                        className="mb-10"
                      />
                      {bottom.map((b, i) => (
                        <MediaWithText
                          key={`${baseKey}-b-${i}-desktop`}
                          media={b.media?.data?.attributes}
                          text={b.text}
                          style={{ gridColumn: `${i * 6 + 1} / span 6` }}
                        />
                      ))}
                    </Grid>
                  </div>
                </Fragment>
              )
            }

            /* ---------- project.6-6-6-6 ---------- */
            if (item.__component === 'project.6-6-6-6') {
              return (
                <Fragment key={baseKey}>
                  <div className="gap-15 flex flex-col sm:hidden">
                    {item.media.map((c, i) => (
                      <MediaWithText
                        key={`${baseKey}-${i}-mobile`}
                        media={c?.media?.data?.attributes}
                        text={c?.text}
                        className="flex flex-col gap-5"
                      />
                    ))}
                  </div>

                  <div className="hidden sm:block">
                    <Grid>
                      {item.media.map((c, i) => {
                        const start = (i % 2) * 6 + 1
                        const row = Math.floor(i / 2) * 2 + 1
                        return (
                          <Fragment key={`${baseKey}-${i}-desktop`}>
                            <MediaWithText
                              media={c?.media?.data?.attributes}
                              text={c?.text}
                              style={{ gridColumn: `${start} / span 6`, gridRow: row }}
                            />
                          </Fragment>
                        )
                      })}
                    </Grid>
                  </div>
                </Fragment>
              )
            }

            /* ---------- project.4-4-4-4-4-4 ---------- */
            if (item.__component === 'project.4-4-4-4-4-4') {
              return (
                <Fragment key={baseKey}>
                  <div className="gap-15 flex flex-col sm:hidden">
                    {item.media.map((c, i) => (
                      <MediaWithText
                        key={`${baseKey}-${i}-mobile`}
                        media={c?.media?.data?.attributes}
                        text={c?.text}
                        className="flex flex-col gap-5"
                      />
                    ))}
                  </div>

                  <div className="hidden sm:block">
                    <Grid>
                      {item.media.map((c, i) => {
                        const start = (i % 3) * 4 + 1
                        const row = Math.floor(i / 3) * 2 + 1
                        return (
                          <Fragment key={`${baseKey}-${i}-desktop`}>
                            <MediaWithText
                              media={c?.media?.data?.attributes}
                              text={c?.text}
                              style={{ gridColumn: `${start} / span 4`, gridRow: row }}
                            />
                          </Fragment>
                        )
                      })}
                    </Grid>
                  </div>
                </Fragment>
              )
            }

            /* Fallback */
            return null
          })}
        </div>
      </Container>
    </section>
  )
}
