import React, {useMemo} from 'react';
import { Container } from './style'
import dollarImg from '../../assets/dollar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import CountUp from 'react-countup';

interface IWalletBoxProps{
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'dolar' | 'arrow-up' | 'arrow-down';
    color: string;
}

const WalletBox: React.FC <IWalletBoxProps> = ({
    title,
    amount,
    footerLabel,
    icon,
    color
}) =>{

    const iconSelected = useMemo(() => {
        switch (icon){
            case 'dolar': 
                return dollarImg;

            case 'arrow-up':
                return arrowUpImg;
            
            case 'arrow-down':
                return arrowDownImg;

            default:
                return undefined;
        }
    }, [icon]);

    return(
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>R$ </strong>
                <CountUp
                    end={amount}
                    separator="."
                    decimal=','
                    decimals={2}
                />
            </h1>
            <small>{footerLabel}</small>
            <img src={iconSelected} alt={title} />
        </Container>
    );
}

export default WalletBox;