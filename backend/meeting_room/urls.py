from django.urls import path
from .views import (
    AvailableRoomsView,
    BookMeetingRoomView,
    AllMeetingRoomsView,
    AddMeetingRoomView,
    UpdateMeetingRoomView,
    DeleteMeetingRoomView)

urlpatterns = [
    path('addroom', AddMeetingRoomView.as_view(), name='add_meeting_room'),
    path('availablerooms/', AvailableRoomsView.as_view(), name='available_rooms'),
    path('bookroom', BookMeetingRoomView.as_view(), name='book_meeting_room'),
    path('listrooms/', AllMeetingRoomsView.as_view(), name='all_meeting_rooms'),
    path('updateroom/<uuid:pk>/', UpdateMeetingRoomView.as_view(), name='update_meeting_room'),
    path('deleteroom/<uuid:pk>', DeleteMeetingRoomView.as_view(), name='delete_meeting_room'),

]