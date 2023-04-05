import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Papa } from "ngx-papaparse";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CSVService {
    constructor(
        private http: HttpClient,
        private csvParser: Papa
    ) { }

    getAllTransactions(): Observable<any> {
        return new Observable(ob => {
            this.http.get('assets/csv/transactions.csv', { responseType: 'blob' }).subscribe(res => {
                this.csvParser.parse(
                    res,
                    {
                        complete: results => {
                            results.data.shift()

                            ob.next(results.data)
                            ob.complete()
                        },
                        error: (err) => {
                            ob.error(err)
                        }
                    }
                )
            });
        });
    }
}