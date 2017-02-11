# adapted from http://stackoverflow.com/questions/1197172/how-can-i-take-a-screenshot-image-of-a-website-using-python
import operator
import os
import sys
import time
from math import floor

import PyQt4
import yaml
from PIL import Image
from PyQt4.QtCore import QUrl
from PyQt4.QtGui import QApplication, QImage, QPainter
from PyQt4.QtWebKit import QWebView

DATA_FILE = './_data/lab2.yml'
DOWNLOAD_DIR = './images/showcase/lab2'
THUMBNAIL_DIMENSIONS = (204, 159)
SOURCE_WIDTH = 1024
SOURCE_DIMENSIONS = (SOURCE_WIDTH, floor(SOURCE_WIDTH / THUMBNAIL_DIMENSIONS[0] * THUMBNAIL_DIMENSIONS[1]))

class Screenshot(QWebView):
    def __init__(self):
        self.app = QApplication(sys.argv)
        QWebView.__init__(self)
        self._loaded = False
        self.loadFinished.connect(self._loadFinished)

    def capture(self, url, output_file, dimensions=None):
        self.load(QUrl(url))
        self.wait_load()
        frame = self.page().mainFrame()
        viewport_size = PyQt4.QtCore.QSize(*dimensions) if dimensions else frame.contentsSize()
        self.page().setViewportSize(viewport_size)
        image = QImage(self.page().viewportSize(), QImage.Format_ARGB32)
        painter = QPainter(image)
        frame.render(painter)
        painter.end()
        image.save(output_file)

    def wait_load(self, delay=0):
        # process app events until page loaded
        while not self._loaded:
            self.app.processEvents()
            time.sleep(delay)
        self._loaded = False

    def _loadFinished(self, result):
        self._loaded = True

screenshot = Screenshot()

os.makedirs(DOWNLOAD_DIR, exist_ok=True)

for rec in yaml.load(open(DATA_FILE)):
    login = rec['github_url'].split('/')[-2]
    website_url = rec['website_url']
    image_path = os.path.join(DOWNLOAD_DIR, '%s.png' % login)
    print('Downloading', website_url, '->', image_path)
    screenshot.capture(website_url, image_path, dimensions=SOURCE_DIMENSIONS)

    thumbnail_path = os.path.join(DOWNLOAD_DIR, '%s-thumb.png' % login)
    print('Resizing', image_path, '->', thumbnail_path)
    im = Image.open(image_path)
    scale = min(map(operator.truediv, THUMBNAIL_DIMENSIONS, im.size)) * 2
    im = im.resize([round(x * scale) for x in im.size], Image.ANTIALIAS)
    im.save(thumbnail_path)
