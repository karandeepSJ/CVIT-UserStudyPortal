from django.db import models
from videos.models import BVH
from user.models import User

# Create your models here.
class Guess(models.Model):
    file = models.ForeignKey(BVH,on_delete=models.CASCADE)
    guess = models.CharField(max_length=200, default="")
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(auto_now=True)
    num_pause = models.IntegerField(default=0)
    num_replay = models.IntegerField(default=0)
