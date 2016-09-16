const es = require('event-stream')

/** map(...).series(function(data, cb) {...}).then(...).catch(...) */
module.exports = (...list) => ({
    series: func =>
        new Promise((resolve, reject) => {
            const src = es.readArray(list.slice())
            const dest = es.writeArray((err, res) =>
                err ? reject(err) : resolve(res)
            )
            const map = es.map(function (data, cb) {
                src.pause()
                func(data, (err, res) => {
                    cb(err, res)
                    src.resume()
                })
            })
            map.on('error', reject)
            src.pipe(map).pipe(dest)
        })
})
