# Generated by Django 5.1.7 on 2025-05-15 13:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_alter_exercise_category_alter_exercise_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='meal',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='meal',
            name='meal_type',
            field=models.CharField(choices=[('breakfast', 'Breakfast'), ('lunch', 'Lunch'), ('dinner', 'Dinner'), ('snack', 'Snack'), ('drink', 'Drink')], default='breakfast', max_length=20),
        ),
        migrations.AddField(
            model_name='meal',
            name='notes',
            field=models.TextField(blank=True),
        ),
    ]
