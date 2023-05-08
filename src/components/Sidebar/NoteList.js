import React, { useContext } from 'react'
import { UnorderedList } from '@chakra-ui/react'
import Item from './Item'
import NoteListContext from '../helpers/context'

const NoteList = ({ searchItem }) => {
  const noteCtx = useContext(NoteListContext)
  return (
    <UnorderedList m="0px">
      {noteCtx.noteList
        .filter((item) => {
          if (searchItem !== null) {
            return (
              item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
              item.content.toLowerCase().includes(searchItem.toLowerCase()) ||
              item.tags.find((element) => {
                if (element.toLowerCase().includes(searchItem.toLowerCase())) {
                  return true
                }
                return false
              })
            )
          }
          return item
        })
        .map((item) => {
          return (
            <Item
              key={item.id}
              title={item.title}
              content={item.content}
              id={item.id}
            />
          )
        })}
    </UnorderedList>
  )
}

export default NoteList
