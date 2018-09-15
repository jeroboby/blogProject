import { Subject } from "rxjs/internal/Subject";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class AppareilService {
 
    appareilsSubject = new Subject<any[]>();
    private appareils = [];

    constructor(private httpClient: HttpClient) {}  

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            }
        );
        return appareil;
    }  

    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }

    switchOnAll() {
        for(let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
    }

    switchOffAll() {
        for(let appareil of this.appareils) {
            appareil.status = 'éteint';
        }
    }

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
    }

    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
    }

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name:'',
            status:''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilToServer() {
        this.httpClient
        .put('https://http-client-demo-fa96f.firebaseio.com/appareils.json', this.appareils)
        .subscribe(
            () => {
                console.log('Enregistrement terminé');
            },
            (error) => { 
                console.log('Erreur de sauvegarde !' + error);
            }
        );
    }

    getAppareilFromServer() {
        this.httpClient
        .get<any[]>('https://http-client-demo-fa96f.firebaseio.com/appareils.json')
        .subscribe(
            (response) => {
                this.appareils = response;
                this.emitAppareilSubject();
            },
            (error) => { 
                console.log('Erreur de chargement  !' + error);
            }
        );
    }
}