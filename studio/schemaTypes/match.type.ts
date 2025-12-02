import {defineField, defineType} from 'sanity'

export const matchType = defineType({
  name: 'match',
  title: 'Match',
  type: 'document',
  preview: {
    select: {
      team1: 'team1.class',
      team2: 'team2.class',
      date: 'date',
      image: 'image',
    },
    prepare({team1, team2, date, image}) {
      return {
        title: `${team1 || '?'} X ${team2 || '?'}`,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date set',
        media: image,
      }
    },
  },
  fields: [
    defineField({
      name: 'team1',
      title: 'Team 1',
      type: 'reference',
      to: [{type: 'team'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'team2',
      title: 'Team 2',
      type: 'reference',
      to: [{type: 'team'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) =>
          `${doc.team1?._ref || 'match'}-${doc.team2?._ref || ''}-${doc.date || ''}`,

        slugify: (input) => String(input).trim().replace(/\s+/g, '-'),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({name: 'scoreTeam1', title: 'Score Team 1', type: 'number'}),
    defineField({name: 'scoreTeam2', title: 'Score Team 2', type: 'number'}),
    defineField({name: 'wentToPenalties', title: 'Went To Penalties?', type: 'boolean'}),
    defineField({name: 'penaltyTeam1', title: 'Penalty Team 1', type: 'number'}),
    defineField({name: 'penaltyTeam2', title: 'Penalty Team 2', type: 'number'}),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
    }),
  ],
})
