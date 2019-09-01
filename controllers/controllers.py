# -*- coding: utf-8 -*-
from odoo import http

# class Geolocalisation(http.Controller):
#     @http.route('/geolocalisation/geolocalisation/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/geolocalisation/geolocalisation/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('geolocalisation.listing', {
#             'root': '/geolocalisation/geolocalisation',
#             'objects': http.request.env['geolocalisation.geolocalisation'].search([]),
#         })

#     @http.route('/geolocalisation/geolocalisation/objects/<model("geolocalisation.geolocalisation"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('geolocalisation.object', {
#             'object': obj
#         })