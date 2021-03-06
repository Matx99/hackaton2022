/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Hello ! Script started successfully');


let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);
    console.log('Player name: ', WA.player.name);
    setTimeout(function () {
        console.log('Message: ', WA.player.state.hellothere);
    }, 2000);
    

    WA.room.onEnterLayer('messageZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("defilePopup","Bienvenue au défilé",[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));
   
    WA.room.onEnterLayer('shopZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        if (time >= '14') {
        currentPopup = WA.ui.openPopup("shopPopup", "Votre magasin va ouvir prochainement. ",[]);
        }
    })

    WA.room.onLeaveLayer('shopZone').subscribe(closePopUp)

    WA.room.onEnterLayer('nasaZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("nasaPopup", "Bonjour et bienvenue chez Nasa shop. Placez vous devant les vêtements pour les consulter.",[]);
    })

    WA.room.onLeaveLayer('nasaZone').subscribe(closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}


export {};
