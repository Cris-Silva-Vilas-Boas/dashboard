import React, { ButtonHTMLAttributes} from 'react';
import { Container } from './style';


type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;



const Button: React.FunctionComponent<IButtonProps>= ({children,...rest}) => {
    return( 
        <Container {...rest}>
            {children}
        </Container>
    ); 
}

export default Button;