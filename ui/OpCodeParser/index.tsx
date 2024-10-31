'use client'

import { useDynamicHeight, useMediaQuery } from 'hooks'
import React, { useEffect, useState } from 'react'
import { ArrowsProvider } from 'state/ArrowsContext'
import { LessonDirection, OpRunnerTypes, LessonView } from 'types'
import { Lesson, LessonTabs } from 'ui'
import OpRunner from './OpRunner'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'

const tabData = [
  {
    id: 'info',
    text: 'Info',
  },
  {
    id: 'code',
    text: 'Code',
  },
  {
    id: 'execute',
    text: 'Execute',
  },
]

export default function OpCodeParser({
  children,
  readOnly,
  success,
  setSuccess,
  advancedChallenge,
  initialHeight,
  initialStackSuccess,
  nextStepMessage,
}: OpRunnerTypes) {
  const [activeView, setActiveView] = useState(LessonView.Info)
  const params = useSearchParams()
  const [decodedScript, setDecodedScript] = useState<string[]>([])

  useEffect(() => {
    const scriptParam = params.get('script')
    if (scriptParam) {
      setDecodedScript(decodeURIComponent(scriptParam).split(' '))
    } else {
      setDecodedScript([])
    }
  }, [params])

  useDynamicHeight()
  const isSmallScreen = useMediaQuery({ width: 767 })

  const handleViewChange = (view) => {
    setActiveView(view)
  }

  return (
    <Lesson
      direction={
        isSmallScreen ? LessonDirection.Vertical : LessonDirection.Horizontal
      }
      onViewChange={handleViewChange}
    >
      <LessonTabs items={tabData} classes="px-4 py-2 w-full" stretch={true} />
      {children}
      <div
        className={clsx(
          'h-[calc(100vh-48px)] border-white/25 md:h-[calc(100vh)] md:max-w-[50vw] md:border-l',
          {
            'hidden md:flex': activeView === LessonView.Info,
          }
        )}
      >
        <ArrowsProvider>
          <OpRunner
            readOnly={readOnly}
            answerScript={decodedScript}
            prePopulate={decodedScript.length > 0}
            initialStackSuccess={initialStackSuccess}
            success={success}
            initialHeight={initialHeight}
            advancedChallenge={advancedChallenge}
            setSuccess={setSuccess}
            nextStepMessage={nextStepMessage}
          />
        </ArrowsProvider>
      </div>
    </Lesson>
  )
}
