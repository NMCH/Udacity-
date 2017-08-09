/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 * 这只是一个图像加载实用程序。它简化了加载图像文件的过程，以便在您的游戏中使用它们。
 * 它还包括一个简单的“缓存”层，如果你尝试多次加载相同的图像，它将重用缓存的图像。
 */
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     * 这是可公开访问的图像加载函数。它接受一个字符串数组，
     * 指向图像文件或单个图像的字符串。然后它将调用我们的私有图像加载函数。
     */
    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             * 如果开发人员通过每个值传递一个图像数组，并在图像文件中调用我们的图像加载程序
             */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             * 开发人员没有将数组传递给这个函数，假设该值是一个字符串，并直接调用我们的图像加载器。
             */
            _load(urlOrArr);
        }
    }

    /* This is our private image loader function, it is
     * called by the public image loader function.
     * 这是我们的私人图像加载器函数，由公共图像加载器函数调用。
     */
    function _load(url) {
        if (resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             * 如果此URL已被加载，它将存在于我们的resourceCache数组中。
             * 只是返回图像，而不是重新加载图像。
             */
            var img = new Image();
            img.onload = function() {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 * 一旦我们的图像被正确加载，将它添加到我们的缓存中，
                 * 这样我们就可以简单地返回这个图像，如果开发人员试图在将来加载这个文件。
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 * 一旦图像实际加载并适当地缓存，调用我们已经定义的所有onReady()回调。
                 */
                if (isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             * 将初始缓存值设置为false，
             * 这将在调用图像的onload事件处理程序时更改。最后，将图像的src属性指向通过的URL。
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* This is used by developers to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     * 这是开发人员用来抓取他们所知道的先前加载的图像的引用。
     * 如果缓存了一个图像，那么这个函数和调用load()的函数一样。
     */
    function get(url) {
        return resourceCache[url];
    }

    /* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     * 这个函数决定是否所有被请求加载的图像都被正确加载了。
     */
    function isReady() {
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) &&
                !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     * 这个函数将向回调堆栈添加一个函数，当所有请求的图像被正确加载时调用。
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     * 这个对象通过创建一个全局资源对象来定义可公开访问的函数。
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();