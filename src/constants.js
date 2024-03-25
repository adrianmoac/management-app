export const repeatOptions =[ 
    {
        time: 1,
        nombre: 'Cada día'
    },
    {
        time: 7,
        nombre: 'Cada 7 días'
    },
    {
        time: 14,
        nombre: 'Cada 14 días'
    },
    {
        time: 30,
        nombre: 'Cada mes'
    },
]

export const accounts =[
    {
        nombre: 'Ahorros'
    },
    {
        nombre: 'Disponible para gastos'
    }
]

export const today = day => {
    if (!day) {
        day = new Date().toISOString().slice(0, 10);
    }
    
    const currentDate = new Date(day);
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() - 2);

    const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
    const formattedNextDay = nextDay.toISOString().slice(0, 10);

    return [formattedNextDay, formattedCurrentDate];
}

export const week = (day) => {
    let completeDate = new Date(day)
    const dayOfWeek = completeDate.getDay()
    const startOfTheWeek = new Date(day)
    startOfTheWeek.setDate(completeDate.getDate() - 2);
    startOfTheWeek.setDate(startOfTheWeek.getDate() - dayOfWeek)
    const endOfTheWeek = new Date(startOfTheWeek)
    endOfTheWeek.setDate(startOfTheWeek.getDate() + 8)
    return [startOfTheWeek.toISOString().slice(0, 10), endOfTheWeek.toISOString().slice(0, 10)]
}

export const month = month => {
    if(!month) {
        var month = new Date();
    }
    var firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    var lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    firstDay.setDate(firstDay.getDate() - 1);
    lastDay.setDate(lastDay.getDate() + 1);


    return [firstDay.toISOString().slice(0, 10), lastDay.toISOString().slice(0, 10)]
}

export const monthsInOrder = monthNumber => {
    const initialMonth = monthNumber
    const monthArray = []
    for (let i = 0; i < 12; i++) {
        switch (monthNumber) {
            case 0:
                monthArray.push({name: 'Jan', number: monthNumber, balance: 0})
                break;
            case 1:
                monthArray.push({name: 'Feb', number: monthNumber, balance: 0})
                break;
            case 2:
                monthArray.push({name: 'Mar', number: monthNumber, balance: 0})
                break;
            case 3:
                monthArray.push({name: 'Apr', number: monthNumber, balance: 0})
                break;
            case 4:
                monthArray.push({name: 'May', number: monthNumber, balance: 0})
                break;
            case 5:
                monthArray.push({name: 'Jun', number: monthNumber, balance: 0})
                break;
            case 6:
                monthArray.push({name: 'Jul', number: monthNumber, balance: 0})
                break;
            case 7:
                monthArray.push({name: 'Aug', number: monthNumber, balance: 0})
                break;
            case 8:
                monthArray.push({name: 'Sep', number: monthNumber, balance: 0})
                break;
            case 9:
                monthArray.push({name: 'Oct', number: monthNumber, balance: 0})
                break;
            case 10:
                monthArray.push({name: 'Nov', number: monthNumber, balance: 0})
                break;
            case 11:
                monthArray.push({name: 'Dec', number: monthNumber, balance: 0})
                break;
            default: 
            break;
        }
        if (monthNumber === initialMonth + 1) {
            break
        }
        if (monthNumber !== 0) {
            monthNumber -= 1
        } else {
            monthNumber = 11
        }
    }
    return monthArray

}