# Generated by Django 5.1.7 on 2025-04-15 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_dailylog_notes_alter_nutritionlog_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
