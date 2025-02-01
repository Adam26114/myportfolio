'use client'
import React from 'react'
import { Media } from '@/components/Media'

import type { Skill } from '@/payload-types'
import { cn } from '@/utilities/ui'

export type SkillIconProps = {
    skill: Skill | null
    index: number
    className?: string
}

export const SkillIcon: React.FC<SkillIconProps> = ({ skill, index , className}) => {
    const skillData = typeof skill === 'number' ? null : skill

    return (
        <div
            className={cn("flex size-11 cursor-pointer items-center justify-center rounded-full mr-[-15px]", className)}
            style={{ zIndex: index }}
        >
            <div className="bg-background flex size-full items-center justify-center rounded-full p-0.5">
                <div className="bg-background border-secondary flex size-full items-center justify-center rounded-full border-[1.5px] z-2">
                    <div className=" size-full [backface-visibility:hidden]">
                        <div className="flex size-full items-center justify-center text-xl">
                            <div className="relative size-5">
                                {skillData &&
                                    skillData.icon &&
                                    typeof skillData.icon === 'object' && (
                                        <Media
                                            resource={skillData.icon}
                                            className="projects-icons absolute inset-0 rounded-[2px] overflow-hidden"
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
