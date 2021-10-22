from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from rest_framework import response, status, views

from pca.PCA.convert import *
from pca.PCA.pca import *


class SaveFileView(views.APIView):
    def post(self, request, *args, **kwargs):
        request_file = (
            request.FILES["document"] if "document" in request.FILES else None
        )
        variance = request.data.get("variance")
        if request_file:
            fs = FileSystemStorage()
            file = fs.save(request_file.name, request_file)
            fileurl = fs.url(file)
            file_name, _, org_format = file.partition(".")
            dims = get_dim(file)
            new_file = convert(file, dims[1], dims[0])
            X = image_to_mat(new_file)
            X_reduced, req_dim, orig_dim = transform(X, float(variance))
            file_converted = save(X_reduced, org_format, file_name)
            new_file_url = fs.url(file_converted)

            return response.Response(
                {
                    "success": True,
                    "url": fileurl,
                    "req_dim": req_dim,
                    "orig_dim": orig_dim,
                    "compressed_file": new_file_url,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return response.Response(
                {"success": False}, status=status.HTTP_400_BAD_REQUEST
            )


def index(request):
    return render(request, "pca/index.html")
