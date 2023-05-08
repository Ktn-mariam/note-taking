import React, { useContext, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import SearchBar from './SearchBar'
import { AddIcon } from '@chakra-ui/icons'
import NoteList from './NoteList'
import NoteListContext from '../helpers/context'
import getTime from '../helpers/getTime'

const SideBar = () => {
  const noteCtx = useContext(NoteListContext)
  const [searchItem, setSearchItem] = useState(null)
  return (
    <Box bgColor="#363852">
      <Flex p="15px" justify="space-between">
        <Box color="white" fontWeight="bold">
          All Notes
        </Box>
        <AddIcon
          color="white"
          _hover={{
            cursor: 'pointer',
            boxShadow: 'rgba(255, 255, 255) 0px 7px 29px 0px;',
            bgColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
          }}
          onClick={() => {
            const arrIds = noteCtx.noteList.map((item) => {
              return item.id
            })
            let maxId = 0
            if (arrIds.length !== 0) {
              maxId = Math.max(...arrIds)
            }
            noteCtx.updateList(() => {
              return [
                {
                  id: maxId + 1,
                  title: '',
                  content: '',
                  time: getTime(),
                  tags: [],
                },
                ...noteCtx.noteList,
              ]
            })
            noteCtx.updateCurrent(() => {
              if (noteCtx.noteList.length !== 0) {
                const arrIds = noteCtx.noteList.map((item) => {
                  return item.id
                })
                const maxId = Math.max(...arrIds)
                console.log(`maxId: ${maxId}`)
                return maxId + 1
              }
              return 1
            })
          }}
        />
      </Flex>
      <SearchBar setSearchItem={setSearchItem} />
      <NoteList searchItem={searchItem} />
    </Box>
  )
}

export default SideBar
