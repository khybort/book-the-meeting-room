from rest_framework.serializers import ModelSerializer, ValidationError


from .models import Booking, MeetingRoom

class MeetingRoomSerializer(ModelSerializer):
    class Meta:
        model = MeetingRoom
        fields = ["id", "name", "max_occupancy", "created_by"]
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["maxOccupancy"] = data.pop("max_occupancy")
        return data


class BookMeetingRoomSerializer(ModelSerializer):
    class Meta:
        model = Booking
        fields = ["meeting_room", "number_of_people", "start_time", "end_time"]
