'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<
    Post,
    'slug' | 'categories' | 'meta' | 'title' | 'projectFields' | 'type'
>

export const Card: React.FC<{
    alignItems?: 'center'
    className?: string
    doc?: CardPostData
    relationTo?: 'posts'
    showCategories?: boolean
    title?: string
}> = (props) => {
    const { card, link } = useClickableCard({})
    const { className, doc, relationTo, showCategories, title: titleFromProps } = props

    const { slug, categories, meta, title, projectFields, type } = doc || {}
    const { date, website, github, techStacks } = projectFields || {}
    const { skills } = techStacks || {}
    const { description, image: metaImage } = meta || {}

    const hasCategories = categories && Array.isArray(categories) && categories.length > 0
    const titleToUse = titleFromProps || title
    const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
    const href = `/${relationTo}/${slug}`

    console.log(projectFields, 'project')
    console.log(skills, 'project skills')

    return (
        <article
            className={cn(
                'border border-borderr rounded-[10px] overflow-hidden bg-white hover:cursor-pointer p-4 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition',
                className,
            )}
            ref={card.ref}
        >
            <div className="relative w-full rounded-[8px] overflow-hidden">
                {!metaImage && <div className="">No image</div>}
                {metaImage && typeof metaImage !== 'string' && (
                    <Media resource={metaImage} size="33vw" />
                )}
            </div>
            <div className="py-4 relative text-center">
                {showCategories && hasCategories && (
                    <div className="uppercase text-[13px] mb-4 absolute bg-white rounded-t-[4px] left-[50%] translate-x-[-50%] top-[-26px] py-1 px-3 text-muted-foreground hover:text-black">
                        {showCategories && hasCategories && (
                            <div>
                                {categories?.map((category, index) => {
                                    if (typeof category === 'object') {
                                        const { title: titleFromCategory } = category

                                        const categoryTitle =
                                            titleFromCategory || 'Untitled category'

                                        const isLast = index === categories.length - 1

                                        return (
                                            <Fragment key={index}>
                                                {categoryTitle}
                                                {!isLast && <Fragment>, &nbsp;</Fragment>}
                                            </Fragment>
                                        )
                                    }

                                    return null
                                })}
                            </div>
                        )}
                    </div>
                )}
                {titleToUse && (
                    <div className="prose">
                        <h3>
                            <Link className="not-prose" href={href} ref={link.ref}>
                                {titleToUse}
                            </Link>
                        </h3>
                    </div>
                )}
                {description && (
                    <div className="mt-2 text-muted-foreground text-[0.9rem]">{description && <p>{sanitizedDescription}</p>}</div>
                )}
                {type === 'project' && (
                    <div className="flex items-center gap-2">
                        {skills?.map((skill, idx) => {
                            const skillData = typeof skill === 'number' ? null : skill
                            return (
                                <div
                                    key={idx}
                                    className="border border-black/[.2] rounded-full bg-muted-foreground lg:w-12 lg:h-12 w-8 h-8 flex justify-center items-center"
                                    style={{
                                        transform: `translateX(-${5 * idx + 2}px)`,
                                    }}
                                >
                                    {skillData &&
                                        skillData.icon &&
                                        typeof skillData.icon === 'object' && (
                                            <Media
                                                resource={skillData.icon}
                                                className="projects-icons "
                                            />
                                        )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </article>
    )
}
