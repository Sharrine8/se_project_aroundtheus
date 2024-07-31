export default class Popup {
    constructor(popupSelector) {
        //the open method should be called in the preexisting
        //event handlers in INDEX.JS
        open() {
            //open popup
        }

        close() {
            //close popup
        }

        _handleEscClose() {
            //handles logic for closing pop up with esc
        }

        setEventListeners() {
            //adds a click event listener to the close icon
            //of the popup. Modal window should also close
            //when users click on the shaded area around the
            //form
        }
    }
}

//won't instantiate Popup class directly in index.js; 
//instead you'll instantiate its children classes
//PopupWithImage and PopupWithForm