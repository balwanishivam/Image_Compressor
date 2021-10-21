%matplotlib inline\
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import glob
from PIL import Image
from matplotlib import cm

def covariance(A):
  # find covariance matrix
  return np.cov(A)

def eigen_val_vec(A):
  # find eigen values and eigen vectors of matrix
  eigval, eigvec = np.linalg.eig(A)
  return eigval, eigvec

def transform(X,variance):
  # Eigen values of covariance matrix
  m, n = np.shape(X) 
  cov=covariance(X)
  eigval, eigvec = eigen_val_vec(cov)
  pair=[(np.abs(eigval[i]),eigvec[:,i]) for i in range(len(eigval))]
  pair.sort(key=lambda x:x[0],reverse=True)
  req_var=variance*sum(eigval)
  req_dim=0
  cur_var=0
  for i in range(len(eigval)):
    cur_var+=pair[i][0]
    if cur_var>=req_var:
      req_dim=i+1
      break

  # Selecting Components that are required
  P = np.empty(shape=(X.shape[0],req_dim))
  for i in range(req_dim):
    P[:,i]=pair[i][1]

  # Mathematics Behind PCA
  P=P.T
  Y=np.matmul(P,X)

  # Converting Back to original dimension but with lesser components than available
  PP=P.T
  YY=Y
  X_approx=np.matmul(PP,YY)

  # Reduced Image PLotting
  X_reduced = np.reshape(X_approx,[m,n])

  return X_reduced,req_dim 

def plot(X):
  plt.imshow(X)
  plt.colorbar()

def image_to_mat(a):
    X = mpimg.imread(a)
    return X