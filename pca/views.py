from django.shortcuts import render
from rest_framework import response, status, views
from django.core.files.storage import FileSystemStorage


<<<<<<< HEAD
class SaveFileView(views.APIView):
    def post(self, request, *args, **kwargs):
        request_file = request.FILES['document'] if 'document' in request.FILES else None
        if request_file:
            fs = FileSystemStorage()
            file = fs.save(request_file.name, request_file)
            fileurl = fs.url(file)
            return response.Response({"success":True}, status=status.HTTP_200_OK)
        else:
            return response.Response({"success":False}, status=status.HTTP_400_BAD_REQUEST)
=======
def index(request):
    return render(request, "pca/index.html")
>>>>>>> cec7f8a5a1f156915ebacea1e28854ec6eded5c9
