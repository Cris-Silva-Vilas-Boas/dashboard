import React from 'react';
import { Container } from './style';

interface IMenssageBoxProps{
    title: string;
    description: string;
    footerText: string;
    icon: string;
}

const MessageBox: React.FC<IMenssageBoxProps> = ({
    title,
    description,
    footerText,
    icon
}) =>{
    return( 
        <Container>
           <header>
                <h1> 
                    {title}
                    <img src={icon} alt="" />
                    <p>
                        {description}
                    </p>
                </h1>
           </header>
           <footer>
                <span>{footerText}</span>
           </footer>
        </Container>
    );
}

export default MessageBox;