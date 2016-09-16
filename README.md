# stream-map-series

Map every item in list using async function in series and return a promise

## Usage
```
const map = require('stream-map-series')

map(1,2,3).series((data, cb) => { 
  console.log(data)
  cb(null, 'Done with:' + data)
})
.then(res => console.log(res))
.catch(err => throw err)
```
