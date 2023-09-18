from django.contrib.auth.models import AbstractUser
from django.db import models


def upload_thumbnail(instance, filename):
	path = f'thumbnails/{instance.username}'
	extension = filename.split('.')[-1]
	if extension:
		path = path + '.' + extension
	return path


class User(AbstractUser):
	thumbnail = models.ImageField(
		upload_to=upload_thumbnail,
		null=True,
		blank=True
	)


class Connection(models.Model):
	sender = models.ForeignKey(
		User,
		related_name='sent_connections',
		on_delete=models.CASCADE
	)
	receiver = models.ForeignKey(
		User,
		related_name='received_connections',
		on_delete=models.CASCADE
	)
	accepted = models.BooleanField(default=False)
	updated = models.DateTimeField(auto_now=True)
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.sender.username + ' -> ' + self.receiver.username



class Message(models.Model):
	connection = models.ForeignKey(
		Connection,
		related_name='messages',
		on_delete=models.CASCADE
	)
	user = models.ForeignKey(
		User,
		related_name='my_messages',
		on_delete=models.CASCADE
	)
	text = models.TextField()
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.user.username + ': ' + self.text

