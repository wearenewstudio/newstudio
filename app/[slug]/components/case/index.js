'use client'

import { BaseTextClass, Container, Grid, RenderMedia } from 'styles'
import { Fragment } from 'react'

function InnerCol(props) {
  return (
    <div className="grid gap-5 [grid-template-rows:_min-content]" {...props} />
  )
}

export default function Case({ data }) {
  return (
    <section className="relative">
      <Container>
        <div className="flex flex-col gap-20">
          {data?.map((item, index) => {
            if (item.__component === 'project.single-image') {
              const { layout, reverse, media: mediaWrapper } = item
              const media = mediaWrapper?.media?.data?.attributes
              const text = mediaWrapper?.text

              const mediaMatch = layout.match(/\[(\d+)\]/)
              const mediaSpan = mediaMatch ? parseInt(mediaMatch[1], 10) : 12

              const textColumnStyle =
                mediaSpan >= 10
                  ? { gridColumn: '1 / 3' }
                  : reverse
                    ? { gridColumn: '1 / 3' }
                    : { gridColumn: '11 / 13' }

              // For the media area we use the remaining space.
              // For non-reversed: media takes columns 1 to (12 - 2)
              // For reversed: media takes columns 3 to 12.
              const mediaColumnStyle = reverse
                ? { gridColumn: `${12 - mediaSpan + 1} / 13` }
                : { gridColumn: `1 / ${mediaSpan + 1}` }

              return (
                <Grid key={index}>
                  {reverse ? (
                    <>
                      {text && (
                        <p className={BaseTextClass()} style={textColumnStyle}>
                          {text}
                        </p>
                      )}

                      <RenderMedia data={media} style={mediaColumnStyle} />
                    </>
                  ) : (
                    <>
                      <RenderMedia data={media} style={mediaColumnStyle} />

                      {text && (
                        <p className={BaseTextClass()} style={textColumnStyle}>
                          {text}
                        </p>
                      )}
                    </>
                  )}
                </Grid>
              )
            }
            if (item.__component === 'project.double-media') {
              const { layout, reverse, media: mediaWrapper } = item
              const leftMedia = mediaWrapper[0]?.media?.data?.attributes
              const rightMedia = mediaWrapper[1]?.media?.data?.attributes
              const leftText = mediaWrapper[0]?.text
              const rightText = mediaWrapper[1]?.text

              // Use a regex that captures two numbers in square brackets separated by either a space or a pipe
              const layoutMatch = layout.match(
                /\[(\d+)\]\s*(?:\|\s*)?\[(\d+)\]/,
              )
              let leftColumnSpan = layoutMatch
                ? parseInt(layoutMatch[1], 10)
                : 12
              let rightColumnSpan = layoutMatch
                ? parseInt(layoutMatch[2], 10)
                : 12

              // If reverse flag is true, swap the span variables
              if (reverse) {
                ;[leftColumnSpan, rightColumnSpan] = [
                  rightColumnSpan,
                  leftColumnSpan,
                ]
              }

              return (
                <Grid key={index}>
                  <InnerCol
                    style={{
                      gridColumn: `1 / ${leftColumnSpan + 1}`,
                      gridTemplateColumns: `repeat(${leftColumnSpan}, 1fr)`,
                    }}
                  >
                    <RenderMedia
                      data={leftMedia}
                      className="image-wrapper"
                      style={{ gridColumn: `1 / -1` }}
                    />
                    {leftText && (
                      <p
                        className={BaseTextClass()}
                        style={{ gridColumn: `1 / 3` }}
                      >
                        {leftText}
                      </p>
                    )}
                  </InnerCol>

                  <InnerCol
                    style={{
                      gridTemplateColumns: `repeat(${rightColumnSpan}, 1fr)`,
                      gridColumn: `${12 - rightColumnSpan + 1} / 13`,
                    }}
                  >
                    <RenderMedia
                      data={rightMedia}
                      className="image-wrapper"
                      style={{ gridColumn: `1 / -1` }}
                    />

                    {rightText && (
                      <p
                        className={BaseTextClass()}
                        style={{ gridColumn: `1 / 3` }}
                      >
                        <p>{rightText}</p>
                      </p>
                    )}
                  </InnerCol>
                </Grid>
              )
            }
            if (item.__component === 'project.4-4-4') {
              const allColumns = item?.media

              return (
                <Grid key={index}>
                  {allColumns.map((column, colIndex) => {
                    const media = column?.media?.data?.attributes

                    return (
                      <RenderMedia
                        key={colIndex}
                        data={media}
                        style={{ gridColumn: `${colIndex * 4 + 1} / span 4` }}
                      />
                    )
                  })}
                  {allColumns.map((column, colIndex) => {
                    const text = column?.text

                    if (text)
                      return (
                        <p
                          className={BaseTextClass()}
                          key={colIndex}
                          style={{ gridColumn: `${colIndex * 4 + 1} / span 4` }}
                        >
                          {text}
                        </p>
                      )

                    return null
                  })}
                </Grid>
              )
            }
            if (item.__component === 'project.12-4-4-4') {
              const bottomColumns = item?.bottom
              const topColMedia = item?.top?.media?.data?.attributes
              const topColText = item?.top?.text

              return (
                <Grid key={index}>
                  <RenderMedia
                    data={topColMedia}
                    style={{ gridColumn: `1 / -1` }}
                  />
                  {topColText && (
                    <p
                      className={BaseTextClass()}
                      style={{ gridColumn: `1 / 3` }}
                    >
                      {topColText}
                    </p>
                  )}
                  {bottomColumns.map((column, colIndex) => {
                    const media = column?.media?.data?.attributes

                    return (
                      <RenderMedia
                        key={colIndex}
                        data={media}
                        style={{ gridColumn: `${colIndex * 4 + 1} / span 4` }}
                      />
                    )
                  })}
                  {bottomColumns.map((column, colIndex) => {
                    const text = column?.text

                    if (text)
                      return (
                        <p
                          className={BaseTextClass()}
                          key={colIndex}
                          style={{ gridColumn: `${colIndex * 4 + 1} / span 2` }}
                        >
                          {text}
                        </p>
                      )

                    return null
                  })}
                </Grid>
              )
            }
            if (item.__component === 'project.12-6-6') {
              const topMedia = item?.top?.media?.data?.attributes
              const topText = item?.top?.text
              const bottomColumns = item?.bottom

              return (
                <Grid key={index}>
                  <RenderMedia
                    data={topMedia}
                    style={{ gridColumn: `1 / -1` }}
                  />
                  {topText && (
                    <p
                      className={BaseTextClass()}
                      style={{ gridColumn: `1 / 3` }}
                    >
                      {topText}
                    </p>
                  )}
                  {bottomColumns.map((column, colIndex) => {
                    const media = column?.media?.data?.attributes

                    return (
                      <RenderMedia
                        key={colIndex}
                        data={media}
                        style={{ gridColumn: `${colIndex * 6 + 1} / span 6` }}
                      />
                    )
                  })}
                  {bottomColumns.map((column, colIndex) => {
                    const text = column?.text

                    if (text)
                      return (
                        <p
                          className={BaseTextClass()}
                          key={colIndex}
                          style={{ gridColumn: `${colIndex * 6 + 1} / span 6` }}
                        >
                          {text}
                        </p>
                      )

                    return null
                  })}
                </Grid>
              )
            }
            if (item.__component === 'project.6-6-6-6') {
              const allColumns = item?.media

              return (
                <Grid key={index}>
                  {allColumns.map((column, colIndex) => {
                    const media = column?.media?.data?.attributes
                    const text = column?.text

                    const columnStart = (colIndex % 2) * 6 + 1
                    const pairIndex = Math.floor(colIndex / 2)

                    return (
                      <Fragment key={colIndex}>
                        {media && (
                          <RenderMedia
                            data={media}
                            style={{
                              gridColumn: `${columnStart} / span 6`,
                              gridRow: `${pairIndex * 2 + 1}`,
                            }}
                          />
                        )}
                        {text && (
                          <p
                            className={BaseTextClass()}
                            style={{
                              gridColumn: `${columnStart} / span 6`,
                              gridRow: `${pairIndex * 2 + 2}`,
                            }}
                          >
                            {text}
                          </p>
                        )}
                      </Fragment>
                    )
                  })}
                </Grid>
              )
            }
            if (item.__component === 'project.4-4-4-4-4-4') {
              const allColumns = item?.media

              return (
                <Grid key={index}>
                  {allColumns.map((column, colIndex) => {
                    const media = column?.media?.data?.attributes
                    const text = column?.text

                    const columnStart = (colIndex % 3) * 4 + 1
                    const pairIndex = Math.floor(colIndex / 3)

                    return (
                      <Fragment key={colIndex}>
                        {media && (
                          <RenderMedia
                            data={media}
                            style={{
                              gridColumn: `${columnStart} / span 4`,
                              gridRow: `${pairIndex * 2 + 1}`,
                            }}
                          />
                        )}
                        {text && (
                          <p
                            className={BaseTextClass()}
                            style={{
                              gridColumn: `${columnStart} / span 4`,
                              gridRow: `${pairIndex * 2 + 2}`,
                            }}
                          >
                            {text}
                          </p>
                        )}
                      </Fragment>
                    )
                  })}
                </Grid>
              )
            }
          })}
        </div>
      </Container>
    </section>
  )
}
