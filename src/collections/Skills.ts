import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
    slug: 'skills',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
            name: 'icon',
            type: 'upload',
            relationTo: 'media',
            label: 'Icon',
            required: true,
        },
        {
            name: 'label',
            type: 'text',
            label: 'Label',
            required: true,
        },
    ],
    admin: {
        useAsTitle: 'label',
    },
}
