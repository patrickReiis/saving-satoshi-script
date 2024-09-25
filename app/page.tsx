'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLang } from 'hooks'
import { useSearchParams } from 'next/navigation'
import { LessonInfo, OpCodeParser, HeroTitle, Icon } from 'ui'
import { SuccessNumbers } from 'types'

export default function Home() {
  const params = useSearchParams()
  const lang = useLang()
  const t = useTranslations(lang)
  const [success, setSuccess] = useState<boolean | SuccessNumbers>(0)
  const lesson = params.get('lesson')

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-tl from-[#486c72] to-[#516644]">
      <OpCodeParser success={success} setSuccess={setSuccess}>
        <LessonInfo>
          <div className="flex flex-col gap-5 font-nunito md:pt-5">
            <div className="flex flex-row gap-[15px]">
              <HeroTitle />
              <Icon icon="cross" className="flex items-center" />
              <h1 className="text-[24px] font-bold">
                {lesson ? t(`lesson.${lesson}.title`) : t('homepage.title')}
              </h1>
            </div>
            {lesson ? (
              <div className="text-[22px] font-medium opacity-80">
                <p>{t(`lesson.${lesson}.welcome`)}</p>
                <p className="mt-6">{t(`lesson.${lesson}.tips`)}</p>
              </div>
            ) : (
              <div className="text-[22px] font-medium opacity-80">
                <p>{t('homepage.welcome')}</p>
                <p className="mt-6">{t('homepage.examples_list.heading')}</p>
                <ul className="ml-2.5 list-inside list-disc">
                  <li>{t('homepage.examples_list.basic')}</li>
                  <li>{t('homepage.examples_list.multi_sig')}</li>
                  <li>{t('homepage.examples_list.timelock')}</li>
                </ul>
                <p className="mt-6">{t('homepage.links_list.heading')}</p>
                <ul className="ml-2.5 list-inside list-disc">
                  <li>
                    <Link
                      href="https://learnmeabitcoin.com/technical/script"
                      target="_blank"
                      className="underline"
                    >
                      {t('homepage.links_list.introduction')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://opcodeexplained.com/opcodes"
                      target="_blank"
                      className="underline"
                    >
                      {t('homepage.links_list.documentation')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://savingsatoshi.com"
                      target="_blank"
                      className="underline"
                    >
                      {t('homepage.links_list.saving_satoshi')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/saving-satoshi/saving-satoshi-script"
                      target="_blank"
                      className="underline"
                    >
                      {t('homepage.links_list.github')}
                    </Link>
                  </li>
                </ul>
                <p className="mt-6">
                  {t('homepage.abstractions_list.heading')}
                </p>
                <ul className="ml-2.5 list-inside list-disc">
                  <li>
                    <span className="rounded-sm bg-black/30 px-1 font-space-mono">
                      OP_PUSH
                    </span>{' '}
                    accepts data as{' '}
                    <span className="rounded-sm bg-black/30 px-1 font-space-mono">
                      SIG(anything)
                    </span>
                    ,{' '}
                    <span className="rounded-sm bg-black/30 px-1 font-space-mono">
                      PUBKEY(anything)
                    </span>
                    , or hex
                  </li>
                  <li>
                    <span className="rounded-sm bg-black/30 px-1 font-space-mono">
                      OP_PUSH
                    </span>{' '}
                    encompasses all{' '}
                    <span className="rounded-sm bg-black/30 px-1 font-space-mono">
                      OP_PUSHBYTES
                    </span>{' '}
                    opcodes
                  </li>
                </ul>
              </div>
            )}
          </div>
        </LessonInfo>
      </OpCodeParser>
    </div>
  )
}
