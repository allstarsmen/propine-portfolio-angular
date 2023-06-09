import { Injectable } from "@angular/core";
import { CSVService } from "./csv.service";
import { TransactionService } from "./transaction.service";
import { Observable } from "rxjs";
import { ExchangeRatesService } from "./exchangeRates.service";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    allTransactions = []

    constructor(
        private csvService: CSVService,
        private transactionService: TransactionService,
        private exchangeRatesService: ExchangeRatesService
    ) {

    }

    getBalances(date: string = ''): Observable<any> {
        return new Observable(ob => {
            this.csvService.getAllTransactions().subscribe(allTransactions => {
                this.allTransactions = allTransactions
                console.log(allTransactions);
                
                if (date !== '') {
                    const m = moment(date + ' 23:59', 'YYYY-MM-DD HH:mm');
                    this.allTransactions = allTransactions.filter((t: any) => +t[0] <= m.unix())
                }

                const displayTransactions = this.transactionService.parse(this.allTransactions);

                this.exchangeRatesService.getUSD(Object.keys(displayTransactions)).subscribe(exchangeRates => {
                    const rows = Object.values(displayTransactions);

                    this.transactionService.setHoldings(rows, exchangeRates)
                    
                    ob.next(rows)
                    ob.complete()
                })
            });
        });
    }
}