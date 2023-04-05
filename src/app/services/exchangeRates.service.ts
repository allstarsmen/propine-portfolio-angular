import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ExchangeRatesService {
    constructor(
        private http: HttpClient
    ) { }

    getUSD(symbols: string[]): Observable<any> {
        return this.http.get(
            'https://min-api.cryptocompare.com/data/pricemulti',
            {
                params: {
                    'fsyms': symbols.join(','),
                    'tsyms': 'USD'
                }
            }
        )
    }
}