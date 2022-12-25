import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) {
    }

    getData() {
        return this.http.get('http://localhost:8080')
    }

    executeAlgorithm(request : any){
        return this.http.post('http://localhost:8080/algorithm/execute', request)
    }
}
