import random
import sched
import time
import data
from datetime import datetime
from threading import Thread


def timestamp():
	return datetime.now().isoformat(' ')


def start_arrivals_refresh():
	global _arrivals_refresh_event_id, _arrivals_chill_event_id
	if _arrivals_refresh_event_id is None:
		print("%s: Starting arrivals refresh schedule..." % timestamp())
		_reset_chill_timer()
		_arrivals_refresh_event_id = arrivals_refresh_schedule.enter(0, 1, refresh_arrivals, (arrivals_refresh_schedule,))


def _reset_chill_timer():
	global _arrivals_chill_event_id
	_stop_chill_timer()
	_arrivals_chill_event_id = arrivals_refresh_schedule.enter(arrivals_chill_timeout, 1, stop_arrivals_refresh, ())


def _stop_chill_timer():
	global _arrivals_chill_event_id
	if _arrivals_chill_event_id is not None:
		try:
			arrivals_refresh_schedule.cancel(_arrivals_chill_event_id)
		except ValueError:
			pass
		_arrivals_chill_event_id = None


def stop_arrivals_refresh():
	global _arrivals_refresh_event_id
	_stop_chill_timer()
	if _arrivals_refresh_event_id is not None:
		print("%s: Arrivals refresh schedule stopped" % timestamp())
		try:
			arrivals_refresh_schedule.cancel(_arrivals_refresh_event_id)
		except ValueError:
			pass
		_arrivals_refresh_event_id = None


_arrivals_refresh_event_id = None
_arrivals_chill_event_id = None
arrivals_chill_timeout = 200

arrivals_refresh_schedule = sched.scheduler(time.time, time.sleep)


def refresh_arrivals(schedule):
	global _arrivals_refresh_event_id
	for line in sorted(data.get_lines(), key=lambda k: random.random()):
		if _arrivals_refresh_event_id is not None:
			data.get_arrivals(line.line_id)

	print("%s: Refresh done" % timestamp())
	if _arrivals_refresh_event_id is not None:
		_arrivals_refresh_event_id = schedule.enter(0, 1, refresh_arrivals, (schedule,))
		_reset_chill_timer()


def _refresh_daemon():
	while True:
		arrivals_refresh_schedule.run()
		time.sleep(0.5)

thread = Thread(target=_refresh_daemon, args=())
thread.start()
