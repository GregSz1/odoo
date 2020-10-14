# -*- coding: utf-8 -*-

from odoo import models, fields, api


class TestModel(models.Model):
    _name = 'egpos.model'
    _description = "EG test model"

    name = fields.Char(string="Title", required=True)
    description = fields.Text()

    value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100

class Session(models.Model):
    _name = 'egpos.session'
    _description = "EGPOS Sessions"

    name = fields.Char(required=True)
    start_date = fields.Date()
    duration = fields.Float(digits=(6, 2), help="Duration in days")
    seats = fields.Integer(string="Number of seats")