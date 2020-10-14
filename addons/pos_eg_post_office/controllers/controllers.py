# -*- coding: utf-8 -*-
from odoo import http


# class Egpos(http.Controller):
#     @http.route('/egpos/egpos/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/egpos/egpos/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('egpos.listing', {
#             'root': '/egpos/egpos',
#             'objects': http.request.env['egpos.egpos'].search([]),
#         })

#     @http.route('/egpos/egpos/objects/<model("egpos.egpos"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('egpos.object', {
#             'object': obj
#         })
