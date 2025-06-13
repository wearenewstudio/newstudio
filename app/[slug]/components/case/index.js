'use client'

import { BaseTextClass, Container, Grid, RenderMedia } from 'styles'
import { Fragment } from 'react'

/**
 * Fully‑finished, Safari‑safe + key‑collision‑free Case component
 * --------------------------------------------------------------
 * • Valid HTML (no nested <p>)
 * • Globally unique React keys for every list item
 * • Covers ALL Strapi slice variants in the design system
 * • Mobile-responsive: Stacks all content at the `sm` breakpoint.
 */

function InnerCol(props) {
  return (
    <div
      className="2xl:gap-(--desktop-5) grid gap-5 [grid-template-rows:_min-content]"
      {...props}
    />
  )
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
                // Use a wrapper to conditionally render different structures for mobile and desktop.
                // This correctly handles the `reverse` logic on desktop while forcing the desired mobile order.
                <Fragment key={baseKey}>
                  {/* Mobile Layout: Always Image then Text. Full width. */}
                  <div className="sm:hidden">
                    <Grid>
                      {media && (
                        <RenderMedia
                          data={media}
                          className={'col-span-12 h-fit'}
                        />
                      )}
                      {text && (
                        <p className={BaseTextClass('col-span-12')}>
                          <span>{text}</span>
                        </p>
                      )}
                    </Grid>
                  </div>

                  {/* Desktop Layout: Respects `reverse` order and grid styles. */}
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

              const leftContent = { m: l?.media?.data?.attributes, t: l?.text }
              const rightContent = { m: r?.media?.data?.attributes, t: r?.text }

              return (
                <Fragment key={baseKey}>
                  {/* Mobile Layout: A simple vertical stack. Each image and text is full-width. */}
                  <div className="flex flex-col gap-5 sm:hidden">
                    {/* Left side content */}
                    {leftContent.m && (
                      <RenderMedia data={leftContent.m} className="h-fit" />
                    )}
                    {leftContent.t && (
                      <p className={`${BaseTextClass()} mb-10`}>
                        <span>{leftContent.t}</span>
                      </p>
                    )}

                    {/* Right side content */}
                    {rightContent.m && (
                      <RenderMedia data={rightContent.m} className="h-fit" />
                    )}
                    {rightContent.t && (
                      <p className={BaseTextClass()}>
                        <span>{rightContent.t}</span>
                      </p>
                    )}
                  </div>

                  {/* Desktop Layout: The original two-column grid structure. */}
                  <div className="hidden gap-5 sm:grid sm:grid-cols-12">
                    {/* Left Side Column */}
                    <InnerCol
                      className={`col-start-1 col-span-${lSpan}`}
                      style={{ gridTemplateColumns: `repeat(${lSpan}, 1fr)` }}
                    >
                      {leftContent.m && (
                        <RenderMedia
                          data={leftContent.m}
                          style={{ gridColumn: '1 / -1' }}
                          className={'h-fit'}
                        />
                      )}
                      {leftContent.t && (
                        <p
                          className={BaseTextClass()}
                          style={{ gridColumn: '1 / 3' }}
                        >
                          <span>{leftContent.t}</span>
                        </p>
                      )}
                    </InnerCol>

                    {/* Right Side Column */}
                    <InnerCol
                      className={`col-start-${13 - rSpan} col-span-${rSpan}`}
                      style={{ gridTemplateColumns: `repeat(${rSpan}, 1fr)` }}
                    >
                      {rightContent.m && (
                        <RenderMedia
                          data={rightContent.m}
                          style={{ gridColumn: '1 / -1' }}
                          className={'h-fit'}
                        />
                      )}
                      {rightContent.t && (
                        <p
                          className={BaseTextClass()}
                          style={{ gridColumn: '1 / 3' }}
                        >
                          <span>{rightContent.t}</span>
                        </p>
                      )}
                    </InnerCol>
                  </div>
                </Fragment>
              )
            }

            /* ---------- project.4-4-4 ---------- */
            if (item.__component === 'project.4-4-4') {
              return (
                // Sets grid to 1 column on mobile and 12 on desktop.
                <Grid key={baseKey} className="grid-cols-1 sm:grid-cols-12">
                  {item.media.map((c, i) => {
                    const start = i * 4 + 1
                    const m = c?.media?.data?.attributes
                    const t = c?.text
                    return (
                      // Use a Fragment for the key, and let children inherit grid positioning.
                      // On mobile, each element will occupy a new row in the single-column grid.
                      <Fragment key={`${baseKey}-${i}`}>
                        {m && (
                          <RenderMedia
                            data={m}
                            style={{ gridColumn: `sm:${start} / span 4` }}
                            className={'h-fit'}
                          />
                        )}
                        {t && (
                          <p
                            className={BaseTextClass()}
                            style={{ gridColumn: `sm:${start} / span 4` }}
                          >
                            <span>{t}</span>
                          </p>
                        )}
                      </Fragment>
                    )
                  })}
                </Grid>
              )
            }

            /* ---------- project.12-4-4-4 ---------- */
            if (item.__component === 'project.12-4-4-4') {
              const { top = {}, bottom = [] } = item
              return (
                <Grid key={baseKey} className="grid-cols-1 sm:grid-cols-12">
                  {top.media?.data?.attributes && (
                    <RenderMedia
                      key={`${baseKey}-top-m`}
                      data={top.media.data.attributes}
                      style={{ gridColumn: 'sm:1 / -1' }}
                      className={'h-fit'}
                    />
                  )}
                  {top.text && (
                    <p
                      key={`${baseKey}-top-t`}
                      className={BaseTextClass()}
                      style={{ gridColumn: 'sm:1 / 3' }}
                    >
                      <span>{top.text}</span>
                    </p>
                  )}
                  {bottom.map((b, i) => (
                    <Fragment key={`${baseKey}-b-${i}`}>
                      {b.media?.data?.attributes && (
                        <RenderMedia
                          data={b.media.data.attributes}
                          style={{ gridColumn: `sm:${i * 4 + 1} / span 4` }}
                          className={'h-fit'}
                        />
                      )}
                      {b.text && (
                        <p
                          className={BaseTextClass()}
                          style={{ gridColumn: `sm:${i * 4 + 1} / span 2` }}
                        >
                          <span>{b.text}</span>
                        </p>
                      )}
                    </Fragment>
                  ))}
                </Grid>
              )
            }

            /* ---------- project.12-6-6 ---------- */
            if (item.__component === 'project.12-6-6') {
              const { top = {}, bottom = [] } = item
              return (
                <Grid key={baseKey} className="grid-cols-1 sm:grid-cols-12">
                  {top.media?.data?.attributes && (
                    <RenderMedia
                      key={`${baseKey}-top-m`}
                      data={top.media.data.attributes}
                      style={{ gridColumn: 'sm:1 / -1' }}
                      className={'h-fit'}
                    />
                  )}
                  {top.text && (
                    <p
                      key={`${baseKey}-top-t`}
                      className={BaseTextClass()}
                      style={{ gridColumn: 'sm:1 / 3' }}
                    >
                      <span>{top.text}</span>
                    </p>
                  )}
                  {bottom.map((b, i) => (
                    <Fragment key={`${baseKey}-b-${i}`}>
                      {b.media?.data?.attributes && (
                        <RenderMedia
                          data={b.media.data.attributes}
                          style={{ gridColumn: `sm:${i * 6 + 1} / span 6` }}
                          className={'h-fit'}
                        />
                      )}
                      {b.text && (
                        <p
                          className={BaseTextClass()}
                          style={{ gridColumn: `sm:${i * 6 + 1} / span 6` }}
                        >
                          <span>{b.text}</span>
                        </p>
                      )}
                    </Fragment>
                  ))}
                </Grid>
              )
            }

            /* ---------- project.6-6-6-6 ---------- */
            if (item.__component === 'project.6-6-6-6') {
              return (
                <Fragment key={baseKey}>
                  {/* Mobile Layout: Use flexbox for a reliable vertical stack, removing the Grid component. */}
                  <div className="gap-15 flex flex-col sm:hidden">
                    {item.media.map((c, i) => (
                      // Each image-text pair is a self-contained block.
                      <div
                        key={`${baseKey}-${i}-mobile`}
                        className="flex flex-col gap-5"
                      >
                        {c?.media?.data?.attributes && (
                          <RenderMedia
                            data={c.media.data.attributes}
                            className="h-fit"
                          />
                        )}
                        {c?.text && (
                          <p className={BaseTextClass()}>
                            <span>{c.text}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Desktop Layout: The original layout with complex grid-row and grid-column styling. */}
                  <div className="hidden sm:block">
                    <Grid>
                      {item.media.map((c, i) => {
                        const start = (i % 2) * 6 + 1
                        const row = Math.floor(i / 2) * 2 + 1
                        const m = c?.media?.data?.attributes
                        const t = c?.text
                        return (
                          <Fragment key={`${baseKey}-${i}-desktop`}>
                            {m && (
                              <RenderMedia
                                data={m}
                                style={{
                                  gridColumn: `${start} / span 6`,
                                  gridRow: row,
                                }}
                                className={'h-fit'}
                              />
                            )}
                            {t && (
                              <p
                                className={BaseTextClass()}
                                style={{
                                  gridColumn: `${start} / span 6`,
                                  gridRow: row + 1,
                                }}
                              >
                                <span>{t}</span>
                              </p>
                            )}
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
                  {/* Mobile Layout: Use flexbox to ensure a simple, full-width vertical stack. */}
                  <div className="gap-15 flex flex-col sm:hidden">
                    {item.media.map((c, i) => (
                      // Each image-text pair is a self-contained block.
                      <div
                        key={`${baseKey}-${i}-mobile`}
                        className="flex flex-col gap-5"
                      >
                        {c?.media?.data?.attributes && (
                          <RenderMedia
                            data={c.media.data.attributes}
                            className="h-fit"
                          />
                        )}
                        {c?.text && (
                          <p className={BaseTextClass()}>
                            <span>{c.text}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Desktop Layout: The original layout with its complex grid logic. */}
                  <div className="hidden sm:block">
                    <Grid>
                      {item.media.map((c, i) => {
                        const start = (i % 3) * 4 + 1
                        const row = Math.floor(i / 3) * 2 + 1
                        const m = c?.media?.data?.attributes
                        const t = c?.text
                        return (
                          <Fragment key={`${baseKey}-${i}-desktop`}>
                            {m && (
                              <RenderMedia
                                data={m}
                                style={{
                                  gridColumn: `${start} / span 4`,
                                  gridRow: row,
                                }}
                                className={'h-fit'}
                              />
                            )}
                            {t && (
                              <p
                                className={BaseTextClass()}
                                style={{
                                  gridColumn: `${start} / span 4`,
                                  gridRow: row + 1,
                                }}
                              >
                                <span>{t}</span>
                              </p>
                            )}
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
