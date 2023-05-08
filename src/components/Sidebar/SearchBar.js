import React from 'react'
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

const SearchBar = ({ setSearchItem }) => {
  return (
    <Box p="10px" pt="0px">
      <InputGroup>
        <InputLeftElement
          focusBorderColor="whiteAlpha.800"
          pointerEvents="none"
          children={<Search2Icon color="gray.300" />}
        />
        <Input
          onChange={(event) => {
            setSearchItem(event.target.value)
          }}
          type="text"
          color="whiteAlpha.800"
          focusBorderColor="whiteAlpha.800"
          placeholder="Search all notes and tags"
        />
      </InputGroup>
    </Box>
  )
}

export default SearchBar
