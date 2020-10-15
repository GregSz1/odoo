odoo.define('pos_post_office.ParcelPickupPopup', function (require) {
    'use strict';

    const PROXYURL = 'https://cors-anywhere.herokuapp.com'
    const WSURL = 'https://ff8c0c10d146.ngrok.io'

    const { useState, useRef } = owl.hooks;
    //const axios = require('axios.min')
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');

    class ParcelPickupPopup extends AbstractAwaitablePopup {
        /**
         * @param {Object} props
         * @param {string} props.startingValue
         */
        constructor() {
            super(...arguments);
            this.state = useState({
                inputValue: this.props.startingValue,
                name: '-',
                surname: '-'
            });
            this.inputRef = useRef('input');
        }
        check() {
            let self = this;
            fetch(PROXYURL + '/' + WSURL + '/labels/' + self.state.inputValue)
                .then((resp) => resp.json())
                .then(function (data) {
                    console.log('log ' + JSON.stringify(data))
                    self.state.name = data.name
                    self.state.surname = data.surname
                    self.state.response= data
                })
                .catch(function (error) {
                    console.log('log ' + error)
                    self.state.name = 'ERROR'
                    self.state.surname = 'ERROR'
                });
        }
        mounted() {
            this.inputRef.el.focus();
        }
        getPayload() {
            return this.state.response;
        }
    }
    ParcelPickupPopup.template = 'ParcelPickupPopup';
    ParcelPickupPopup.defaultProps = {
        confirmText: 'Ok',
        cancelText: 'Cancel',
        title: '',
        body: 'Enter the label',
        startingValue: '',
    };

    Registries.Component.add(ParcelPickupPopup);

    return ParcelPickupPopup;
});
