import styled from 'styled-components';

export const Container = styled.div`
    width: 48%;
    height: 260px;
    background-color: ${props => props.theme.color.tertiary};
    color: ${props => props.theme.color.white};
    border-radius:  7px;
    margin:  10px 0px;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >header img{
        width: 30px;
        margin-left: 7px;
    }

    >header p{
        font-size: 18px;
    }

    @media(max-width: 770px){
        width: 100%;
        
        > header h1 {
            font-size: 24px;
            img {
                height: 20px;
                width: 20px;
            }
        }
        > header p, > footer span {
            font-size: 14px;
        }
    }
    @media(max-width: 420px){
        width: 100%;
        height: auto;
        > header p {
            margin-bottom: 15px;
        }
    }
`;