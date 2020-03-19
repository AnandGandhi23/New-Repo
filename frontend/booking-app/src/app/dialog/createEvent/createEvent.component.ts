import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';


@Component({
    selector: 'create-event',
    templateUrl: './createEvent.component.html'
})
export class CreateEventComponent {
    title: String;
    date: String;
    price: String;
    description: String;

    constructor(public activeModal: NgbActiveModal, private apollo:Apollo) {}

    createEvent() {
        console.log("create event mutation");
        const createEventMutation = gql`
        mutation createEvent($title: String!, $description: String!, $price: Float!, $date: String!)
        {
          createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date})
          {
            title
            description
            price
            date
          }
        }`;

        this.apollo.mutate({
            mutation: createEventMutation,
            variables: {
                title: this.title,
                description: this.description,
                price: Number.parseInt(this.price.toString()),
                date: new Date(this.date.toString()).toISOString(),
            } 
        }).subscribe(response => console.log(response));
    }
} 

