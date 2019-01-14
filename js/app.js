Vue.use(VueMask.VueMaskPlugin);
Vue.config.devtools = true;
var config = {
    apiKey: "AIzaSyBlOcouFnUJcHGkL5glKcH1jHKIrZUBXwM",
    authDomain: "spd-test-task.firebaseapp.com",
    databaseURL: "https://spd-test-task.firebaseio.com",
    projectId: "spd-test-task",
    storageBucket: "spd-test-task.appspot.com",
    messagingSenderId: "596544180033"
};
firebase.initializeApp(config);
var officesRef = firebase.database().ref('offices');

var app = new Vue({
    el: '#app',
    data: {
        addingOffice: false,
        availableCountries: ['Australia', 'United Arab Emirates', 'United Kingdom', 'United States'],
        availableStates: ['State 1', 'State 2', 'State 3', 'State 4'],
        availableCities: ['City 1', 'City 2', 'City 3', 'City 4'],
        modalOpened: false,
        menuOpened: true,
        confirmOffice: '',
        tempOffice: [],
        newOffice: {
            country: '',
            state: '',
            postalCode: '',
            city: '',
            street: '',
            addressSecond: '',
            phone: '',
            fax: '',
            email: '',
            officeType: '',
            editable: false
        }
    },
    firebase: {
        offices: officesRef
    },
    created: function () {
        if(window.innerWidth < 768){
            this.menuOpened = false;
        }
    },
    methods: {
        addOffice: function () {
            officesRef.push(this.newOffice);
            this.newOffice.country = '';
            this.newOffice.state = '';
            this.newOffice.postalCode = '';
            this.newOffice.city = '';
            this.newOffice.street = '';
            this.newOffice.addressSecond = '';
            this.newOffice.phone = '';
            this.newOffice.fax = '';
            this.newOffice.email = '';
            this.newOffice.officeType = '';
            this.newOffice.editable = false;
            this.addingOffice = false;
        },
        addOfficeCancel: function () {
            this.newOffice.country = '';
            this.newOffice.state = '';
            this.newOffice.postalCode = '';
            this.newOffice.city = '';
            this.newOffice.street = '';
            this.newOffice.addressSecond = '';
            this.newOffice.phone = '';
            this.newOffice.fax = '';
            this.newOffice.email = '';
            this.newOffice.officeType = '';
            this.newOffice.editable = false;
            this.addingOffice = false;
        },
        removeOffice: function (office) {
            officesRef.child(office['.key']).remove();
            this.modalOpened = false;
            this.confirmOffice = '';
        },
        editOffice: function (office) {
            this.tempOffice = Object.assign({}, office);
            office.editable = true;
        },
        editOfficeCancel: function (office) {
            Object.assign(office, this.tempOffice);
            office.editable = false;
            this.tempOffice = [];
        },
        updateOffice: function (office) {
            var key = office['.key'];
            delete office['.key'];
            office.editable = false;
            officesRef.child(key).update(office);
        },
        telMask: function (country) {
            switch (country) {
                case 'Australia': return '+## (#)# #### ####';
                case 'United Arab Emirates': return '+# (###) ###-####';
                case 'United Kingdom': return '+## (#)## #### ####';
                case 'United States': return '+# (###) ###-####';
                default: return '+# (###) ###-####';
            }
        },
        modalOpen: function (office) {
            this.confirmOffice = office;
            this.modalOpened = true;
        },
        modalClose: function () {
            this.confirmOffice = '';
            this.modalOpened = false;
        }
    }
});

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;