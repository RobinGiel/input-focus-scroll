import { Component, AfterViewInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  ngAfterViewInit() {
    // This element never changes.
    let ionapp = document.getElementsByTagName("ion-app")[0];

    window.addEventListener('keyboardDidShow', async (event) => {
        // Move ion-app up, to give room for keyboard
        let kbHeight: number = event["keyboardHeight"];
        let viewportHeight: number = $(window).height();
        let inputFieldOffsetFromBottomViewPort: number = viewportHeight - $(':focus')[0].getBoundingClientRect().bottom;
        let inputScrollPixels = kbHeight - inputFieldOffsetFromBottomViewPort -50;

        // Set margin to give space for native keyboard.
        ionapp.style["padding-botttom"] = kbHeight.toString() + "px";

        // But this diminishes ion-content and may hide the input field...
        if (inputScrollPixels > 0) {
            // ...so, get the ionScroll element from ion-content and scroll correspondingly
            // The current ion-content element is always the last. If there are tabs or other hidden ion-content elements, they will go above.
            let ionScroll = await $(<any>"ion-content").last()[0].getScrollElement();
            setTimeout(() => {
                $(ionScroll).animate({
                    scrollTop: ionScroll.scrollTop + inputScrollPixels
                }, 50);
            }, 50); // Matches scroll animation from css.
        }
    });
    window.addEventListener('keyboardDidHide', () => {
        // Move ion-app down again
        // Scroll not necessary.
        ionapp.style["padding-bottom"] = "0px";
    });
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
