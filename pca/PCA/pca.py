import os
from PIL import Image
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
import numpy as np
from django.conf import settings


def covariance(A):
    # find covariance matrix
    return np.cov(A)


def eigen_val_vec(A):
    # find eigen values and eigen vectors of matrix
    eigval, eigvec = np.linalg.eig(A)
    return eigval, eigvec


def transform(X_original,variance):
  red=X_original[:,:,0]
  green=X_original[:,:,1]
  blue=X_original[:,:,2]
  blue=blue/255
  green=green/255
  red=red/255

  red_converted,red_req_dimension,red_original_dim=perform_transform(red,variance)
  green_converted,green_req_dimension,green_original_dim=perform_transform(green,variance)
  blue_converted,blue_req_dimension,blue_original_dim=perform_transform(blue,variance)

  req_dim={
    "red":red_req_dimension,
    "green":green_req_dimension,
    "blue":blue_req_dimension
  }
  org_dimension={
    "red":red_original_dim,
    "green":green_original_dim,
    "blue":blue_original_dim
  }

  X_new=(np.dstack((red_converted,green_converted,blue_converted))* 255.999) .astype(np.uint8)

  return X_new,req_dim,org_dimension

  


def perform_transform(X,variance):
    # Eigen values of covariance matrix
    [m, n] = np.shape(X)
    cov = covariance(X)
    eigval, eigvec = eigen_val_vec(cov)
    pair = [(np.abs(eigval[i]), eigvec[:, i]) for i in range(len(eigval))]
    pair.sort(key=lambda x: x[0], reverse=True)
    req_var = variance * sum(eigval)
    req_dim = 0
    cur_var = 0
    for i in range(len(eigval)):
        cur_var += pair[i][0]
        if cur_var >= req_var:
            req_dim = i + 1
            break

    # Selecting Components that are required
    P = np.empty(shape=(X.shape[0], req_dim))
    for i in range(req_dim):
        P[:, i] = pair[i][1]

    # Mathematics Behind PCA
    P = P.T
    Y = np.matmul(P, X)

    # Converting Back to original dimension but with lesser components than available
    PP = P.T
    YY = Y
    X_approx = np.matmul(PP, YY)

    X_final = np.reshape(X_approx, [m, n])
        
    return X_final, req_dim, eigval.shape[0]


def image_to_mat(filename):
    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    image=Image.open(file_path)
    X = np.asarray(image)
    print(X.shape)
    return X


def plot(X):
    plt.imshow(X)
    plt.colorbar()


def get_dim(filename):
    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    X = mpimg.imread(file_path)
    return X.shape
