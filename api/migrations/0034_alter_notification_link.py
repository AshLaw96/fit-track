# Generated by Django 5.1.7 on 2025-06-07 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0033_delete_friend'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='link',
            field=models.CharField(blank=True, help_text='Optional internal link or anchor path.', max_length=300, null=True),
        ),
    ]
