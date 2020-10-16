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
            //if (!this.selectedOrderline) return;

            const { confirmed, payload: response } = await this.showPopup('ParcelPickupPopup', {
                startingValue: '',
                title: this.env._t('Parcel Pickup'),
            });

            if (confirmed) {
                var order = this.env.pos.get_order();
                //var lines = order.get_orderlines();
                var product = this.env.pos.db.get_product_by_id('83');
                if (product === undefined) {
                    await this.showPopup('ErrorPopup', {
                        title: this.env._t("No discount product found"),
                        body: this.env._t("The discount product seems misconfigured. Make sure it is flagged as 'Can be Sold' and 'Available in Point of Sale'."),
                    });
                    return;
                }

                order.add_product(product, {
                    price: 10,
                    lst_price: 10,
                    extras: {
                        price_manually_set: true,
                        parameter:"something"
                    },
                });

                var orderstr = this.env.pos.get_order().export_as_JSON();
                console.log('log ' + JSON.stringify(orderstr))

                //this.orderlines.each(_.bind(function (item) {
                //    return orderLines.push([0, 0, item.export_as_JSON()]);
                //}, this));
                //var order = this.env.pos.get_order().export_as_JSON();
                //var lines = order.get_orderlines().export_as_JSON();
                //console.log('log ' + JSON.stringify(order))
                //this.selectedOrderline.set_note(JSON.stringify(response));
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
