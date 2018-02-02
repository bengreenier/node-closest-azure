const dns = require('dns')

const followCname = (addr, chain) => {
    chain = chain || []
    return new Promise((resolve, reject) => {
        dns.resolveAny(addr, (err, addrs) => {
            if (err) return reject(err)
            
            const cnames = addrs.filter(e => e.type === 'CNAME')
            if (cnames.length > 0) {
                Promise.all(cnames.map(e => followCname(e.value, [e])))
                    .then((arrs) => {
                        return [].concat.apply([], arrs)
                    })
                    .then((records) => {
                        resolve(chain.concat(records))
                    })
            } else {
                resolve(chain.concat(addrs))
            }
        })
    })
}

// relies on management.azure CNAME behavior to determine region
// further relies on cnaming to match valid region prefixes
module.exports = () => {
    return followCname('management.azure.com').then((records) => {
        return records.map(r => r.value || r.address)
    }).then((values) => {
        return values.filter(v => v.endsWith('.management.azure.com'))
    }).then((possibleRegions) => {
        return possibleRegions[0]
    }).then((closest) => {
        return closest.substr(0, closest.indexOf('.'))
    })
}