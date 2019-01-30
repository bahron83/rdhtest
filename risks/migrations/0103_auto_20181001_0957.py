# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('risks', '0102_merge'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='event',
            options={},
        ),
        migrations.AlterModelOptions(
            name='eventimportattributes',
            options={'ordering': ['riskapp', 'region', 'riskanalysis', 'adm_level_precision'], 'verbose_name': 'Risks Analysis: Import Events Data (Attributes) from XLSX file', 'verbose_name_plural': 'Risks Analysis: Import Events Data (Atributes) from XLSX file'},
        ),
        migrations.AlterField(
            model_name='administrativedivision',
            name='name',
            field=models.CharField(max_length=100, db_index=True),
        ),
    ]
