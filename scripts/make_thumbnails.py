"""Download screenshots from the pages listed in a YAML data file.

The YAML file contain a list of records with fields `github_url and ``website_url`:

    - github_url: https://github.com/user/repo
      website_url: http://example.herokuapp.com

Each screenshot is stored at ${DOWNLOAD_DIR}/${user}.png.

A thumbnail with dimensions `THUMBNAIL_DIMENSIONS` is also created at ${DOWNLOAD_DIR}/${user}-thumbnail.png

The path of the data file and of the download directory, and the size of the thumbnail,
are hardcoded below.
"""

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


# adapted from http://stackoverflow.com/questions/1197172/how-can-i-take-a-screenshot-image-of-a-website-using-python
class Screenshot(QWebView):
    """An instance of this class saves screenshots of web pages.

    The same instance can be used for multiple web pages.
    """

    def __init__(self):
        """Initialize self."""
        self.app = QApplication(sys.argv)
        QWebView.__init__(self)
        self._loaded = False
        self.loadFinished.connect(self._loadFinished)

    def capture(self, url, output_file, viewport_size=None):
        """Capture `url` to `output_file`.

        If `viewport_size` is truthy, interpret it as a tuple (width, height)
        to use as the viewport size. Otherwise the size of the page frame will be used.
        """
        self.load(QUrl(url))
        self.wait_load()
        frame = self.page().mainFrame()
        viewport_size = PyQt4.QtCore.QSize(*viewport_size) if viewport_size else frame.contentsSize()
        self.page().setViewportSize(viewport_size)
        image = QImage(self.page().viewportSize(), QImage.Format_ARGB32)
        painter = QPainter(image)
        frame.render(painter)
        painter.end()
        image.save(output_file)

    def wait_load(self, delay=0):
        """Process app events until the page has loaded."""
        while not self._loaded:
            self.app.processEvents()
            time.sleep(delay)
        self._loaded = False

    def _loadFinished(self, result):
        """The initializer registers this callback."""
        self._loaded = True

screenshot = Screenshot()

os.makedirs(DOWNLOAD_DIR, exist_ok=True)

for item in yaml.load(open(DATA_FILE)):
    # retrieve the website URL, and compute the image path
    website_url = item['website_url']
    login = item['github_url'].split('/')[-2]
    image_path = os.path.join(DOWNLOAD_DIR, '%s.png' % login)
    thumbnail_path = os.path.join(DOWNLOAD_DIR, '%s-thumb.png' % login)

    print('Downloading', website_url, '->', image_path)
    screenshot.capture(website_url, image_path, dimensions=SOURCE_DIMENSIONS)

    # Create the thumbnail form the downloaded image
    print('Resizing', image_path, '->', thumbnail_path)
    im = Image.open(image_path)
    scale = min(map(operator.truediv, THUMBNAIL_DIMENSIONS, im.size)) * 2
    im = im.resize([round(x * scale) for x in im.size], Image.ANTIALIAS)
    im.save(thumbnail_path)
