# -*- coding: utf-8 -*-

from odoo import models, fields, api


class geo_team_client(models.Model):
    _inherit = 'res.partner'

    s_postion = fields.Char(string='Position geo',
                            help='position de geolocalisation (Latitude Longitude décimales)',
                            required=True,
                            default='empty',
                            readonly=False,
                            stored=True)

class geo_team_sale(models.Model):
    _inherit = 'sale.order'

    s_postion = fields.Char(related='partner_id.s_postion',
                            string='Position geo',
                            help='position de geolocalisation (Latitude Longitude décimales)',
                            required=True,
                            default='empty',
                            readonly=False,
                            stored=True)