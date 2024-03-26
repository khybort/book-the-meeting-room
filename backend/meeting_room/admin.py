from django.contrib import admin
from .models import MeetingRoom

@admin.register(MeetingRoom)
class MeetingRoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug',
                    'created_at', 'created_by']
    search_fields = ['id', 'name', 'slug', 'created_by']
    list_filter = []
    ordering = ['-created_at']