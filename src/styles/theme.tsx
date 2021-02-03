import styled from 'styled-components';


export const UniversalThemeComponent = styled.div`
    background: ${props => (props.theme.mode === 'dark' ? '#2B2B2B' : '#ffffff')};
    color: ${props => (props.theme.mode === 'dark' ? '#ffffff' : '#474B59;')};
    
    & h1, h2, h3 {
        color: ${props => (props.theme.mode === 'dark' ? '#ffffff' : '#474B59;')};
    }
   
    & a {
        color: ${props => (props.theme.mode === 'dark' ? '#ffffff' : '#474B59;')};
    }

    & a.active svg{
        color: #0078D4;
    }
    
    & svg {
        color: ${props => (props.theme.mode === 'dark' ? '#ffffff' : '#474B59;')};
    }
`

export const HeaderStyle = styled(UniversalThemeComponent)`
 border-bottom: 1px solid ${props => (props.theme.mode === 'dark') ? '#3C3F41' : 'lightgray'};
`

export const SearchContainerStyle = styled(UniversalThemeComponent)`
     background: ${props => (props.theme.mode === 'dark' ? '#3C3F41' : '#E7EBF0')};
     
     & input {
        background: ${props => (props.theme.mode === 'dark' ? '#3C3F41' : '#E7EBF0')};
        color: ${props => (props.theme.mode === 'dark' ? '#fff' : '#000')};
    }
`

export const NavigationStyle = styled(UniversalThemeComponent)`
    & a{
         border-right: ${props => (props.theme.mode === 'dark' ? '1px solid #3C3F41' : '1px solid lightgray')};
    }
    
    & a:first-child {
            border-left: ${props => (props.theme.mode === 'dark' ? '1px solid #3C3F41' : '1px solid lightgray')};
    }

    & a.active{
        background: ${props => (props.theme.mode === 'dark' ? '#202020' : '#f2f2f2')};
    } 
`

export const AdaptiveNav = styled.div`
     background: ${props => (props.theme.mode === 'dark' ? '#2B2B2B' : '#ffffff')};
     border-top: 1px solid ${props => (props.theme.mode === 'dark') ? '#3C3F41' : 'lightgray'};
     
     & svg {
           color: ${props => (props.theme.mode === 'dark' ? '#ffffff' : '#474B59;')};
     }
`

export const ProfileItemStyled = styled(UniversalThemeComponent)`
    border: ${props => (props.theme.mode === 'dark' ? '1px solid #2B2B2B' : '1px solid lightgray;')};
    svg {
        color: #0078D4;
    }
`

export const PagitatorItemStyled = styled(ProfileItemStyled)``

export const UserItemStyled = styled(ProfileItemStyled)`
    & button {
        color:  ${props => props.theme.mode === 'dark' ? '#fff' : '#2B2B2B'};
    }
    
    & button.unfollow{
        border: 1px solid #2B5278;
        color: #fff;
        background: #2B5278;
    }

    & button:disabled{
        background: lightgrey;
        border: 1px solid lightgrey;
        color: #fff;
    }
`

export const PostsItemStyled = styled(ProfileItemStyled)`
    & textarea {
        background:  ${props => props.theme.mode === 'dark' ? '#2B2B2B' : '#fff'};
        color:  ${props => (props.theme.mode === 'dark' ? '#fff' : '#000')};
        margin-bottom: 10px;
        border-radius: 0px;
    }
    
    & .Content {
        border-bottom: 1px solid ${props => (props.theme.mode === 'dark' ? '#3C3F41' : 'lightgray')};
        border-top: 1px solid ${props => (props.theme.mode === 'dark' ? '#3C3F41' : 'lightgray')};
    }
`

export const LoginWrapStyled = styled(UniversalThemeComponent)`
    position: absolute;
    top: 57px;
    right: 0;
    width: 30%;
    height: calc(100% - 57px);
    border-top: 1px solid ${props => (props.theme.mode === 'dark' ? '#3C3F41' : 'lightgray')}; 
    
    @media(max-width: 1250px){
        & {
            width: 40%;
        }
    }
    
    @media(max-width: 820px){
        & {
            width: 100%;
        }
    }
    
     @media(max-width: 640px){
        & {
            z-index: 9999;
            top: 0;
            height: calc(100% - 53px);
        }
    }
    
`
