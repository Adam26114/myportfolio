import React from 'react'
import { Media } from '@/components/Media'
import type { SkillsExperiencesBlock as SkillsExperiencesBlockProps } from '@/payload-types'
import { onlyYearFormatDate } from '@/utilities/utils'
import Link from 'next/link'

export const SkillsExperiencesBlock: React.FC<SkillsExperiencesBlockProps> = ({
    skills,
    experiences,
}) => {
    console.log(skills, 'skills')
    return (
        <div className="container mx-auto my-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {skills?.map((skill, index) => {
                            const skillData = typeof skill === 'number' ? null : skill

                            return (
                                <div key={index} className="flex flex-col items-center text-center">
                                    {skillData &&
                                        skillData.icon &&
                                        typeof skillData.icon === 'object' && (
                                            <div className="w-[80px] h-[80px] bg-secondary rounded-full flex justify-center items-center mb-2">
                                                <Media
                                                    resource={skillData.icon}
                                                    className="w-12 h-12 skills-icons"
                                                />
                                            </div>
                                        )}
                                    {typeof skill === 'number' && (
                                        <div className="w-[80px] h-[80px] bg-secondary rounded-full flex justify-center items-center mb-2">
                                            {/* If skill is a number (ID), display a placeholder or fetch the Skill object */}
                                            <span className="text-sm">Skill ID: {skill}</span>
                                        </div>
                                    )}
                                    <span className="text-sm">
                                        {skillData ? skillData.label : `Skill ID: ${skill}`}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-6">Experiences</h2>
                    <div className="space-y-4">
                        {experiences?.map((experience, index) => (
                            <div key={index} className="border-l-4 border-primary pl-4">
                                <p className="text-sm text-muted-foreground">
                                    {onlyYearFormatDate(experience.startDate)} -{' '}
                                    {experience.isCurrent
                                        ? 'Current'
                                        : onlyYearFormatDate(
                                              experience.endDate ? experience.endDate : '',
                                          )}
                                </p>
                                <h3 className="text-lg font-semibold">{experience.role}</h3>
                                <Link
                                    href={
                                        experience.company.website
                                            ? experience.company.website
                                            : '#'
                                    }
                                    className="text-sm"
                                    target="_blank"
                                >
                                    {experience.company.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
