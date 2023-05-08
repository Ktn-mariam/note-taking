import React, { useContext } from 'react'
import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react'
import NoteListContext from './helpers/context'
import getTime from './helpers/getTime'

const TagItem = ({ tag }) => {
  const noteCtx = useContext(NoteListContext)
  return (
    <Tag size="lg" borderRadius="full" variant="solid" bgColor="#363852">
      <TagLabel>{tag}</TagLabel>
      <TagCloseButton
        onClick={() => {
          noteCtx.updateList([
            ...noteCtx.noteList
              .filter((item) => {
                return item.id === noteCtx.current
              })
              .map((item) => {
                return {
                  ...item,
                  time: getTime(),
                  tags: [
                    ...item.tags.filter((item) => {
                      return item !== tag
                    }),
                  ],
                }
              }),
            ...noteCtx.noteList.filter((item) => {
              return item.id !== noteCtx.current
            }),
          ])
        }}
      />
    </Tag>
  )
}

export default TagItem
