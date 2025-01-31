import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const TestimonialBlock: Block = {
    slug: 'testimonial',
    fields: [
        {
            name: 'testimonials',
            type: 'array',
            label: 'Testimonials',
            fields: [
                {
                    name: 'profile',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Profile Image',
                    required: true,
                },
                {
                    name: 'person',
                    type: 'text',
                    label: 'Person Name',
                    required: true,
                },
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
                            label: 'Company Name',
                            required: true,
                        },
                        {
                            name: 'desc',
                            type: 'richText',
                            label: 'Company Description',
                            editor: defaultLexical,
                        },
                        {
                            name: 'website',
                            type: 'text',
                            label: 'Website',
                        },
                    ],
                },
                {
                    name: 'message',
                    type: 'richText',
                    label: 'Testimonial Message',
                    editor: defaultLexical,
                    required: true,
                },
            ],
        },
    ],
    interfaceName: 'TestimonialBlock',
    labels: {
        plural: 'Testimonial Blocks',
        singular: 'Testimonial Block',
    },
}
