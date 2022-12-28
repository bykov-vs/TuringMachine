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

    savaAlphabet(request : any) {
        return this.http.post('http://localhost:8080/alphabet/save', request)
    }

    getAllAlphabets() {
        return this.http.get('http://localhost:8080/alphabet/all')
    }

    getAlphabetById(id : any) {
        return this.http.get('http://localhost:8080/alphabet/' + id)
    }

    deleteAlphabetById(id : any) {
        return this.http.get('http://localhost:8080/alphabet/delete/' + id)
    }
}
