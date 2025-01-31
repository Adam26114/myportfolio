import type { CollectionConfig } from 'payload'
import {
    BlocksFeature,
    FixedToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Posts: CollectionConfig<'posts'> = {
    slug: 'posts',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    defaultPopulate: {
        title: true,
        slug: true,
        categories: true,
        meta: {
            image: true,
            description: true,
        },
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
            url: ({ data, req }) => {
                const path = generatePreviewPath({
                    slug: typeof data?.slug === 'string' ? data.slug : '',
                    collection: 'posts',
                    req,
                })
                return path
            },
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'posts',
                req,
            }),
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'type',
            type: 'select',
            options: [
                {
                    label: 'Blog',
                    value: 'blog',
                },
                {
                    label: 'Project',
                    value: 'project',
                },
            ],
            defaultValue: 'blog',
            required: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        {
                            name: 'heroImage',
                            type: 'upload',
                            relationTo: 'media',
                        },
                        {
                            name: 'content',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        HeadingFeature({
                                            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
                                        }),
                                        BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                                        FixedToolbarFeature(),
                                        InlineToolbarFeature(),
                                        HorizontalRuleFeature(),
                                    ]
                                },
                            }),
                            label: false,
                            required: true,
                        },
                    ],
                    label: 'Content',
                },
                {
                    fields: [
                        {
                            name: 'relatedPosts',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            filterOptions: ({ id }) => {
                                return {
                                    id: {
                                        not_in: [id],
                                    },
                                }
                            },
                            hasMany: true,
                            relationTo: 'posts',
                        },
                        {
                            name: 'categories',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            hasMany: true,
                            relationTo: 'categories',
                        },
                    ],
                    label: 'Meta',
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        }),
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            relationTo: 'media',
                        }),
                        MetaDescriptionField({}),
                        PreviewField({
                            hasGenerateFn: true,
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                    ],
                },
            ],
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                position: 'sidebar',
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'authors',
            type: 'relationship',
            admin: {
                position: 'sidebar',
            },
            hasMany: true,
            relationTo: 'users',
        },
        {
            name: 'populatedAuthors',
            type: 'array',
            access: {
                update: () => false,
            },
            admin: {
                disabled: true,
                readOnly: true,
            },
            fields: [
                {
                    name: 'id',
                    type: 'text',
                },
                {
                    name: 'name',
                    type: 'text',
                },
            ],
        },
        {
            name: 'projectFields',
            type: 'group',
            admin: {
                condition: (data) => data.type === 'project', // Only show if type is 'project'
            },
            fields: [
                {
                    name: 'date',
                    type: 'date',
                    label: 'Project Date',
                    required: true,
                },
                {
                    name: 'website',
                    type: 'text',
                    label: 'Website URL',
                },
                {
                    name: 'github',
                    type: 'text',
                    label: 'GitHub URL',
                },
                {
                    name: 'techStacks',
                    type: 'group',
                    label: 'Tech Stacks',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            label: 'Name',
                        },
                        {
                            name: 'desc',
                            type: 'text',
                            label: 'Description',
                        },
                        {
                            name: 'skills',
                            type: 'relationship',
                            label: 'Related Skills',
                            relationTo: 'skills',
                            hasMany: true,
                        },
                    ],
                },
            ],
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidatePost],
        afterRead: [populateAuthors],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 100,
            },
        },
        maxPerDoc: 50,
    },
}
