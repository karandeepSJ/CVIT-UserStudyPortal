import h5py
import numpy as np
from sklearn.cluster import KMeans
h = h5py.File('./action_vectors.hdf5')
X = np.zeros((150,200))
w = np.empty((150,), dtype='S100')
for i, word in enumerate(h):
	X[i,:] = h[word].value
	w[i] = word
kmeans = KMeans(n_clusters=5, random_state=0).fit(X)
print(kmeans.labels_)
w1 = (w[np.where(kmeans.labels_ ==0)])
w2 = (w[np.where(kmeans.labels_ ==1)])
w3 = (w[np.where(kmeans.labels_ ==2)])
w4 = (w[np.where(kmeans.labels_ ==3)])
w5 = (w[np.where(kmeans.labels_ ==4)])
with open('clusters.txt', 'w') as f:
    for item in w1:
        f.write("%s, " % item.decode('utf-8'))
    f.write("\n")
    for item in w2:
        f.write("%s, " % item.decode('utf-8'))
    f.write("\n")
    for item in w3:
        f.write("%s, " % item.decode('utf-8'))
    f.write("\n")
    for item in w4:
        f.write("%s, " % item.decode('utf-8'))
    f.write("\n")
    for item in w5:
        f.write("%s, " % item.decode('utf-8'))
    f.write("\n")