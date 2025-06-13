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

function InnerCol(props) {
  // InnerCol is used by the original desktop layout and should remain unchanged.
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
                <Fragment key={baseKey}>
                  {/* Mobile Layout: Simple stack, always image then text. */}
                  <div className="flex flex-col gap-5 sm:hidden">
                    {media && <RenderMedia data={media} className={'h-fit'} />}
                    {text && (
                      <p className={BaseTextClass()}>
                        <span>{text}</span>
                      </p>
                    )}
                  </div>

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

              const side = (slot, span, start, tag) => {
                const m = slot?.media?.data?.attributes
                const t = slot?.text
                return (
                  <InnerCol
                    key={`${baseKey}-${tag}`}
                    style={{
                      gridColumn: `${start} / ${start + span}`,
                      gridTemplateColumns: `repeat(${span},1fr)`,
                    }}
                  >
                    {m && (
                      <RenderMedia
                        key={`${baseKey}-${tag}-m`}
                        data={m}
                        style={{ gridColumn: '1 / -1' }}
                        className={'h-fit'}
                      />
                    )}
                    {t && (
                      <p
                        key={`${baseKey}-${tag}-t`}
                        className={BaseTextClass()}
                        style={{ gridColumn: '1 / 3' }}
                      >
                        <span>{t}</span>
                      </p>
                    )}
                  </InnerCol>
                )
              }

              return (
                <Fragment key={baseKey}>
                  {/* Mobile Layout: All content from both sides stacked vertically. */}
                  <div className="flex flex-col gap-5 sm:hidden">
                    {l?.media?.data?.attributes && (
                      <RenderMedia
                        data={l.media.data.attributes}
                        className="h-fit"
                      />
                    )}
                    {l?.text && (
                      <p className={`${BaseTextClass()} mb-10`}>
                        <span>{l.text}</span>
                      </p>
                    )}
                    {r?.media?.data?.attributes && (
                      <RenderMedia
                        data={r.media.data.attributes}
                        className="h-fit"
                      />
                    )}
                    {r?.text && (
                      <p className={BaseTextClass()}>
                        <span>{r.text}</span>
                      </p>
                    )}
                  </div>

                  {/* Desktop Layout: Original side-by-side grid. */}
                  <div className="hidden sm:block">
                    <Grid>
                      {side(l, lSpan, 1, 'left')}
                      {side(r, rSpan, 13 - rSpan, 'right')}
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

                  <div className="hidden sm:block">
                    <Grid>
                      {item.media.map((c, i) => {
                        const start = i * 4 + 1
                        const m = c?.media?.data?.attributes
                        const t = c?.text
                        return (
                          <Fragment key={`${baseKey}-${i}-desktop`}>
                            {m && (
                              <RenderMedia
                                data={m}
                                style={{ gridColumn: `${start} / span 4` }}
                                className={'h-fit'}
                              />
                            )}
                            {t && (
                              <p
                                className={BaseTextClass()}
                                style={{ gridColumn: `${start} / span 4` }}
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

            /* ---------- project.12-4-4-4 ---------- */
            if (item.__component === 'project.12-4-4-4') {
              const { top = {}, bottom = [] } = item
              return (
                <Fragment key={baseKey}>
                  <div className="flex flex-col gap-5 sm:hidden">
                    {top.media?.data?.attributes && (
                      <RenderMedia
                        data={top.media.data.attributes}
                        className={'h-fit'}
                      />
                    )}
                    {top.text && (
                      <p className={`${BaseTextClass()} mb-10`}>
                        <span>{top.text}</span>
                      </p>
                    )}
                    {bottom.map((b, i) => (
                      <div
                        key={`${baseKey}-b-${i}-mobile`}
                        className="mt-10 flex flex-col gap-5"
                      >
                        {b.media?.data?.attributes && (
                          <RenderMedia
                            data={b.media.data.attributes}
                            className={'h-fit'}
                          />
                        )}
                        {b.text && (
                          <p className={BaseTextClass()}>
                            <span>{b.text}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="hidden sm:block">
                    <Grid>
                      {top.media?.data?.attributes && (
                        <RenderMedia
                          key={`${baseKey}-top-m`}
                          data={top.media.data.attributes}
                          style={{ gridColumn: '1 / -1' }}
                          className={'h-fit'}
                        />
                      )}
                      {top.text && (
                        <p
                          key={`${baseKey}-top-t`}
                          className={BaseTextClass()}
                          style={{ gridColumn: '1 / 3' }}
                        >
                          <span>{top.text}</span>
                        </p>
                      )}
                      {bottom.map((b, i) => (
                        <Fragment key={`${baseKey}-b-${i}-desktop`}>
                          {b.media?.data?.attributes && (
                            <RenderMedia
                              data={b.media.data.attributes}
                              style={{ gridColumn: `${i * 4 + 1} / span 4` }}
                              className={'h-fit'}
                            />
                          )}
                          {b.text && (
                            <p
                              className={BaseTextClass()}
                              style={{ gridColumn: `${i * 4 + 1} / span 2` }}
                            >
                              <span>{b.text}</span>
                            </p>
                          )}
                        </Fragment>
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
                    {top.media?.data?.attributes && (
                      <RenderMedia
                        data={top.media.data.attributes}
                        className={'h-fit'}
                      />
                    )}
                    {top.text && (
                      <p className={`${BaseTextClass()} mb-10`}>
                        <span>{top.text}</span>
                      </p>
                    )}
                    {bottom.map((b, i) => (
                      <div
                        key={`${baseKey}-b-${i}-mobile`}
                        className="mt-10 flex flex-col gap-5"
                      >
                        {b.media?.data?.attributes && (
                          <RenderMedia
                            data={b.media.data.attributes}
                            className={'h-fit'}
                          />
                        )}
                        {b.text && (
                          <p className={BaseTextClass()}>
                            <span>{b.text}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="hidden sm:block">
                    <Grid>
                      {top.media?.data?.attributes && (
                        <RenderMedia
                          key={`${baseKey}-top-m`}
                          data={top.media.data.attributes}
                          style={{ gridColumn: '1 / -1' }}
                          className={'h-fit'}
                        />
                      )}
                      {top.text && (
                        <p
                          key={`${baseKey}-top-t`}
                          className={BaseTextClass()}
                          style={{ gridColumn: '1 / 3' }}
                        >
                          <span>{top.text}</span>
                        </p>
                      )}
                      {bottom.map((b, i) => (
                        <Fragment key={`${baseKey}-b-${i}-desktop`}>
                          {b.media?.data?.attributes && (
                            <RenderMedia
                              data={b.media.data.attributes}
                              style={{ gridColumn: `${i * 6 + 1} / span 6` }}
                              className={'h-fit'}
                            />
                          )}
                          {b.text && (
                            <p
                              className={BaseTextClass()}
                              style={{ gridColumn: `${i * 6 + 1} / span 6` }}
                            >
                              <span>{b.text}</span>
                            </p>
                          )}
                        </Fragment>
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
                  <div className="gap-15 flex flex-col sm:hidden">
                    {item.media.map((c, i) => (
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
