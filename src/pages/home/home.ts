import { Component } from '@angular/core';
import { Events } from 'ionic-angular';


import { NavController } from 'ionic-angular';
// import { SendBird } from 'sendbird/SendBird.min.js';
declare var SendBird: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    sb = new SendBird({
      appId: 'D6C50457-BEDE-405A-B282-2112D19ACFC2'
    });

  constructor(public navCtrl: NavController, public events: Events) {
    var x = this.sb.connect('1', function(user, error) {
      console.log("conectei?");
      events.publish('sb:connect');
    });

    events.subscribe('sb:connect', () => {
      this.sb.GroupChannel.createChannelWithUserIds(['1'], false, 'meucanal', 'meucanal', '1', function(channel, error) {
          if (error) {
              console.error(error);
              return;
          }

          console.log(channel);
      });
    })
    
  }

}
