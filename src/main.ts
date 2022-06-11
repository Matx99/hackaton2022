/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));
   
/* WA.room.onEnterLayer('shopZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        if (time >= '14') {
        currentPopup = WA.ui.openPopup("shopPopup", "Il est trop tard, votre magasin est fermer. ",[]);
        }
    })

    WA.room.onLeaveLayer('shopZone').subscribe(closePopUp)
*/
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
