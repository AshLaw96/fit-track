from django.apps import AppConfig
from django.conf import settings
from django.core.files.storage import default_storage
from importlib import import_module


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Force correct storage wrapper
        module_path, class_name = settings.DEFAULT_FILE_STORAGE.rsplit('.', 1)
        storage_class = getattr(import_module(module_path), class_name)
        default_storage._wrapped = storage_class()

        import logging
        logging.debug(
            f"💾 Forced default_storage to: {default_storage.__class__}"
        )
