import {defineField, defineType} from 'sanity'

export const teamType = defineType({
  name: 'team',
  title: 'فريق',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'الاسم في الرابط',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        slugify: (input) => String(input).trim().replace(/\s+/g, '-'),
      },
    }),
    defineField({
      name: 'class',
      title: 'الصف',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'الصورة',
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
      title: 'المجموعة',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],
})
