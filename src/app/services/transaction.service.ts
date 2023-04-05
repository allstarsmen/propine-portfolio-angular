import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
    providedIn: "root"
})
export class TransactionService {
    parse(csvContent: any[]) {
        const trans: any = {};
        let i = 1;

        csvContent.forEach(t => {
            const token = t[2]
            const type = t[1]
            const amount = +t[3]
            const timestamp = moment.unix(+t[0]).format('YYYY-MM-DD')
            
            if (trans[token] == null) {
                trans[token] = {
                    position: i,
                    name: token,
                    amount: amount,
                    date: timestamp,
                    holdings: 0
                };
                i++
            } else {
                trans[token].date = timestamp

                if (type === 'WITHDRAWAL') {
                    trans[token].amount -= amount
                } else if (type === 'DEPOSIT') {
                    trans[token].amount += amount
                }
            }
        });

        return trans;
    }

    setHoldings(data: any[], exchangeRates: any) {

        data.forEach(d => {
            d.holdings = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(d.amount * exchangeRates[d.name].USD)
        });

        return data
    }
}