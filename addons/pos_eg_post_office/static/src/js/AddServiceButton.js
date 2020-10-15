odoo.define('pos_post_office.AddServiceButton', function (require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');

    class AddServiceButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }
        get selectedOrderline() {
            return this.env.pos.get_order().get_selected_orderline();
        }
        async onClick() {
            if (!this.selectedOrderline) return;

            const { confirmed, payload: response } = await this.showPopup('ParcelPickupPopup', {
                startingValue: '',
                title: this.env._t('Parcel Pickup'),
            });

            if (confirmed) {
                this.selectedOrderline.set_note(JSON.stringify(response));
            }
        }
    }
    AddServiceButton.template = 'AddServiceButton';

    ProductScreen.addControlButton({
        component: AddServiceButton,
        condition: function () {
            return this.env.pos.config.module_pos_post_office;
        },
    });

    Registries.Component.add(AddServiceButton);

    return AddServiceButton;
});
