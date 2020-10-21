import styled from 'styled-components'

type WrappersTabs = {
    maxWidth?: number,
}

export const UniversalWrap = styled.div<WrappersTabs>`
    max-width: 600px;
    margin: 0 auto;
    max-width: ${props => props.maxWidth}px;
`