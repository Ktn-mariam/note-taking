import React, { useContext } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import NoteListContext from '../helpers/context'

const Item = ({ title, content, id }) => {
  const noteCtx = useContext(NoteListContext)
  return (
    <Flex
      p={content.length === 0 || title.length === 0 ? '20px' : '10px'}
      bgColor={noteCtx.current === id ? '#4A4E69' : '#363852'}
      direction="column"
      onClick={() => {
        noteCtx.updateCurrent(id)
      }}
      _hover={{
        cursor: 'pointer',
        bgColor: `${noteCtx.current === id ? '#4A4E69' : '#40435e'}`,
      }}
    >
      {content.length === 0 && title.length === 0 ? (
        <Box pl="10px" fontWeight="bold" color="white">
          New Note...
        </Box>
      ) : (
        <>
          <Box pl="10px" fontWeight="bold" color="white">
            {title.length > 25 ? `${title.substring(0, 24)}...` : title}
          </Box>
          <Box pl="10px" color="whiteAlpha.700">
            {content.length > 17 ? `${content.substring(0, 16)}...` : content}
          </Box>
        </>
      )}
    </Flex>
  )
}

export default Item
