import {defineField, defineType} from 'sanity'

export const playerType = defineType({
  name: 'player',
  title: 'Player',
  type: 'document',
  preview: {
    select: {
      name: 'name',
      playerClass: 'class',
      image: 'image',
    },
    prepare({name, playerClass, image}) {
      return {
        title: name,
        subtitle: playerClass,
        media: image,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', slugify: (input) => String(input).trim().replace(/\s+/g, '-')},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'class',
      title: 'Class',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({
      name: 'teams',
      title: 'Teams',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'team'}]}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'goals', title: 'Goals', type: 'number'}),
    defineField({name: 'assists', title: 'Assists', type: 'number'}),
  ],
})
