import React, {useState, useMemo} from 'react';
import { Container ,Content} from './style';
import ContentHeader from '../../components/Content-header';
import SelectInput from '../../components/SelectInput';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months'
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import PieChart from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';


const Dashboard: React.FC = () =>{
    const[monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const[yearelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const months = useMemo(() =>{
        return listOfMonths.map((month, index) =>{
            return{
                value: index + 1,
                label: month
            }
        });
    },[]);


    const years = useMemo(() =>{
        let uniqueYears: number[] = [];
        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }
        });

        return uniqueYears.map(year => {
            return{
                value: year,
                label: year
            }
        });
    },[]);

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item =>{
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error("Invalid year value"); 
                }
            }
        })
        return total;
    }, [monthSelected,yearelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item =>{
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error("Invalid year value"); 
                }
            }
        })
        return total;
    }, [monthSelected,yearelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains,totalExpenses]);

    const message = useMemo(() => {
        if(totalBalance < 0 ){
            return {
                title: "Que triste!",
                description: "Neste mês você gastou mais do que deveria",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias",
                icon: sadImg
            }
        }
        else if(totalBalance == 0){
            return{
                title: "Uffa!",
                description: "Neste mês você gastou exatamente o que ganhou",
                footerText: "Tenha cuidade. No próximo mês tente poupar",
                icon: happyImg
            }
        }
        else{
            return{
                title: "Muito bem !",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim. Considere investir o seu saldo",
                icon: happyImg
            }
        }
    },[totalBalance])

    const relationGainsCurrentVersusEventual = useMemo(() =>{
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses
        .filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearelected;
        })
        .forEach((gain) => {
            if(gain.frequency === 'recorrente'){
                return amountRecurrent += Number(gain.amount);
            }

            if(gain.frequency === 'eventual'){
                return amountEventual += Number(gain.amount);
            }
        });

        const total = amountRecurrent + amountEventual;
        const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1))
        const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1))
        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent:recurrentPercent ? recurrentPercent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent:  eventualPercent ? eventualPercent : 0,
                color: "#E44C4E"
            }
        ];
    },[monthSelected, yearelected]);

    const relationExpensevesCurrentVersusEventual = useMemo(() =>{
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses
        .filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearelected;
        })
        .forEach((expense) => {
            if(expense.frequency === 'recorrente'){
                return amountRecurrent += Number(expense.amount);
            }

            if(expense.frequency === 'eventual'){
                return amountEventual += Number(expense.amount);
            }
        });

        const total = amountRecurrent + amountEventual;
        const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1))
        const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1))

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: eventualPercent ? eventualPercent : 0,
                color: "#E44C4E"
            }
        ];
    },[monthSelected, yearelected]);


    const relationExpensesVersusGains = useMemo(() =>{
        const total = totalGains + totalExpenses;
        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpenses / total) * 100;

        const data = [
            {
                name: "Entradas",
                value: totalExpenses,
                percent: Number(percentGains.toFixed(1)),
                color: '#E44C4E'
            },

            {
                name: "Saídas",
                value: totalGains,
                percent: Number(percentExpenses.toFixed(1)),
                color: '#F7931B'
            },
        ];
        return data;
    },[totalGains.toFixed(1),totalExpenses.toFixed(1)]);

    const historyData = useMemo(() => {
        return listOfMonths
        .map((_, month) => {
            
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === yearelected){
                    try{
                        amountEntry += Number(gain.amount);
                    }catch{
                        throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === yearelected){
                    try{
                        amountOutput += Number(expense.amount);
                    }catch{
                        throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                    }
                }
            });


            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }
        })
        .filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return (yearelected === currentYear && item.monthNumber <= currentMonth) || (yearelected < currentYear)
        });
    },[yearelected]);

    const handleMonthSelected = (month: string) =>{
        try{
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }catch(error){
            throw new Error('Invalid month value.Is accept 0 - 24');
        }
    }

    const handleYearSelected = (year: string) =>{
        try{
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }catch(error){
            throw new Error('Invalid year value');
        }
    }

    return( 
        <Container>
            <ContentHeader title="Dashboard" lineColor="#fff">
                <SelectInput 
                    options={months} 
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={monthSelected}
                 />
                 <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearelected}
                 />  
            </ContentHeader>

            <Content>
                <WalletBox 
                    title="saldo"
                    color="#4E41F0"
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="dolar"

                />

                <WalletBox 
                    title="Entradas"
                    color="#F7931B"
                    amount={totalGains}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrow-up"

                />

                <WalletBox 
                    title="Saídas"
                    color="#e44c4e"
                    amount={totalExpenses}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrow-down"
                />

                <MessageBox 
                    title= {message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChart data={relationExpensesVersusGains}/>
       
                <BarChartBox
                    title="Saídas"
                    data={relationExpensevesCurrentVersusEventual}

                />
                 <BarChartBox
                    title="Entradas"
                    data={relationGainsCurrentVersusEventual}

                />
            </Content>
        </Container>
    );
}

export default Dashboard;