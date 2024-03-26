from datetime import datetime
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from meeting_room.pagination import CustomPageNumberPagination
from .models import MeetingRoom
from .serializers import BookMeetingRoomSerializer, MeetingRoomSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class AvailableRoomsFilter:
    def __init__(self, num_attendees, start_time, end_time):
        self.num_attendees = num_attendees
        self.start_time = start_time
        self.end_time = end_time

    def filter_rooms(self):
        try:
            num_attendees = int(self.num_attendees)
            start_time = datetime.strptime(self.start_time, "%Y-%m-%dT%H:%M")
            end_time = datetime.strptime(self.end_time, "%Y-%m-%dT%H:%M")
        except ValueError:
            raise ValueError("Invalid parameter format")

        meeting_rooms = MeetingRoom.objects.filter(max_occupancy__gte=num_attendees)
        available_rooms = [
            room for room in meeting_rooms if room.is_available(start_time, end_time)
        ]
        return available_rooms


class AvailableRoomsView(APIView):
    def get(self, request: Request) -> Response:
        try:
            num_attendees = request.query_params.get("numAttendees")
            start_time = request.query_params.get("startTime")
            end_time = request.query_params.get("endTime")

            if not num_attendees or not start_time or not end_time:
                return Response(
                    data="Missing parameter", status=status.HTTP_400_BAD_REQUEST
                )

            room_filter = AvailableRoomsFilter(num_attendees, start_time, end_time)
            available_rooms = room_filter.filter_rooms()

            paginator = CustomPageNumberPagination()
            total = len(available_rooms)
            return paginator.generate_response(
                available_rooms, MeetingRoomSerializer, request, total
            )
        except ValueError as e:
            return Response(data=str(e), status=status.HTTP_400_BAD_REQUEST)


class BookMeetingRoomView(APIView):
    def post(self, request: Request) -> Response:
        data = {}
        number_of_people = request.data.get("number_of_people")
        start_time = request.data.get("start_time")
        end_time = request.data.get("end_time")
        room_id = request.data.get("room_id")
        if not number_of_people or not start_time or not end_time or not room_id:
            return Response(
                data="Missing parameter", status=status.HTTP_400_BAD_REQUEST
            )

        try:
            data["number_of_people"] = int(number_of_people)
            data["start_time"] = datetime.strptime(start_time, "%Y-%m-%dT%H:%M")
            data["end_time"] = datetime.strptime(end_time, "%Y-%m-%dT%H:%M")
        except ValueError:
            return Response(
                data="Invalid parameter format", status=status.HTTP_400_BAD_REQUEST
            )
        data["meeting_room"] = room_id
        room = MeetingRoom.objects.get(pk=room_id)
        if not room.is_available(start_time, end_time):
            return Response(
                data="Room is not available", status=status.HTTP_400_BAD_REQUEST
            )
        serializer = BookMeetingRoomSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllMeetingRoomsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        meeting_rooms = MeetingRoom.objects.all()
        total = meeting_rooms.count()
        paginator = CustomPageNumberPagination()
        return paginator.generate_response(
            meeting_rooms, MeetingRoomSerializer, request, total
        )


class AddMeetingRoomView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        data = request.data.copy()
        data["created_by"] = str(request.user.id)
        serializer = MeetingRoomSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateMeetingRoomView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request: Request, pk: int) -> Response:
        meeting_room = MeetingRoom.objects.get(pk=pk)
        serializer = MeetingRoomSerializer(instance=meeting_room, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class DeleteMeetingRoomView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request: Request, pk: int) -> Response:
        meeting_room = MeetingRoom.objects.get(pk=pk)
        meeting_room.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
