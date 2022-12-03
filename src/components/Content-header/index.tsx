import React from 'react';
import SelectInput from '../SelectInput';
import { 
    Container,
    Title,
    Controllers } from './style';

interface IContentHeaderProps{
    title: string;
    lineColor: string;
    children: React.ReactNode
}

const ContentHeader: React.FC<IContentHeaderProps> = ({
    title, lineColor, children
}) =>{



    return( 
        <Container>
            <Title lineColor={lineColor}>
                <h1>{title}</h1>
            </Title>
            <Controllers>
                 {children}
            </Controllers>
        </Container>
    );
}

export default ContentHeader;