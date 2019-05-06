from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from user.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import cache_control

@csrf_exempt
@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def infoform(request):
	# if request.user.is_authenticated:
	if	User.objects.all().first() is None:
		return render(request, 'userpage.html')
	else:
		return HttpResponseRedirect('/')

@csrf_exempt
@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def getDet(request):
	name = request.POST.get('name','')
	age = request.POST.get('age','')
	aff = request.POST.get('aff','')
	gender = request.POST.get('gender','')
	user = User.objects.create(name=name, age=age, aff=aff, gender=gender)
	return HttpResponse('/')
