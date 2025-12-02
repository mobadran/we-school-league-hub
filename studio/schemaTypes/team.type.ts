import {defineField, defineType} from 'sanity'

export const teamType = defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  preview: {
    select: {
      teamClass: 'class',
      image: 'image',
      group: 'group',
    },
    prepare({teamClass, image, group}) {
      return {
        title: 'Class ' + teamClass,
        subtitle: 'Group ' + group,
        media: image,
      }
    },
  },
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'class',
        slugify: (input) => String(input).trim().replace(/\s+/g, '-'),
      },
    }),
    defineField({
      name: 'class',
      title: 'Class',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      // validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'points',
    //   title: 'النقاط',
    //   type: 'number',
    // }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],
})
