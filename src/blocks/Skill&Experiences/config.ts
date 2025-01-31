import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const SkillsExperiencesBlock: Block = {
    slug: 'skillsExperiences',

    fields: [
        {
            name: 'skills',
            type: 'relationship',
            label: 'Related Skills',
            relationTo: 'skills',
            required: true,
            hasMany: true,
        },
        {
            name: 'experiences',
            type: 'array',
            label: 'Experiences',
            fields: [
                {
                    name: 'role',
                    type: 'text',
                    label: 'Role',
                    required: true,
                },
                {
                    name: 'company',
                    type: 'group',
                    label: 'Company',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            label: 'Name',
                            required: true,
                        },
                        {
                            name: 'desc',
                            type: 'richText',
                            label: 'Description',
                            editor: lexicalEditor(),
                        },
                        {
                            name: 'website',
                            type: 'text',
                            label: 'Website',
                        },
                    ],
                },
                {
                    name: 'resume',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'startDate',
                    type: 'date',
                    required: true,
                },
                {
                    name: 'endDate',
                    type: 'date',
                },
                {
                    name: 'isCurrent',
                    type: 'checkbox',
                    defaultValue: false,
                },
            ],
        },
    ],
    interfaceName: 'SkillsExperiencesBlock',
    labels: {
        plural: 'Skills & Experiences Blocks',
        singular: 'Skills & Experiences Block',
    },
}
