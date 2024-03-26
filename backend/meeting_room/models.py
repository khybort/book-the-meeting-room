from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class MeetingRoom(models.Model):
    id = models.CharField(
        primary_key=True, max_length=36, default=uuid.uuid4, editable=False
    )
    name = models.CharField(max_length=225, unique=True)
    max_occupancy = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    created_by = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="meeting_rooms"
    )

    def __str__(self) -> str:
        return self.name
    
    def validate_max_occupancy(self):
        if self.max_occupancy < 1:
            raise ValueError("Max occupancy must be greater than 0")

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        self.validate_max_occupancy()
        super().save(*args, **kwargs)

    def is_available(self, start_time, end_time):
        if end_time < start_time:
            raise ValueError("End time must be after start time")
        return not self.bookings.filter(
            start_time__lt=end_time, end_time__gt=start_time
        ).exists()


class Booking(models.Model):
    id = models.CharField(
        primary_key=True, max_length=36, default=uuid.uuid4, editable=False
    )
    number_of_people = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    meeting_room = models.ForeignKey(
        MeetingRoom, on_delete=models.CASCADE, related_name="bookings"
    )
