# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class PosConfig(models.Model):
    _inherit = 'pos.config'

    iface_add_service = fields.Boolean(string='AddService', help='Allow adding a service to Orderlines.')
    module_pos_post_office= fields.Boolean(default=True)

    @api.onchange('module_pos_post_office')
    def _onchange_module_pos_post_office(self):
        if not self.module_pos_post_office:
            self.update({'iface_add_service': False})

    def _get_forbidden_change_fields(self):
        forbidden_keys = super(PosConfig, self)._get_forbidden_change_fields()
        return forbidden_keys

    def write(self, vals):
        return super(PosConfig, self).write(vals)
