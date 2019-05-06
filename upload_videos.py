import csv
import sys
import os
from videos.models import BVH
from random import sample, shuffle
from shutil import copyfile
def fill_database(filename):
    files = os.listdir(filename)
    for label in files:
        paths=os.listdir(filename + label)
        shuffle(paths)
        for path in paths:
            # try:
            with open('clusters.txt') as f:
                for  i in range(5):
                    a=f.readline().strip().split(', ')
                    if label in a:
                        break
                try:        
                    a.remove(label)
                    a = sample(a,3)
                    a.append(label)
                    shuffle(a)
                    BVH.objects.create(action = label, path = os.path.join('files',label,path), option1 = a[0], option2 = a[1], option3 = a[2], option4 = a[3])
                except:
                    pass
            # except:
            #     print("Duplicate Entry")
            break