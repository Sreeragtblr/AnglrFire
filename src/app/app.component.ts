import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

export interface list { id: string; name: string; }

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  powers = ['Shield', 'Suit',
    'Smash', 'Hammer'];
  public name: string;
  public alias: string;
  submitted = false;
  private itemDoc: AngularFirestoreDocument<any>;   
  private superherocollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  heroes: Observable<any[]>;
  constructor(private readonly db: AngularFirestore) {
    // this.itemsCollection = afs.collection('list');
    this.itemDoc = db.doc<any>('heroes/IjFbE8poJPDq9DR6hhGc');
    this.items = this.itemDoc.valueChanges();
    this.superherocollection = db.collection('heroes');
    this.heroes = this.superherocollection.valueChanges();
    // this.items = this.itemsCollection.valueChanges();
  }

  onSubmit(name: string, alias: string, powers: string) {

    // Persist a document id
    const id = this.db.createId();
    const heroes = { name, alias, powers };
    this.superherocollection.add(heroes);
    this.submitted = true;
  }
  update(name: string, alias: string, powers: string) {
    console.log("INNS")
    const hero = { name, alias, powers };
    console.log(hero);
    this.itemDoc.update(this.items);
  }
}