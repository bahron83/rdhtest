# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('risks', '0071_auto_20180302_1018'),
    ]

    operations = [
        migrations.AlterField(
            model_name='administrativedivision',
            name='name',
            field=models.CharField(max_length=50, db_index=True),
        ),
    ]
