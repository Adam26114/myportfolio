'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { SkillIcon } from './SkillIcon'
import { CodeXml, Eye, MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

    const openLink = (url: string) => {
        if (url) {
            window.open(url, '_blank')
        }
    }

    return (
        <article
            className={cn(
                'rounded-[10px] overflow-hidden bg-white p-4 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition',
                className,
            )}
            // ref={card.ref}
        >
            <div className="relative w-full rounded-[8px] overflow-hidden card-blur group">
                {!metaImage && <div className="">No image</div>}
                {metaImage && typeof metaImage !== 'string' && (
                    <Media resource={metaImage} size="33vw" />
                )}
                <div className="hidden group-hover:flex items-center gap-3 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] ">
                    {website && (
                        <Button
                            size="icon"
                            variant="default"
                            className="rounded-full bg-primary-foreground hover:bg-primary-foreground/90 text-primary z-40"
                            onClick={(e) => {
                                openLink(website || '');
                                e.stopPropagation();
                            }}
                        >
                            <Eye className="size-4 bold" />
                        </Button>
                    )}
                    {github && (
                        <Button
                            size="icon"
                            variant="default"
                            className="rounded-full bg-primary-foreground hover:bg-primary-foreground/90 text-primary z-40"
                            onClick={(e) => {
                                openLink(github || '');
                                e.stopPropagation();
                            }}
                        >
                            <CodeXml className="size-4 bold" />
                        </Button>
                    )}
                </div>
            </div>
            <div className="py-4 relative text-left">
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
                    <div className="mt-2 text-muted-foreground text-[0.9rem] line-clamp-2">
                        {description && <p>{sanitizedDescription}</p>}
                    </div>
                )}
                {type === 'project' && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            {skills?.map((skill, idx) => {
                                const skillData = typeof skill === 'number' ? null : skill
                                return <SkillIcon skill={skillData} index={idx} key={idx} />
                            })}
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                            <Link
                                href={href}
                                className="flex text-[14px]"
                                target="_blank"
                            >
                                Read More
                            </Link>
                            <MoveRight className="size-4" />
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}
