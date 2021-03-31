import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';


class UserAt {
      firstname : string;
      lastname : string;
      email : string;
      username : string;
      password : string;
      status : string;
  }

@Injectable({ providedIn: 'root' })
export class AccountService {
    update: any;
    delet: any;
    delete(id: string) {
        throw new Error('Method not implemented.');
    }
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    // login(body) {
    //      return this.http.post<User>('http://localhost:8000/users/authenticate', body)
    //     // return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, body)
    //         .pipe(map(user => {
    //              // store user details and jwt token in local storage to keep user logged in between page refreshes
    //              localStorage.setItem('user', JSON.stringify(user));
    //             this.userSubject.next(user);
    //              return user;
    //         }));
    // }

    register(user: User) {

        console.log(user);
        return this.http.post('http://127.0.0.1:8000/users/', user);
    }


    login(username: string , password: string) {

        var userA = new UserAt();
        userA.username = username;
        userA.password = password;
        userA.firstname = "userabc";
        userA.lastname = "iserabcd";
        userA.email = "123abc@ga.co";
        userA.status = "";

        console.log(userA.username);
        console.log(userA.password);

        console.log("Mylog01 Enter");

        //return this.http.post('http://127.0.0.1:8000/users/', userA);

        //return this.http.post('http://127.0.0.1:8000/users/authenticate/', userA);


         return this.http.post<any>('http://localhost:8000/users/authenticate/', userA)
             .pipe(map(user => {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
                 console.log("Mylog02");
                 localStorage.setItem('user', JSON.stringify(user));
                 console.log("Mylog03 User");
                 console.log(user);
                 this.userSubject.next(user);
                 console.log("Mylog04");
                 return user;
             }));
    }







    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }



    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    // update(id, params) {
    //     return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue.id) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('user', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }

    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id == this.userValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}
