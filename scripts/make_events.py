import json
import os
import pytz
import sys
from datetime import datetime

import numpy as np
import pandas as pd

tz = pytz.timezone('America/New_York')


def isnan(n):
    try:
        return np.isnan(n)
    except TypeError:
        return False


def isoformat(date):
    return date.isoformat()
    return date.astimezone(pytz.utc).isoformat()


spreadsheet_key = os.getenv('CALENDAR_GSHEET_KEY')
assert spreadsheet_key, "missing environemnt variable: CALENDAR_GSHEET_KEY"
url = 'https://docs.google.com/spreadsheets/d/e/{}/pub?output=csv'.format(spreadsheet_key)

df = pd.read_csv(url, header=1)
dates = pd.to_datetime(df['Date'].str.replace(r'(\d) /', r'0\1/').str.replace(r'\Z', '/2018'), format='%a, %m/%d/%Y')
df['Date'] = dates

events = []
for _, row in df.iterrows():
    day, date, notes = (row[k] if not isnan(row[k]) else None for k in ('Instructional Day', 'Date', 'Notes'))
    if pd.isnull(day):
        day = None
    if pd.isnull(notes) or notes == 'No class':
        notes = None
    title = "Day {:0.0f}".format(day) if day else "No class: {}".format(notes)
    desc = notes if day else ''
    date = date.tz_localize(tz)
    start = date.replace(hour=15, minute=20)
    end = date.replace(hour=20, minute=0)
    events.append({'title': title, 'start': isoformat(start), 'end': isoformat(end), 'desc': desc or ''})

json.dump(events, sys.stdout, indent='    ')
